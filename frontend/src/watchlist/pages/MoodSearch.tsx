/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

enum MovieGenre {
  ACTION = "Action",
  COMEDY = "Comedy",
  DRAMA = "Drama",
  HORROR = "Horror",
  ROMANCE = "Romance",
  SCIENCE_FICTION = "Science Fiction",
  FANTASY = "Fantasy",
  THRILLER = "Thriller",
  ANIMATION = "Animation",
  MYSTERY = "Mystery",
}

const MoodRecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const token = localStorage.getItem("accessToken");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchMoviesByMood = async (genre: MovieGenre) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/get-by-mood?genre=${genre}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setMovies(data || []);
      setSelectedGenre(genre);
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Error fetching movies by mood.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        {/* Main Content */}
        <section className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          {/* Toast for feedback */}
          {feedback && (
            <Toast
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback(null)}
            />
          )}

          <div className="flex flex-col py-9 pr-16 pl-8 mx-auto w-full bg-white bg-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-3xl text-white mb-6">Mood Recommendations</h2>

            <h2 className="text-3xl text-white mb-6">Choose Your Mood</h2>

            {/* Genre Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              {Object.values(MovieGenre).map((genre) => (
                <button
                  key={genre}
                  onClick={() => fetchMoviesByMood(genre)}
                  className={`px-4 py-2 rounded ${
                    selectedGenre === genre
                      ? "bg-red-500 text-black"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Movie Cards */}
            {loading ? (
              <p className="text-white">Loading movies...</p>
            ) : movies.length > 0 ? (
              <div className="flex gap-5 flex-wrap">
                {movies.map((movie: any) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            ) : (
              !loading && (
                <p className="text-white">No movies found for the selected genre.</p>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoodRecommendationPage;
