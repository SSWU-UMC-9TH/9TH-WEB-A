import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../types/common"; 

function useGetInfiniteLpList(
  limit: number,
  searchQuery: string, 
  order: PAGINATION_ORDER,
  options?: { enabled?: boolean }
) {
  const isSearch = searchQuery.trim().length > 0;

  return useInfiniteQuery({

    queryKey: [QUERY_KEY.LPS, limit, searchQuery, order], 
    
    initialPageParam: undefined as string | undefined, 

    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam, 
        limit,
        search: searchQuery,
        order,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    staleTime: isSearch ? 30 * 1000 : 5 * 60 * 1000, 
    enabled: options?.enabled ?? true, 
  });
}

export default useGetInfiniteLpList;