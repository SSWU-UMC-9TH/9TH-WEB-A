import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";

export default function HomeBackground() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to load now playing movies:", error);
      }
    };

    fetchNowPlaying();
  }, []);

  const posters = movies
    .filter((m) => m.poster_path)
    .map((m) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 flex flex-col justify-center translate-y-[-10%]">
      <div className="flex w-[200%] animate-scroll translate-x-[-25%] mb-6">
        {[...posters, ...posters].map((src, i) => (
          <img
            key={`top-${i}`}
            src={src}
            alt=""
            className="w-[180px] h-[270px] object-cover rounded-lg mr-4"
          />
        ))}
      </div>

      <div className="flex w-[200%] animate-scroll-reverse translate-x-[-25%]">
        {[...posters, ...posters].map((src, i) => (
          <img
            key={`bottom-${i}`}
            src={src}
            alt=""
            className="w-[180px] h-[270px] object-cover rounded-lg mr-4"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}