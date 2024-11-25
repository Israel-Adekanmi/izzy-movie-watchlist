/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MovieListItem } from "../components/MovieListItem";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditWatchlist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any[]>([]); // Initialize as an empty array
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log("Watchlist ID from URL:", id);
  }, [id]);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWatchlist = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/watchlist/details/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.error) throw new Error(data.message);
        setMovies(data.data.movies || []); // Ensure movies is always an array
        setName(data.data.name);
        setDescription(data.data.description);
      } catch (err: any) {
        setFeedback({
          type: "error",
          message: err.message || "Failed to fetch watchlist details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [id, token, navigate]);


  // Handle removing a movie
  const handleRemoveMovie = async (movieId: number) => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/watchlist/remove-movie`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ watchlistId: id, movieId }),
      });

      const data = await response.json();

      if (data.error) {
        setFeedback({ type: "error", message: data.message });
      } else {
        setFeedback({
          type: "success",
          message: "Movie removed successfully!",
        });
        // Remove the movie from the local state
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to remove the movie",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to update the watchlist
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const watchlistData = { watchlistId: id, name, description };

    try {
      const response = await fetch(`${BASE_URL}/watchlist/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(watchlistData),
      });
      const data = await response.json();

      if (data.error) {
        setFeedback({ type: "error", message: data.message });
      } else {
        setFeedback({
          type: "success",
          message: "Watchlist updated successfully!",
        });
        setTimeout(() => navigate(`/watchlist-details/${id}`), 1500); // Redirect after success
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        {/* Sidebar */}

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
            <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
              <h2 className="text-3xl text-neutral-200">Edit your Watchlist</h2>
              <button className="my-auto text-base font-bold text-center text-red-500">
                Delete Watchlist
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mt-12 max-md:mt-10">
                <label
                  htmlFor="watchlistName"
                  className="text-lg font-bold text-neutral-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="px-6 py-3.5 mt-1.5 w-full text-base text-center rounded-md border border-solid border-neutral-200 text-neutral-200 bg-transparent max-md:px-5 max-md:mr-0.5"
                />
              </div>

              <div className="mt-8">
                <label
                  htmlFor="watchlistDescription"
                  className="text-lg font-bold text-neutral-200"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="px-6 pt-3.5 pb-24 mt-1.5 w-full text-base rounded-md border border-solid border-neutral-200 text-neutral-200 bg-transparent max-md:px-5 max-md:mr-0.5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

            
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-black font-semibold rounded-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-neutral-200">Movies</h3>
                {movies.length === 0 ? (
                  <p>No movies added yet.</p>
                ) : (
                  movies.map((movie: any) => (
                    <MovieListItem
                      key={movie.id.toLocaleString()}
                      poster_path={movie.poster_path}
                      title={movie.title}
                      release_date={movie.release_date}
                       onRemove={() => handleRemoveMovie(movie.id)}
                    />
                  ))
                )}
              </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditWatchlist;
