import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";

function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery({
    queryKey: ["lps"],
    queryFn: () =>
      getLpList({ cursor, limit, search, order }),

    // 데이터가 신선하다고 간주하는 시간
    // 이 시간 동안은 캐시된 데이터를 그대로 사용. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청 X
    // 5분 동안 기존 데이터를 그대로 활용하여 네트워크 요청 줄임
    staleTime: 1000 * 60 * 5, // 5분

    // 사용되지 않는 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관
    // 10분 동안 사용되지 않으면 해당 캐시 데이터 삭제, 다시 요청 시 새 데이터 받아옴
    gcTime: 1000 * 60 * 10, // 10분

    // enabled: Boolean(search), -> 조건에 따라 쿼리 실행 여부 결정
    // refetchInterval: 1000 * 60, -> 일정 시간마다 자동으로 refetch

    // retry: 쿼리 요청 실패 시 재시도 횟수 설정 (기본값: 3)
    // initialData: -> 쿼리 실행 전 쿼리의 초기 데이터 설정. 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공하여, 로딩 전에도 안전하게 UI를 구성할 수 있게 함
    
    // 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 (Filcking) 방지
    // ex) 페이지네이션에서 페이지 전환 시 이전 페이지 데이터를 유지
    // keepPreviousData: true,

    select: (data) => data.data.data,
  });
    
}

export default useGetLpList;