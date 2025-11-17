import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { patchUser } from "../../apis/auth";

function useUpdateUserInfo() {
  return useMutation({
    mutationFn: patchUser,
    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      const previousUser = queryClient.getQueryData([QUERY_KEY.myInfo]);

      queryClient.setQueryData([QUERY_KEY.myInfo], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            ...newUserData,
          },
        };
      });

      return { previousUser };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUser);
      }
      alert("프로필 수정 실패!");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
  });
}

export default useUpdateUserInfo;
