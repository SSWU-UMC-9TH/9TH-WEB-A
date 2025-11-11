import { useNavigate } from "react-router-dom";
import type { Lp } from "@/apis/lp";

interface LpCardProps {
  lp: Lp;
}

export default function LpCard({ lp }: LpCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="bg-zinc-900 p-4 rounded-lg shadow hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
    >
      <img
        src={lp.thumbnail || "https://via.placeholder.com/400?text=No+Image"}
        alt={lp.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-white font-semibold truncate">{lp.title}</h3>
      <p className="text-gray-400 text-sm">
        {new Date(lp.createdAt || "").toLocaleDateString()}
      </p>
      <p className="text-pink-400 text-sm">❤️ {lp.likeCount ?? 0}</p>
    </div>
  );
}