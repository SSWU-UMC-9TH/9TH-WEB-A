import { useQuery } from "@tanstack/react-query";
// 1. 'getLpList'가 아닌 'getLpDetail'을 import 해야 합니다.
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Lp, ResponseLpDetailDto } from "../../types/lp";

function useGetLpDetail(id: string) {
  // <API 응답 타입, 에러 타입, select 후 최종 타입>
  return useQuery<ResponseLpDetailDto, Error, Lp>({
    queryKey: [QUERY_KEY.lps, id],

    // 2. API 호출 함수(queryFn)가 'getLpDetail(id)'를 호출해야 합니다.
    queryFn: () => getLpDetail(id),

    select: (data) => data.data.data,
    enabled: !!id,
  });
}
export default useGetLpDetail;
