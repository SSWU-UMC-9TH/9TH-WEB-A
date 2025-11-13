import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Lp, ResponseLpDetailDto } from "../../types/lp";

function useGetLpDetail(id?: string) {
  return useQuery<Lp, Error>({
    queryKey: [QUERY_KEY.lps, id],
    queryFn: () => getLpDetail(Number(id)),
    enabled: !!id,
  });
}

export default useGetLpDetail;
