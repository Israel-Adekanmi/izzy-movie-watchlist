/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");
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

  useEffect(() => {
    const fetchUserHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/get-movie-history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) throw new Error(data.message);
        setHistory(data.data); // Assuming `data.data` is the history object
      } catch (err: any) {
        // setError(err.message || "Error fetching movie history");
        setFeedback({
          type: "error",
          message: err.message || "Error fetching movie history",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [token]);

  // Handle clearing the history
  const handleClearHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/delete-history`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setHistory(null); // Clear the history from state
      setFeedback({ type: "success", message: data.message });
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Error clearing history",
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
            <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full text-white">
              <h2 className="text-3xl text-neutral-200 ">Watch History</h2>
              {history && history.movies.length > 0 && (
                <button
                  className="my-auto text-base font-bold text-center text-red-500"
                  onClick={handleClearHistory}
                >
                  Clear History
                </button>
              )}
            </div>

            <div className="mt-12 max-md:mt-10 text-white">
              {loading ? (
                <p>Loading history...</p>
              ) : history && history.movies.length === 0 ? (
                <p>No History Available</p>
              ) : null}
            </div>
          </div>

          <div className="flex gap-5 flex-wrap mt-5">
            {!loading && history && history.movies.length ? (
              history.movies.map((movie: any) => (
                <MovieCard key={movie.id} {...movie} />
              ))
            ) : (
              !loading &&
              history &&
              history.movies.length === 0 && (
                <p>No movies watched yet.</p>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryPage;
