/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { MovieCardProps } from "../type";
import { useNavigate } from "react-router-dom";
import WatchlistPopup from "./WatchlistPopup";
import Toast from "./toast";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  release_date,
  popularity,
  poster_path,
  id,
}) => {
  const fullPosterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const [showPopup, setShowPopup] = useState(false);
  const [watchlists, setWatchlists] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const fetchWatchlists = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user-watchlists`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setWatchlists(data.data || []);
      setShowPopup(true);
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  const handleAddToWatchlist = async (watchlistId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/watchlist/add-movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ watchlistId, movieId: id }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setFeedback({
        type: "success",
        message: "Movie added to watchlist successfully!",
      });
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <article
      className="flex flex-col flex-1 ml-3"
      onClick={() => navigate(`/movie-details/${id}`)}
    >
      <div className="flex flex-col pb-7 w-full rounded bg-stone-900">
        <div className="flex relative flex-col items-start pb-48 rounded aspect-[0.667] w-[150px] max-md:pr-5 max-md:pb-24">
          <img
            loading="lazy"
            src={fullPosterPath}
            alt={`Movie poster for ${title}`}
            className="object-cover absolute inset-0 size-full"
          />
          {/* Plus Sign Button */}
          <button
            onClick={fetchWatchlists}
            aria-label={`Add ${title} to watchlist`}
            className="absolute top-2 left-2 bg-gray-700 pb-1 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-800 focus:outline-none focus:ring-3 focus:ring-red-500 text-xl"
          >
            +
          </button>
        </div>
        {feedback && (
          <Toast
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}
        {showPopup && (
          <WatchlistPopup
            watchlists={watchlists}
            onSelect={handleAddToWatchlist}
            onClose={() => setShowPopup(false)}
          />
        )}

        <div className="flex gap-1.5 self-start mt-1.5 text-left text-neutral-200 max-md:mr-1.5">
          <div className="flex gap-0.5">
            <div className="grow text-base">{title}</div>
          </div>
        </div>
        <div className="self-start mt-1.5 text-base text-neutral-200">
          Popularity: {popularity}
          <br />
          <span className="font-light">Release Date: ({release_date})</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
