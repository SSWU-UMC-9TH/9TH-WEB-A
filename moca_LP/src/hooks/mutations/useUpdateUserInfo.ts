import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { patchUser } from "../../apis/auth";

function useUpdateUserInfo() {
  return useMutation({
    mutationFn: patchUser,
    onMutate: async (newUserData) => {
      // 기존 myInfo 요청 중단
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 이전 데이터 저장 (rollback용)
      const previousUser = queryClient.getQueryData([QUERY_KEY.myInfo]);

      // UI 즉시 업데이트
      queryClient.setQueryData([QUERY_KEY.myInfo], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            ...newUserData, // 변경된 name/bio/avatar 즉시 반영
          },
        };
      });

      return { previousUser };
    },

    // 실패하면 롤백
    onError: (_err, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousUser);
      }
      alert("프로필 수정 실패!");
    },

    // 성공 후 서버 데이터 다시 동기화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
  });
}

export default useUpdateUserInfo;