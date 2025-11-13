import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enum/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  // Infinite Query 호출
  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
    isFetchingNextPage,
  } = useGetInfiniteLpList(10, search, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 스크롤 감지 시 다음 페이지 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <div className="text-center text-red-500">에러 발생!</div>;
  }

  // 모든 LP 데이터를 flat으로 합치기
  const lpList = lps?.pages?.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border ${
            order === "asc"
              ? "bg-[#212529] text-[#E9ECEF] border-[#212529] shadow-sm"
              : "bg-[#E9ECEF] text-[#212529] border-[#E9ECEF] hover:bg-[#ced4da]"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border ${
            order === "desc"
              ? "bg-[#212529] text-[#E9ECEF] border-[#212529] shadow-sm"
              : "bg-[#E9ECEF] text-[#212529] border-[#E9ECEF] hover:bg-[#ced4da]"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>

      {/* LP 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lpList.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}

        {/* Skeleton 표시: 데이터가 로딩 중일 때 */}
        {(isFetching || isFetchingNextPage) && (
          <LpCardSkeletonList count={20} />
        )}
      </div>

      {/* Infinite Scroll 트리거 */}
      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;
