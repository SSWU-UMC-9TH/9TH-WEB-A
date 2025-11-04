import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { accessToken } = useAuth() || {};
  const navigate = useNavigate();

  const { data, isPending, isError } = useGetLpList({
    search,
    order,
  });

  console.log({ data });

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

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

      {/* LP 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map((lp) => (
          <div
            key={lp.id}
            className="relative group overflow-hidden rounded-md shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-64 object-cover"
            />
            

            <div
              className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-end p-3 text-white cursor-pointer"
              onClick={() => navigate(`/lp/${lp.id}`)}
            >
              <h3 className="text-md font-semibold">{lp.title}</h3>
              <div className="flex justify-between items-center text-sm text-white">
                <p>{formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}</p>

                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-white fill-white" />
                  <p>{lp.likes.length}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default HomePage;
