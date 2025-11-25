import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { patchUser } from "../../apis/auth";

function useUpdateUserInfo() {
  return useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    },
  });
}

export default useUpdateUserInfo;