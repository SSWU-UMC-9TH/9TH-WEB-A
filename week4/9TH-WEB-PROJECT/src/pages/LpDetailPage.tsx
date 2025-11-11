import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "@/apis/lp";

export default function LpDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: lp,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lp", id],
    queryFn: () => getLpDetail(Number(id)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        로딩 중...
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-400">
        <p>LP 정보를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 bg-pink-500 rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <img
        src={lp.thumbnail || "https://via.placeholder.com/800?text=No+Image"}
        alt={lp.title}
        className="w-full h-72 object-cover rounded-lg shadow-lg"
      />

      <div>
        <h1 className="text-3xl font-bold text-white">{lp.title}</h1>
        <p className="text-gray-400 mt-1">
          업로드일: {new Date(lp.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-4">
        <button className="bg-pink-500 px-4 py-2 rounded-md hover:bg-pink-600">
          ❤️ 좋아요
        </button>
        <button className="bg-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-600">
          수정
        </button>
        <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
          삭제
        </button>
      </div>

      <article className="bg-zinc-900 text-gray-200 p-6 rounded-lg leading-relaxed whitespace-pre-wrap">
        {lp.content || "본문 내용이 없습니다."}
      </article>
    </div>
  );
}