import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  credits: {
    cast: {
      id: number;
      name: string;
      profile_path: string | null;
      character: string;
    }[];
  };
};

const MovieDetailPage = () => {
  const { movieID } = useParams<{ movieID: string }>();

  const url = movieID
    ? `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR&append_to_response=credits`
    : "";

  const { data: movie, isPending, isError } = useCustomFetch<MovieDetail>(url);

  if (isError)
    return (
      <div className="flex items-center justify-center h-dvh text-red-500 text-2xl">
        에러가 발생했습니다.
      </div>
    );

  if (isPending || !movie) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded-lg shadow-lg"
        />

        <div className="text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
          <p className="text-yellow-400 text-lg mb-2">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-gray-300 mb-2">
            {movie.release_date} · {movie.runtime}분
          </p>

          <div className="flex gap-2 mb-4 flex-wrap">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-white/20 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="max-w-2xl leading-relaxed text-gray-200">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6">감독 / 출연</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {movie.credits.cast.slice(0, 12).map((person) => (
            <div key={person.id} className="flex flex-col items-center">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                  className="w-20 h-20 rounded-full object-cover mb-2 border border-white/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 mb-2 border border-white/10" />
              )}
              <p className="text-white text-sm text-center leading-tight">
                {person.name}
              </p>
              <p className="text-gray-400 text-xs text-center">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;