import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard"; // ✅ 추가: 컴포넌트 임포트
import { LoadingSpinner } from "../components/LoadingSpinner";
import { type MovieResponse, type Movie } from "../types/movie";

export default function MoviePage() {
  const [status, setStatus] = useState<string>("loading...");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = import.meta.env.VITE_TMDB_KEY;
      console.log("TOKEN present? ", !!token); // true 여야 정상

      try {
        const { data, status: httpStatus } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { language: "en-US", page: 1 },
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        console.log("HTTP status:", httpStatus);
        console.log("sample:", data.results?.[0]);
        setMovies(data.results ?? []);
        setStatus("ok");
      } catch (err: any) {
        const http = err?.response;
        const code = http?.status;
        const detail = http?.data ? JSON.stringify(http.data) : String(err);
        console.error("API error:", code, detail);

        setErrorMsg(`code=${code ?? "network"}  detail=${detail}`);
        setStatus("error");
      }
    };

    fetchMovies();
  }, []);

  if (status === "loading...") return <div>Loading...</div>;
  if (status === "error")
    return (
      <div>
        Error loading movies 😢
        <pre style={{ whiteSpace: "pre-wrap" }}>{errorMsg}</pre>
      </div>
    );

    if (isPending) {
        return <LoadingSpinner />;
    }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">MoviePage</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 list-none p-0">
        {movies.slice(0, 10).map((m) => (
          <li key={m.id} className="flex justify-center">
            <MovieCard movie={m} /> {/* ✅ MovieCard 사용 */}
          </li>
        ))}
      </ul>
    </div>
  );
}
