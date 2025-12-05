import type { Movie } from "../../types/movie";
import { X } from "lucide-react";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

const MovieModal = ({ movie, onClose }: Props) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/640x480?";

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh] ">

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        <div className="w-full h-56 md:h-64 overflow-hidden relative">
          <img
            src={
              movie.backdrop_path
                ? `${imageBaseUrl}${movie.backdrop_path}`
                : fallbackImage
            }
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover m-0 p-0"
          />

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {movie.title}
            </h2>
            <h3 className="text-md md:text-md font-semibold text-white">
              {movie.original_title}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
              alt={movie.title}
              className="w-full md:w-1/3 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">
                개봉일: {movie.release_date}
              </p>
              <p className="text-blue-600 font-semibold mb-2">평점: {movie.vote_average.toFixed(1)}</p>
              <p className="text-gray-700">{movie.overview}</p>
            </div>
          </div>
        </div>

        <div className="mb-5 flex justify-center gap-5 sticky bottom-0 bg-white">
          <a
            href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black hover:bg-gray-600 text-white font-semibold rounded-lg"
          >
            IMDb에서 검색
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg"
          >
            닫기
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default MovieModal;