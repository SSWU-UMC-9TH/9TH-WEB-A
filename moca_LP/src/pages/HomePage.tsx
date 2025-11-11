import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
    refetch
  } = useGetInfiniteLpList(10, search, order);

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-700">
        <p className="mb-3 text-lg font-medium">
          LP 목록을 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[#212529] text-white rounded-md hover:bg-[#343a40] transition-colors"
        >
          다시 시도하기
        </button>
      </div>
    );
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border ${order === "asc"
            ? "bg-[#212529] text-[#E9ECEF] border-[#212529] shadow-sm"
            : "bg-[#E9ECEF] text-[#212529] border-[#E9ECEF] hover:bg-[#ced4da]"
            }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>

        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 border ${order === "desc"
            ? "bg-[#212529] text-[#E9ECEF] border-[#212529] shadow-sm"
            : "bg-[#E9ECEF] text-[#212529] border-[#E9ECEF] hover:bg-[#ced4da]"
            }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
        >
          최신순
        </button>
      </div>
      
      {isPending && <LpCardSkeletonList count={20} />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) =>
            <LpCard key={lp.id} lp={lp} />
        )}
        {!isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2" />
    </div>
  );
};


export default HomePage;
