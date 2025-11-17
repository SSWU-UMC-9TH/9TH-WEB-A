import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLike,
    onMutate: async (lp: RequestLpDto) => {
      const queryKey = [QUERY_KEY.lps, lp.lpId];
      await queryClient.cancelQueries({ queryKey });

      const previousLpPost = queryClient.getQueryData<ResponseLpDto>(queryKey);

      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      if (!previousLpPost || !userId) {
        return { previousLpPost };
      }

      const newLikes = previousLpPost.data.likes.filter(
        (like: Likes) => like.userId !== userId
      );

      if (newLikes.length === previousLpPost.data.likes.length) {
        console.warn("Optimistic update skipped: Like not found.");
        return { previousLpPost };
      }

      queryClient.setQueryData<ResponseLpDto>(queryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            likes: newLikes,
          },
        };
      });

      return { previousLpPost };
    },

    onError: (err: Error, newLp: RequestLpDto, context) => {
      console.error("좋아요 취소 실패:", err, newLp);

      if (context?.previousLpPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lps, newLp.lpId],
          context.previousLpPost
        );
      }
    },

    onSettled: async (data, error, Variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, Variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
