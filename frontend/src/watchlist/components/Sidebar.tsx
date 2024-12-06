/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Toast from "../components/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userFirstName, setUserFirstName] = useState<string | null>("");
  const [userWatchlists, setUserWatchlists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setUserFirstName(null); // No token, set as "GUEST"
      return;
    }

    // Fetch user profile if token exists
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.error && data.data) {
          setUserFirstName(data.data.firstName); // Set the first name
        } else {
          setUserFirstName(null); // If there's an error, treat as guest
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setUserFirstName(null);
      }
    };

    // Fetch user watchlists if logged in
    const fetchUserWatchlists = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/user-watchlists`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.error) {
          setFeedback({ type: "error", message: data.message });
        } else {
          setUserWatchlists(data.data || []);
        }
      } catch (err: any) {
        setFeedback({
          type: "error",
          message: err.message || "Failed to load watchlists.",
        });
      } finally {
        setLoading(false);
      }
    };
    // Fetch user current streak
    const fetchCurrentStreak = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-current-streak`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.error) {
          setCurrentStreak(data); // Set the current streak value
        } else {
          setCurrentStreak(null); // Reset streak on error
        }
      } catch (err) {
        console.error("Error fetching current streak:", err);
        setCurrentStreak(null);
      }
    };

    if (token) {
      fetchUserProfile();
      fetchUserWatchlists();
      fetchCurrentStreak(); // Fetch the current streak
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setUserFirstName(null); // Clear user data
    navigate("/login");
  };

  const handleWatchlistClick = (watchlistId: string) => {
    navigate(`/watchlist-details/${watchlistId}`);
  };
  //   console.log('current streak: ', currentStreak)

  return (
    <aside className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col items-start self-stretch my-auto h-full w-full text-base text-center text-neutral-200 max-md:mt-10">
        <h1 className="pt-4 ml-3 text-3xl font-extrabold pl-3 text-red-500 max-md:ml-2.5">
          IzzyWatch
        </h1>

        {/* Current Streak Display */}
        {currentStreak !== null && (
          <div className=" ml-3 px-4 mt-5 py-4 bg-red-500 rounded-xl text-white">
            <span className="font-semibold text-2xl">
              Current Streak: <br />
              <span className="text-black font-bold">{currentStreak}</span>
            </span>
          </div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`p-3 mt-4 mb-4 text-white text-center rounded-md ${
              feedback.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <button
          onClick={() => navigate("/mood-recommendation")}
          className={`flex gap-4 ml-4 px-3 py-2 mt-5 whitespace-nowrap rounded-md border border-solid border-zinc-300 border-opacity-30 text-zinc-300 text-opacity-30 ${
            location.pathname === "/mood-recommendation"
              ? "bg-red-500"
              : "bg-black"
          }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de49f6323d6fb4c6fbb22968e591fe227c08c9dda743b9ab51bf71068490937d?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
            alt=""
            className="object-contain shrink-0 aspect-square w-[21px]"
          />
          <span className="basis-auto">Search</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className={`flex gap-3.5 px-3 py-2.5 mt-10 whitespace-nowrap ml-4 rounded-md w-[75%] text-left focus:outline-none focus:ring-2 ${
            location.pathname === "/" ? "bg-red-500" : "bg-stone-900"
          }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/666b53acf7c4ada34911bbe2dfdda4ee32b945da1cc8a0e12758a9cb4aaeffc7?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
            alt="Home Icon"
            className="object-contain shrink-0 w-6 aspect-[1.14]"
          />
          <span className="basis-auto">Home</span>
        </button>

        <button
          onClick={() => navigate("/history")}
          className={`flex gap-4 md w-[75%] px-3 py-2.5 mt-5 whitespace-nowrap rounded-md ml-4 text-left focus:outline-none focus:ring-2 ${
            location.pathname === "/history" ? "bg-red-500" : "bg-black"
          }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/46930c2ff4b208a18e73462cb80f2cc8f38f506ea1e2ffe858e8a46a3b519d2a?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
            alt=""
            className="object-contain shrink-0 aspect-[1.05] w-[22px]"
          />
          <span className="basis-auto">History</span>
        </button>

        <button
          onClick={() => navigate("/reminders")}
          className={`flex gap-4 md w-[88%] px-3 py-2.5 mt-5 whitespace-nowrap rounded-md ml-4 text-left focus:outline-none focus:ring-2 ${
            location.pathname === "/reminders" ? "bg-red-500" : "bg-black"
          }`}
        >
          <img
            loading="lazy"
            src="https://i.ibb.co/DPFSRWd/image-removebg-preview-1.png"
            alt=""
            className="object-contain shrink-0 aspect-[1.05] w-[22px]"
          />
          <span className="basis-auto">Reminders</span>
        </button>

        <button
          onClick={() => navigate("/create-watchlist")}
          className={`flex gap-4 px-3 py-2.5 mt-5 whitespace-nowrap pl-7 rounded-md w-full text-left focus:outline-none focus:ring-2 ${
            location.pathname === "/create-watchlist"
              ? "bg-red-500"
              : "bg-black"
          }`}
        >
          +  Create watchlist
        </button>

        <hr className="shrink-0 self-stretch mt-5 h-px border border-solid border-zinc-300 border-opacity-30" />

        {/* User watchlists (only visible if user is logged in) */}
        {token && (
          <div className="mt-8">
            <h2 className="mt-5 ml-3 text-xl tracking-wider text-neutral-400 max-md:ml-2.5">
              My Lists
            </h2>
            {loading ? (
              <p className="text-neutral-200">Loading your watchlists...</p>
            ) : (
              userWatchlists.map((watchlist: any) => (
                <button
                  key={watchlist.watchlistId}
                  onClick={() => handleWatchlistClick(watchlist.watchlistId)}
                  className="mt-4 text-white w-full text-left px-5 py-3 bg-stone-900 rounded-md"
                >
                  {watchlist.name}
                </button>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/edit-profile")}
          className="mb-8 flex gap-5 justify-between px-3 py-1.5 mt-80 w-full text-xs whitespace-nowrap rounded border border-solid border-neutral-200 max-md:mt-10 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <div className="flex gap-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b7a65c7803b8b1f10bb082b83ae35325fc46059d5bf069d44f491e29461ed7a?placeholderIfAbsent=true&apiKey=f5b8ba5475bd498da429e6b069b7e677"
              alt="Profile picture"
              className="object-contain shrink-0 w-8 aspect-square rounded-[32px]"
            />
            <span className="my-auto">{userFirstName || "GUEST"}</span>
          </div>
        </button>

        {/* Display logout button if user is authenticated */}
        {userFirstName && (
          <button
            onClick={handleLogout}
            className="text-red-500 pl-5 text-2xl focus:outline-none"
          >
            Logout
          </button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
