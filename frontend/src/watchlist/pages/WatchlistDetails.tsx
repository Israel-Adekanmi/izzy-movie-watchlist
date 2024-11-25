/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WatchlistDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);
    const token = localStorage.getItem("accessToken");
  
  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  
    useEffect(() => {
      const fetchWatchlistDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/watchlist/details/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.error) throw new Error(data.message);
          setWatchlist(data.data);
        } catch (err: any) {
          setError(err.message || "Error fetching watchlist details");
          setFeedback({ type: "error", message: err.message || "Error fetching watchlist details" });
        } finally {
          setLoading(false);
        }
      };
  
      fetchWatchlistDetails();
    }, [id, token]);
  
    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;


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
          <h1 className="text-3xl font-semibold mb-6 text-white">Watchlist Details</h1>
            <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full text-white">
              <h2 className="text-3xl text-neutral-200 ">{watchlist.name}</h2>
              <button className="my-auto text-base font-bold text-center text-red-500"  onClick={() => navigate(`/edit-watchlist/${watchlist.watchlistId}`)}>
                Edit Watchlist
              </button>
            </div>

            <div className="mt-12 max-md:mt-10 text-white">
              <h2>About this watchlist</h2>
              <p>{watchlist.description} </p>

              <div>
                <p className="text-2xl">ITEMS ON LIST: {watchlist.movies.length}</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Movies in this Watchlist:</h3>
            <div className="flex gap-5 flex-wrap mt-5">
              {watchlist.movies.length ? (
                watchlist.movies.map((movie: any) => (
                  <MovieCard key={movie.id} {...movie} />
                ))
              ) : (
                <p>No movies in this watchlist yet.</p>
              )}
            </div>
        </section>
      </div>
    </div>
  );
};

export default WatchlistDetails;
