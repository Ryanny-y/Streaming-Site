import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import WatchBtn from "./buttons/WatchBtn";
import WatchTrailerBtn from "./buttons/WatchTrailerBtn";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import { useEffect, useState } from "react";
import { formatRatings, formatDuration } from "../../utils/formatter";
import { Link } from "react-router-dom";

const MovieCard = ({ movieId }) => {
  const [details, setDetails] = useState({});
  const { showDetails, error, isLoading } = useGetShowDetails(
    "movie",
    movieId
  );

  useEffect(() => {
    if (Object.keys(showDetails)?.length && !error && !isLoading) {
      setDetails(showDetails);
    }
  }, [showDetails, error, isLoading]);

  return (
    <>
      {Object.keys(details)?.length ? (
        <div
          className="flex flex-col gap-3 pb-5 px-2 relative rounded-lg h-full"
          style={{ background: "#333333" }}
        >
          <Link to={`/watch/movie/movie-id=${movieId}`} className="image_poster w-full h-64">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
              alt="Movie Poster"
              className="absolute top-0 w-full right-0 h-64 rounded-lg"
            />
          </Link>

          <WatchBtn filmType='movie' showId={movieId}/>
          <WatchTrailerBtn filmType="movie" movieId={movieId}/>

          <h1 id="title" className="tracking-wide font-medium">
            {details.original_title}
          </h1>

          <div
            id="ratings_duration"
            className="flex items-center justify-between text-sm"
          >
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <span>{formatRatings(details.vote_average)}</span>
            </p>
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} />
              <span>{formatDuration(details.runtime)}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default MovieCard;
