/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MovieDetailsCardProps } from "../type";
import Toast from "./toast"; // Import Toast component
import WatchlistPopup from "./WatchlistPopup";
import SetReminderPopup from "./SetReminderPopup";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MovieDetailsCard: React.FC<MovieDetailsCardProps> = ({
  title,
  release_date,
  popularity,
  poster_path,
  overview,
  genres,
  runtime,
  budget,
  revenue,
  tagline,
  homepage,
  id,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [watchlists, setWatchlists] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");

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
    console.log("WatchlistId:", watchlistId);
    console.log("MovieId:", id);

    if (!watchlistId) {
      setFeedback({ type: "error", message: "Invalid watchlist selected." });
      return;
    }

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

  const handleSetReminder = async () => {
    setShowReminderPopup(true)
  }

  const handleMarkAsWatched = async () => {
    try {
      const response = await fetch(`${BASE_URL}/mark-watched/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setFeedback({
        type: "success",
        message: "Movie marked as watched successfully!",
      });
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message });
    }
  };


  return (
    <article className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row bg-stone-900 rounded p-5 gap-5">
        {/* Left Column: Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`Movie poster for ${title}`}
            className="object-cover w-full h-auto rounded"
          />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col flex-grow gap-4 text-neutral-200">
          {/* Title and Year */}
          <h1 className="text-2xl font-bold">
            {title} <span className="text-lg">({release_date})</span>
          </h1>

          {/* Tagline */}
          {tagline && <p className="italic text-sm text-red-400">{tagline}</p>}

          {/* Genre and Runtime */}
          <p className="text-sm">
            <strong>Genres:</strong>{" "}
            {genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-sm">
            <strong>Runtime:</strong> {runtime} mins
          </p>

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <p className="text-sm">{overview}</p>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <strong>Popularity:</strong> {popularity}
            </p>
            <p className="text-sm">
              <strong>Budget:</strong> ${budget?.toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>Revenue:</strong> ${revenue?.toLocaleString()}
            </p>
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline"
              >
                Official Website
              </a>
            )}
          </div>

          {/* Add to Watchlist Button */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={fetchWatchlists}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Add to Watchlist
            </button>
            <button
              onClick={handleMarkAsWatched}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Mark as Watched
            </button>
            <button
              onClick={handleSetReminder}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Set Reminder
            </button>
          </div>
        </div>
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
      {showReminderPopup && (
        <SetReminderPopup
          movieId={id}
          movieTitle={title}
          onClose={() => setShowReminderPopup(false)}
        />
      )}
    </article>
  );
};

export default MovieDetailsCard;
