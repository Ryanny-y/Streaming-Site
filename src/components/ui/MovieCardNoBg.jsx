import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import { useEffect, useState } from "react";
import { formatRatings, formatDuration } from "../../utils/formatter";
import { Link } from "react-router-dom";

const MovieCardNoBg = ({ movieId }) => {
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
          <Link to={`/watch/movie/movie-id=${movieId}`} id="image_poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
              alt="Image Poster"
              className="h-80 w-full"
            />
          </Link>

          <h1 id="title" className="text-xl font-semibold tracking-wide">
            {details?.original_title}
          </h1>

          <div id="rating_duration" className="flex items-center gap-3 text-sm">
            <p>
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <span className="ml-1">
                {formatRatings(details?.vote_average)}
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} />
              <span className="ml-1">{formatDuration(details?.runtime)}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default MovieCardNoBg;
