import { memo } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x480";

  const title = movie.title || "제목 없음";
  const releaseDate = movie.release_date || "개봉일 정보 없음";
  const language = movie.original_language?.toUpperCase() ?? "";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const shortOverview =
    movie.overview?.length > 120
      ? `${movie.overview.slice(0, 120)}...`
      : movie.overview || "줄거리 정보가 없습니다.";

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${title} 상세보기`}
      className="
        group cursor-pointer overflow-hidden
        rounded-2xl bg-black text-white
        shadow-lg transition-all duration-300
        hover:shadow-pink-500/50 hover:scale-[1.02]
        focus:outline-none focus:ring-2 focus:ring-pink-500
      "
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImage
          }
          alt={`${title} 포스터`}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
          loading="lazy"
          decoding="async"
        />

        <div
          className="
            absolute top-3 right-3
            bg-black/80 text-pink-500
            text-xs font-bold
            px-3 py-1 rounded-full
            border border-pink-500
            shadow-md
          "
        >
          ⭐ {rating}
        </div>
      </div>

      <div className="p-5 space-y-2">
        <h3 className="text-lg font-extrabold tracking-tight group-hover:text-pink-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-400">
          {releaseDate} · {language}
        </p>

        <p className="text-sm text-gray-300 leading-relaxed">{shortOverview}</p>
      </div>
    </article>
  );
};

export default memo(MovieCard);
