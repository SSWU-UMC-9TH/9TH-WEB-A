// src/components/MovieCard.tsx
import { useState } from "react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 aspect-[2/3] transition-transform duration-500 hover:scale-105 bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} 영화의 이미지`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-700 flex items-center justify-center text-gray-300 text-xs">
          No Image
        </div>
      )}

      {/* 하단 타이틀 */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <h2 className="text-xs font-semibold text-white line-clamp-2">
          {movie.title}
        </h2>
      </div>

      {isHovered && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end p-3">
          <p className="text-[11px] text-gray-200 leading-relaxed line-clamp-5">
            {movie.overview || "설명이 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
}
