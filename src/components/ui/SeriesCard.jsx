import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import { formatRatings, formatDuration } from "../../utils/formatter";

const SeriesCard = ({ seriesId }) => {
  const [details, setDetails] = useState({});
  const { movieDetails, error, isLoading } = useGetShowDetails("tv", seriesId);

  useEffect(() => {
    if (Object.keys(movieDetails)?.length && !error && !isLoading) {
      setDetails(movieDetails);
    }
  }, [movieDetails, error, isLoading]);

  return (
    <>
      {Object.keys(details)?.length ? (
        <div className="flex flex-col gap-3">
          <div id="image_poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
              alt="Image Poster"
              className="h-80 w-full"
            />
          </div>

          <h1 id="title" className="text-xl font-semibold tracking-wide">
            {details.name}
          </h1>

          <div id="rating_time" className="flex items-center gap-4 text-sm">
            <p>
              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              <span className="ml-1">
                {formatRatings(details.vote_average)}
              </span>
            </p>
            <p>Series/S {details.number_of_seasons}/EP {details.number_of_episodes}</p>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default SeriesCard;
