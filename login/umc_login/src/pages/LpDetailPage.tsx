import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";

const LpDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetLpDetail(id as string);

  if (isLoading) return <div className="text-black">불러오는 중...</div>;
  if (isError || !data)
    return <div className="text-black">LP 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="p-8 bg-[#E9ECEF] min-h-screen text-[#212529]">
      <div>
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-64 h-64 object-cover rounded mb-4"
        />
        <p className="mb-4">{data.content}</p>

        <div className="flex items-center gap-4 text-[#F8F9FA]">
          <span className="text-lg flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#212529] fill-[#212529]" />
            <span className="text-[#212529]">{data.likes.length}</span>
          </span>
          <button className="bg-gray-700 px-4 py-1 rounded">수정</button>
          <button className="bg-gray-700 px-4 py-1 rounded">삭제</button>
          <button className="bg-pink-600 px-4 py-1 rounded">좋아요</button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
