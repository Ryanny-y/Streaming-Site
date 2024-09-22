import { useEffect, useState } from "react";

const ShowVideo = ({ video, show, showId }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (video === 'trailer' && show.includes('movie')) {
      getTrailer('movie');
    }
  }, [video, showId]); // Added showId to the dependency array

  const getTrailer = async (filmType) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${filmType}/${showId}/videos`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const trailer = data.results.find(result => result.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : null);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {video === "trailer" && videoKey ? (
        <iframe
          width="100%"
          height="100%"
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${videoKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>Movie</p>
      )}
    </>
  );
};

export default ShowVideo;
