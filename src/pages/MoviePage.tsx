import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard"; // ✅ 추가: 컴포넌트 임포트

// 👇 poster_path 추가
type TMDBMovie = { id: number; title: string; poster_path: string; overview: string };
type TMDBResponse = { results: TMDBMovie[] };

export default function MoviePage(): JSX.Element {
  const [status, setStatus] = useState<string>("loading...");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
      console.log("TOKEN present? ", !!token); // true 여야 정상

      try {
        const { data, status: httpStatus } = await axios.get<TMDBResponse>(
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

  // ✅ 수정된 부분 (MovieCard로 카드형 UI 렌더링)
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
