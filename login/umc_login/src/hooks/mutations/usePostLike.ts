import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLike,
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

      const isAlreadyLiked = previousLpPost.data.likes.some(
        (like: Likes) => like.userId === userId
      );

      if (isAlreadyLiked) {
        console.warn("Optimistic update skipped: Already liked.");
        return { previousLpPost };
      }

      const newLike: Likes = { userId, lpId: lp.lpId } as Likes;

      queryClient.setQueryData<ResponseLpDto>(queryKey, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            likes: [...oldData.data.likes, newLike],
          },
        };
      });

      return { previousLpPost };
    },

    onError: (err: Error, newLp: RequestLpDto, context) => {
      console.error("좋아요 추가 실패:", err, newLp);
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

export default usePostLike;
