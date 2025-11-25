import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import type { ResponseLpDto } from "../../types/lp";

const useDeleteLp = (navigate: (path: string) => void) => {
  return useMutation<ResponseLpDto, Error, number>({
    mutationFn: (lpId: number) => deleteLp({ lpId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      alert("LP가 삭제되었습니다.");
      navigate("/");
    },
    onError: (err) => {
      console.error("LP 삭제 실패:", err);
      alert("삭제 실패");
    },
  });
};

export default useDeleteLp;
