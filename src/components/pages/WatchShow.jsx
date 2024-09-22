import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import ShowDetails from "../ui/ShowDetails";
import Recommendation from "../ui/Recommendation";
import ShowVideo from "../ui/ShowVideo";
import Reviews from "../ui/Reviews";

const WatchShow = () => {
  const { video, show = "" } = useParams();
  const [details, setDetails] = useState({});
  const showId = show.split("=")[1];
  const [filmType, setFilmType] = useState("");
  const { showDetails, error, isLoading } = useGetShowDetails(filmType, showId);

  useEffect(() => {
    if (show.includes("movie")) {
      setFilmType("movie");
    } else if (show.includes("tv")) {
      setFilmType("tv");
    }

    if (Object.keys(showDetails)?.length && !error && !isLoading) {
      setDetails(showDetails);
    }
  }, [show, showDetails, error, isLoading]);

  return (
    <main id="watch_show">
      <div className="container flex flex-col gap-16 text-white">
        {Object.keys(details).length > 0 && !isLoading && !error && (
          <>
            {/* Video Container */}
            <section
              id="video_container"
              className="w-full flex flex-col gap-10"
              style={{ height: "600px" }}
            >
              {/* <ShowVideo video={video} show={show} showId={showId} /> */}

              {(video === "movie" || video == 'trailer') && (
                <div id="action_btns" className="flex gap-5 items-center w-full">
                  <Link to={`/watch/movie/movie-id=${showId}`} className="flex-1 flex items-center gap-2 bg-red-600 w-full justify-center py-3 font-semibold text-sm rounded-lg tracking-wide hover:bg-light-red duration-300">
                    <FontAwesomeIcon icon={faPlay} />
                    Watch Now
                  </Link>
                  <Link to={`/watch/trailer/movie-id=${showId}`} className="flex-1 flex items-center gap-2 bg-yellow-600 w-full justify-center py-3 font-semibold text-sm rounded-lg tracking-wide hover:bg-yellow-500 duration-300">Watch Trailer</Link>
                </div>
              )}
            </section>

            {/* Show Details */}
            <ShowDetails filmType={filmType} details={details} />

            {/* Recommendations */}
            <Recommendation filmType={filmType} showId={showId} />

            {/* Reviews */}
            <Reviews filmType={filmType} showId={showId}/>
          </>
        )}
      </div>
    </main>
  );
};

export default WatchShow;
