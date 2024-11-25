import React from "react";
import MovieCard from "../components/MovieCard";

// const movieData = [
//     {
//       title: "Top Gun: Maverick",
//       year: "2022",
//       rating: 83,
//       posterUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd8288d9359e6e6c11b369ef4f0fe7203451780d2e738ae77c21d3a5b24078a3?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
//       addIconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2e01cf5ee1ab1f760dbccd41a0e6604bd7348e45054db699eafdb5ae426446ae?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
//       ratingIconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/582adacd25152eade1e6b1b56fb94e0bdb50c9df0b2efc20ef593eb93999e258?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
//     },
//     {
//       title: "Fantastic Beasts: The Secrets of Dumbledore",
//       year: "2022",
//       rating: 68,
//       posterUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/d6bb3f7317aa1cc09c5f8370831a66a89ada9f857424968fd07539c6ba0e81a6?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
//       addIconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f070519f645f28afbbc98a3476ac191963b92cf1bdb77400e0b9fa635657c84e?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
//       ratingIconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1c8504069168f23af4ae6bc3dc8a61c761e95868a80a24e30ac7d072ae099811?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
//     }
//   ];

  interface PopularMoviesProps {
    movies: Array<{
        title: string;
        release_date: string;
        popularity: number;
        poster_path: string;
        id: number;
    }>;
  }

const PopularMovies: React.FC<PopularMoviesProps> = ({ movies }) => (
  <div>
    <h3 className="self-start mt-9 text-3xl text-neutral-200">
       {movies.length > 0 ? " " : "No Movies Found"}
    </h3>
    <div className="flex flex-wrap gap-10 mt-9 max-md:max-w-full">
      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  </div>
);

export default PopularMovies;
