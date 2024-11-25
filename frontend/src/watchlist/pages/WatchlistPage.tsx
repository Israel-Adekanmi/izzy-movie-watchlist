/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PopularMovies from "../components/MoviesSection";
import SearchBar from "../components/SearchBar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WatchlistPage: React.FC = () => {
  const [view, setView] = useState<"default" | "search">("default");
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (endpoint: string, setter: React.Dispatch<any>) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setter(data.results || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleSearch = async (query: string) => {
    setView("search");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/search?query=${query}&page=1`);
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setSearchResults(data.results || []); // Ensure `movies` is the correct key in your backend response.
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "default") {
      setLoading(true);
      Promise.all([
        fetchMovies("popular?page=1", setPopularMovies),
        fetchMovies("trending?page=1", setTrendingMovies),
        fetchMovies("top-rated?page=1", setTopRatedMovies),
      ]).finally(() => setLoading(false));
    }
  }, [view]);

  return (
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        <section className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full bg-stone-900">
          <div className="flex flex-col pt-5 pr-20 pb-9 pl-5 rounded-lg border border-red-800 border-solid bg-zinc-300 bg-opacity-10 text-neutral-200 max-md:pr-5 max-md:max-w-full">
            <h2 className="self-start text-4xl text-center">
              Welcome to <span className="text-red-500">IzzyWatch</span>
            </h2>
            <p className="mt-9 text-xl max-md:max-w-full">
              Browse movies, add them to watchlists and share them with friends.{" "}
              <br />
              Just click the to add a movie, the poster to see more details or
              to mark the movie as watched.
            </p>
          </div>
          <SearchBar
            onSearch={handleSearch}
            buttonText="search"
            placeholder="Search for movies by title"
          />
          {loading ? (
            <p className="text-center text-neutral-200 mt-9">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-9">{error}</p>
          ) : view === "search" ? (
            <PopularMovies movies={searchResults} />
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-3xl text-neutral-200 mb-4">
                  Popular Movies
                </h3>
                <PopularMovies movies={popularMovies} />
              </div>
              <div className="mb-8">
                <h3 className="text-3xl text-neutral-200 mb-4">
                  Trending Movies
                </h3>
                <PopularMovies movies={trendingMovies} />
              </div>
              <div className="mb-8">
                <h3 className="text-3xl text-neutral-200 mb-4">
                  Top Rated Movies
                </h3>
                <PopularMovies movies={topRatedMovies} />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default WatchlistPage;
