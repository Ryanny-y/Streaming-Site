import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import WatchBtn from "./buttons/WatchBtn";
import WatchTrailerBtn from "./buttons/WatchTrailerBtn";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import { useEffect, useState } from "react";
import { formatRatings } from "../../utils/formatter";
import { Link } from "react-router-dom";

const MovieCard = ({ seriesId }) => {
  const [details, setDetails] = useState({});
  const { showDetails, error, isLoading } = useGetShowDetails("tv", seriesId);

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
          <Link to={`/watch/tv/tv-id=${seriesId}?s=1&e=1`} className="image_poster w-full h-64">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
              alt="Movie Poster"
              className="absolute top-0 right-0 w-full h-64 rounded-lg"
            />
          </Link>

          <WatchBtn filmType='tv' showId={details.id} options="?s=1&e=1"/>
          <WatchTrailerBtn />

          <h1 id="title" className="tracking-wide font-medium">
            {details.original_title}
          </h1>

          <div
            id="ratings_duration"
            className="flex items-center justify-between text-sm"
          >
            <p>
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
              <span className="ml-1">
                {formatRatings(details.vote_average)}
              </span>
            </p>
            <p>
              Series/S {details.number_of_seasons}/EP{" "}
              {details.number_of_episodes}
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
