import type { Movie } from "../../types/movie";
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const FALLBACK_IMAGE_URL = "https://via.placeholder.com/640x480?text=No+Image";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  if (!movie) return null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  const modalTitleId = `movie-modal-title-${movie.id}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
    >
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] border-2 border-pink-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/60 p-1 rounded-full hover:bg-pink-500 hover:text-black transition-colors z-10 border border-pink-500"
          aria-label="모달 닫기"
        >
          <X size={24} />
        </button>

        <div className="w-full h-56 md:h-64 overflow-hidden relative">
          <img
            src={
              movie.backdrop_path
                ? `${IMAGE_BASE_URL}w1280${movie.backdrop_path}`
                : FALLBACK_IMAGE_URL
            }
            alt={`${movie.title} 배경 이미지`}
            className="w-full h-full object-cover m-0 p-0 opacity-80"
          />

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
            <h2
              id={modalTitleId}
              className="text-xl md:text-2xl font-extrabold text-pink-400"
            >
              {movie.title}
            </h2>
            <h3 className="text-md md:text-md font-semibold text-gray-300">
              {movie.original_title}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w300${movie.poster_path}`
                  : FALLBACK_IMAGE_URL
              }
              alt={`${movie.title} 포스터`}
              className="w-full md:w-1/3 object-cover rounded-lg flex-shrink-0 border-2 border-pink-500 shadow-lg"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">
                개봉일: **{movie.release_date}**
              </p>
              <p className="text-pink-500 font-bold text-lg mb-2 flex items-center gap-1">
                평점: **{movie.vote_average.toFixed(1)}**
              </p>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>

        <div className="mb-0 p-4 border-t border-pink-500 flex justify-center gap-5 sticky bottom-0 bg-gray-900 shadow-lg">
          <a
            href={`https://www.imdb.com/find?q=${encodeURIComponent(
              movie.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors shadow-pink-500/50 shadow-md"
          >
            IMDb에서 검색
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors border border-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
