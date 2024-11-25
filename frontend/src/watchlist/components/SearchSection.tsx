import React from "react";
import MovieCard from "../components/MovieCard";

const movieData = [
    {
      title: "Top Gun: Maverick",
      release_date: "2022",
      popularity: 83,
      id: 123,
      poster_path: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd8288d9359e6e6c11b369ef4f0fe7203451780d2e738ae77c21d3a5b24078a3?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
      },
    {
      title: "Fantastic Beasts: The Secrets of Dumbledore",
      release_date: "2022",
      popularity: 68,
       id: 321,
      poster_path: "https://cdn.builder.io/api/v1/image/assets/TEMP/d6bb3f7317aa1cc09c5f8370831a66a89ada9f857424968fd07539c6ba0e81a6?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677",
      
    }
  ];

const SearchSection: React.FC = () => (
  <div>
    <h3 className="self-start mt-9 text-3xl text-neutral-200">
      Search Results For
    </h3>
    <div className="flex flex-wrap gap-10 mt-9 max-md:max-w-full">
      {movieData.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  </div>
);

export default SearchSection;
