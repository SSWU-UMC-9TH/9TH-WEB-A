import { useState } from "react";
import type { Movie } from "../types/movies";
import { useNavigate, useParams } from "react-router-dom";

interface MovieProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div
      onClick={() => navigate(`/movies/${params.category}/${movie.id}`)}
      className="relative rounded-xl overflow-hidden cursor-pointer w-44 transition-transform hover:scale-105 duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`}
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-lg font-bold text-center leading-snug">
            {movie.title}
          </h2>
          <p className="text-sm mt-2 overflow-y-auto max-h-40 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
