import { useState } from 'react';
import type { MovieResponse, Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useCustomFetch } from '../hooks/useCustomFetch';

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const url = category
    ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
    : '';

  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);
  const movies: Movie[] = data?.results || [];

  if (isError) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10 mb-10">
        <button
          className="bg-[#333] text-white px-4 py-2 rounded-md shadow-sm
          hover:bg-[#E50914] transition-all duration-200 disabled:bg-gray-600
          text-sm disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {`<`}
        </button>
        <span className="text-sm">{page}</span>
        <button
          className="bg-[#333] text-white px-4 py-2 rounded-md shadow-sm
          hover:bg-[#E50914] transition-all duration-200 text-sm"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>
    </>
  );
}