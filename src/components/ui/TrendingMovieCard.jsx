import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GenreCard from "./GenreCard";
import { useEffect, useState } from "react";
import useGetMovieDetails from "../../utils/hooks/useGetMovieDetails";
import { formatRatings, formatDuration } from "../../utils/formatter";

const TrendingMovieCard = ({ movieId }) => {
  const [details, setDetails] = useState({});
  const { movieDetails, error, isLoading } = useGetMovieDetails(movieId);

  useEffect(() => {
    if (Object.keys(movieDetails)?.length && !error && !isLoading) {
      setDetails(movieDetails);
    }
  }, [movieDetails, error, isLoading]);

  return (
    <>
      {Object.keys(details)?.length && (
        <div className="flex flex-col gap-3">
          <div id="movie_poster" className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt="Movie Poster"
              className="h-80 w-full brightness-75 rounded-lg"
            />

            <h1 id="time" className="absolute top-3 left-3 text-sm">
              <FontAwesomeIcon icon={faClock} />
              <span className="ml-1 tracking-wide">{formatDuration(details.runtime)}</span>
            </h1>

            <h1 id="rating" className="absolute top-3 right-3 text-sm">
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <span className="ml-1 tracking-wide">{formatRatings(details.vote_average)}</span>
            </h1>
          </div>

          <h1 id="title" className="font-semibold tracking-wide text-xl">
            {details.original_title}
          </h1>

          <div id="genres" className="flex items-center gap-2">
              {details.genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre.name} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingMovieCard;
