import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetShowDetails from "../../utils/hooks/useGetShowDetails";
import MovieDetails from "../ui/MovieDetails";
import Recommendation from "../ui/Recommendation";

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
            <section
              id="video_container"
              className="w-full"
              style={{ height: "500px" }}
            >
              {video === 'trailer' ? (
                <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/957452"
                title="YouTube video player"
                frameborder="0"
                autoPlay="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
              ) : (
                <p>Movie</p>
              )}
            </section>

            <MovieDetails filmType={filmType} details={details} />

            <Recommendation filmType={filmType} showId={showId} />
          </>
        )}
      </div>
    </main>
  );
};

export default WatchShow;
