import React from "react";
import MovieCard from "../components/MovieCard";

interface RecommendedMoviesProps {
  movies: Array<{
    title: string;
    release_date: string;
    popularity: number;
    poster_path: string;
    id: number;
  }>;
}

const RelatedMovies: React.FC<RecommendedMoviesProps> = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-center text-neutral-200 mt-9">
        No recommendations available.
      </p>
    );
  }

  return (
    <div>
      <h3 className="self-start mt-9 text-3xl text-neutral-200">
        Recommended Movies/Related Movies
      </h3>
      <div className="flex flex-wrap gap-10 mt-9 max-md:max-w-full">
        {movies.map((movie) => (
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            popularity={movie.popularity}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedMovies;
