import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GenreCard from "./GenreCard";
import { useEffect, useState } from "react";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import { formatRatings, formatDuration } from "../../utils/formatter";
import { Link } from "react-router-dom";

const TrendingMovieCard = ({ movieId }) => {
  const [details, setDetails] = useState({});
  const { showDetails, error, isLoading } = useGetShowDetails('movie', movieId);

  useEffect(() => {
    if (Object.keys(showDetails)?.length && !error && !isLoading) {
      setDetails(showDetails);
    }
  }, [showDetails, error, isLoading]);

  return (
    <>
      {Object.keys(details)?.length ? (
        <div className="flex flex-col gap-3">
          <Link to={`/watch/movie/movie-id=${movieId}`} id="movie_poster" className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
              alt="Movie Poster"
              className="h-80 w-full brightness-75 rounded-lg"
            />

            <h1 id="time" className="absolute top-3 left-3 text-sm">
              <FontAwesomeIcon icon={faClock} />
              <span className="ml-1 tracking-wide">
                {formatDuration(details.runtime)}
              </span>
            </h1>

            <h1 id="rating" className="absolute top-3 right-3 text-sm">
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <span className="ml-1 tracking-wide">
                {formatRatings(details.vote_average)}
              </span>
            </h1>
          </Link>

          <h1 id="title" className="font-semibold tracking-wide text-xl">
            {details.original_title}
          </h1>

          <div id="genres" className="flex items-center gap-2">
            {details.genres.slice(0, 3).map((genre) => (
              <GenreCard key={genre.id} genre={genre.name} />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default TrendingMovieCard;
