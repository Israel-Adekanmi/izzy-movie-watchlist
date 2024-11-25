/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "../components/Sidebar";
import MovieDetailsCard from "../components/MovieDetailsCard";
import RelatedMovies from "../components/RelatedMovies";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { MovieDetailsCardProps } from "../type";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MovieDetailsPage: React.FC = () => {
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Extract `id` from the URL
  const [movies, setMovie] = useState<any>(null);
  const [recomMovies, setRecomMovie] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [errorRecommendations, setErrorRecommendations] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!id) return;

    if (!token) {
        navigate("/login");
        return;
      }

      const fetchMovieDetails = async () => {
        setLoadingDetails(true);
        try {
          const response = await fetch(`${BASE_URL}/get-movie/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the access token here
            },
          });
  
          const data = await response.json();
          if (data.error) throw new Error(data.message);
          setMovie(data);
        } catch (err: any) {
          setErrorDetails(err.message || "Something went wrong");
        } finally {
          setLoadingDetails(false);
        }
      };
  
      const fetchMovieRecommendation = async () => {
        setLoadingRecommendations(true);
        try {
          const response = await fetch(
            `${BASE_URL}/recommendations/${id}?page=1`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Pass the access token here
              },
            }
          );
          const data = await response.json();
          if (data.error) throw new Error(data.message);
          setRecomMovie(data.results || []);
        } catch (err: any) {
          setErrorRecommendations(err.message || "Something went wrong");
        } finally {
          setLoadingRecommendations(false);
        }
      };

    fetchMovieDetails();
    fetchMovieRecommendation();
  }, [id, token, navigate]);

  if (loadingDetails)
    return <p className="text-center text-neutral-200 mt-9">Loading...</p>;
  if (errorDetails)
    return <p className="text-center text-red-500 mt-9">{errorDetails}</p>;

  return (
    <div className="flex flex-col bg-black">
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        <section className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full bg-stone-900">
          <div className="flex flex-col pt-5 pr-20 pb-9 pl-5 rounded-lg border border-red-800 border-solid bg-zinc-300 bg-opacity-10 text-neutral-200 max-md:pr-5 max-md:max-w-full">
            <h2 className="self-start text-4xl text-center">Movie Details</h2>
          </div>
          {/* Pass the movie data to MovieDetailsCard */}
          <div className="flex flex-col gap-10 mt-9 max-md:max-w-full">
            <MovieDetailsCard {...movies} />
          </div>

          {/* Related Movies */}
          {loadingRecommendations ? (
            <p className="text-center text-neutral-200 mt-9">
              Loading recommendations...
            </p>
          ) : errorRecommendations ? (
            <p className="text-center text-red-500 mt-9">
              {errorRecommendations}
            </p>
          ) : (
            <RelatedMovies movies={recomMovies} />
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
