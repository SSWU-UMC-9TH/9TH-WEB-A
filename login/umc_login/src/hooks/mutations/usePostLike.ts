import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp: RequestLpDto) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      const previousLpPost: ResponseLpDto | undefined =
        queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpId]);

      const newLpPost = { ...previousLpPost };
      const me: ResponseMyInfoDto | undefined =
        queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like: Likes) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike: Likes = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      console.log(newLpPost);

      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err: Error, newLp: RequestLpDto, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },

    onSettled: async (data, error, Variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, Variables.lpId],
      });
    },
  });
}

export default usePostLike;
