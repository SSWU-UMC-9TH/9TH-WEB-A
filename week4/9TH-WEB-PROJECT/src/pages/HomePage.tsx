import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpList } from "@/apis/lp";
import LpCard from "@/components/LpCard";
import LpCardSkeletonList from "@/components/LpCardSkeletonList";

export default function HomePage() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lps", order],
    queryFn: () => getLpList({ cursor: 0, limit: 20, order }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const lps = data?.data?.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 border rounded-md ${
            order === "asc"
              ? "bg-zinc-700 border-zinc-600"
              : "border-zinc-800 hover:bg-zinc-800"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 border rounded-md ${
            order === "desc"
              ? "bg-zinc-700 border-zinc-600"
              : "border-zinc-800 hover:bg-zinc-800"
          }`}
        >
          최신순
        </button>
      </div>

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
        </div>
      )}
    </div>
  );
}