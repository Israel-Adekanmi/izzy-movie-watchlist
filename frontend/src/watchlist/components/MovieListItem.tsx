import * as React from "react";
import { MovieListItemProps } from "../type";


export const MovieListItem: React.FC<MovieListItemProps> = ({ poster_path, title, release_date, onRemove }) => {
    const fullPosterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <article className="flex flex-wrap gap-5 justify-between pr-4 mt-2.5 w-full text-base rounded border border-solid bg-black bg-opacity-0 border-neutral-200 text-neutral-200 max-md:max-w-full">
      <div className="flex gap-4">
        <img
          loading="lazy"
          src={fullPosterPath}
          alt={`Movie poster for ${title}`}
          className="object-contain shrink-0 rounded aspect-[0.67] w-[50px]"
        />
        <h3 className="my-auto basis-auto">
          {title} <span className="font-light">({release_date})</span>
        </h3>
      </div>
      <button 
        onClick={onRemove}
        className="px-2.5 py-3 my-auto whitespace-nowrap rounded border border-red-500 border-solid bg-zinc-900"
        aria-label={`Remove ${title} from watchlist`}
      >
        Remove
      </button>
    </article>
  );
};