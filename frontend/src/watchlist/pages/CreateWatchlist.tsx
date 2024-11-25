/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateWatchlist: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

 
    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const watchlistData = { name, description };

    try {
      const response = await fetch(`${BASE_URL}/watchlist/create`, {
        method: "POST",
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
        setFeedback({ type: "success", message: data.message });
        setTimeout(() => {
          navigate(`/watchlist-details/${data.data.watchlistId}`);
        }, 1500); // Redirect after success
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
    <div className="flex flex-col bg-black text-white">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-1 px-8 py-6 bg-stone-900">
          {/* Toast for feedback */}
          {feedback && (
            <Toast
              type={feedback.type}
              message={feedback.message}
              onClose={() => setFeedback(null)}
            />
          )}

          <h1 className="text-3xl font-semibold mb-6">
            Create a new Watchlist
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-black font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {loading ? "Creating..." : "Create Watchlist"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateWatchlist;
