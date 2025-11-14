import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { CreateLpDto } from "../../types/lp";

function useUpdateLp() {
  return useMutation({
    mutationFn: ({ lpId, patchData }: { lpId: number; patchData: CreateLpDto }) =>
      patchLp(lpId, patchData),
    onSuccess: (_, variables) => {
      // LP 디테일 invalidate (핵심)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default useUpdateLp;