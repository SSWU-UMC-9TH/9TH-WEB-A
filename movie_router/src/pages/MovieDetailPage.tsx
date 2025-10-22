import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { MovieDetail } from "../types/movies";

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    loading: loadingMovie,
    error: errorMovie,
  } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
    [movieId]
  );

  const {
    data: credits,
    loading: loadingCredits,
    error: errorCredits,
  } = useCustomFetch<{ cast: any[]; crew: any[] }>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
    [movieId]
  );

  if (errorMovie || errorCredits) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        영화 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (loadingMovie || loadingCredits) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const director = credits?.crew.find((person) => person.job === "Director");
  const mainCast = credits?.cast.slice(0, 5);

  return (
    <div className="bg-black text-white min-h-screen flex justify-center p-10">
      <div className="max-w-4xl flex flex-col md:flex-row gap-6">
        {movie?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 max-h-[500px] object-cover rounded-xl shadow-lg"
          />
        )}

        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{movie?.title}</h1>
          {movie?.tagline && (
            <p className="italic text-gray-400">{movie.tagline}</p>
          )}
          <p className="leading-relaxed">{movie?.overview}</p>

          <div className="text-gray-300 space-y-1 mt-2">
            <p>개봉일: {movie?.release_date}</p>
            <p>러닝타임: {movie?.runtime}분</p>
            <p>평점: ⭐ {movie?.vote_average}</p>
          </div>

          {director && (
            <div className="mt-6 flex items-center gap-3">
              {director.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-lg font-semibold">감독</p>
                <p>{director.name}</p>
              </div>
            </div>
          )}

          {mainCast && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">출연진</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {mainCast.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center min-w-[80px]"
                  >
                    {actor.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                    <p className="text-sm mt-2 text-center">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
