import { useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";
import MovieList from "../components/MovieList";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const movies = data?.results ?? [];

  return (
    <div className="container mx-auto px-4 py-10">
      <MovieFilter onChange={setFilters} />

      {error && (
        <div className="mt-10 text-center text-sm text-red-500 font-medium">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <p className="animate-pulse text-gray-500">로딩 중...</p>
        </div>
      )}

      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}
