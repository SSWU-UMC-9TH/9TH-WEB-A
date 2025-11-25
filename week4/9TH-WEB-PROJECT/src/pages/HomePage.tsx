import { useState, useEffect } from "react";
import LpCard from "@/components/LpCard";
import LpCardSkeletonList from "@/components/LpCardSkeletonList";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "../hooks/useDebounce";
import { PAGINATION_ORDER_VALUE } from "../types/common";
import { SEARCH_DELAY } from "../constants/delay";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList"; 
import useThrottle from "../hooks/useThrottle";
import type { PAGINATION_ORDER as OrderType } from "../types/common"; 


export default function HomePage() {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DELAY);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [order, setOrder] = useState<OrderType>(PAGINATION_ORDER_VALUE.desc); 

  const { ref, inView } = useInView({ threshold: 0 });
  
  const throttledInView = useThrottle(inView, 1000); 

  const {
    data: lpsPages,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpList(20, debouncedValue, order, { 
    enabled: !(isSearchFocused && debouncedValue.trim().length === 0), 
  });

  const lps = lpsPages?.pages.flatMap(page => page.data.data.items) ?? [];

  useEffect(() => {
    if (throttledInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [throttledInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setOrder(PAGINATION_ORDER_VALUE.asc)}
          className={`px-3 py-1 border rounded-md ${
            order === PAGINATION_ORDER_VALUE.asc
              ? "bg-zinc-700 border-zinc-600"
              : "border-zinc-800 hover:bg-zinc-800"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER_VALUE.desc)}
          className={`px-3 py-1 border rounded-md ${
            order === PAGINATION_ORDER_VALUE.desc
              ? "bg-zinc-700 border-zinc-600"
              : "border-zinc-800 hover:bg-zinc-800"
          }`}
        >
          최신순
        </button>
      </div>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        className="px-3 py-1 border rounded-md bg-zinc-800 border-zinc-700 text-white" 
      />

      {isLoading && <LpCardSkeletonList />} 

      {isError && (
        <div className="text-center text-red-400">
          데이터를 불러오는 중 오류가 발생했습니다.
          <button
            onClick={() => refetch()}
            className="block mx-auto mt-2 px-3 py-1 bg-pink-500 rounded"
          >
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-5 gap-4">
          {lps.map((lp: any) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
          
          {isFetchingNextPage && <LpCardSkeletonList count={5} />} 
        </div>
      )}
      
      <div ref={ref} className="h-2" />
      
      {!hasNextPage && !isLoading && !isFetchingNextPage && lps.length > 0 && (
          <div className="text-center text-zinc-500 py-4">
              더 이상 불러올 데이터가 없습니다.
          </div>
      )}
    </div>
  );
}