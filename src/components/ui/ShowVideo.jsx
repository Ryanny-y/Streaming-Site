import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowVideo = ({ video, show, showId }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const season = queryParams.get("s");
  const episode = queryParams.get("e");

  useEffect(() => {
    const fetchTrailer = async () => {
      if (video !== "trailer" || !show.includes("movie")) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${showId}/videos`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (!response.ok) {
          const { status_message } = await response.json();
          throw new Error(status_message || response.statusText);
        }

        const data = await response.json();
        const trailer = data.results.find((item) => item.type === "Trailer");
        setVideoKey(trailer?.key || null);
      } catch (err) {
        setError(err.message);
        console.error("Fetching trailer failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [video, show, showId, apiKey]);

  const renderIframe = (src) => (
    <iframe
      width="100%"
      height="100%"
      title="Video player"
      src={src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (video === "trailer" && videoKey) {
    return renderIframe(`https://www.youtube.com/embed/${videoKey}`);
  }

  if (video === "movie") {
    return renderIframe(`https://vidsrc.xyz/embed/${video}/${showId}`);
  }

  return renderIframe(
    `https://vidsrc.xyz/embed/tv/${showId}/${season}-${episode}`
  );
};

export default ShowVideo;
