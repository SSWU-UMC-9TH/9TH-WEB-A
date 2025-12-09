import { useState, useCallback } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieModal from "./modal/MovieModal";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-sm font-semibold text-gray-500">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />

      <ul
        className="
          grid gap-6
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        "
      >
        {movies.map((movie) => (
          <li key={movie.id}>
            <button
              type="button"
              onClick={() => handleSelectMovie(movie)}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-2xl"
              aria-label={`${movie.title} 상세 보기`}
            >
              <MovieCard movie={movie} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
