import { useEffect, useState } from "react"
import axios from 'axios';
import { type MovieResponse, type Movie } from "../types/movies";
import MovieCard from "../components/MoviesCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const { category} = useParams<{
    category: string;
  }>();

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
        setIsPending(false);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovie();
  }, [page, category]);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-center items-center '>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-400 m-4 text-white shadow-md hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
        >
          {'<'}
        </button>
        <span className="text-lg font-bold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-6 py-3 text-lg font-bold rounded-lg bg-gray-400 m-4 text-white shadow-md hover:bg-gray-500"
        >
          {'>'}
        </button>
      </div>

      {isPending && (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 '>
          {movies.map((movie) =>
            <MovieCard key={movie.id} movie={movie} />
          )}
        </div>
      )}
    </>
  );
}
