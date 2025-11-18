import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LP } from "../../types/lp";

interface LpCardProps {
  lp: LP;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={lp.id}
      className="relative group overflow-hidden rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
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
          <p>
            {formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}
          </p>

          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-white fill-white" />
            <p>{lp.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
