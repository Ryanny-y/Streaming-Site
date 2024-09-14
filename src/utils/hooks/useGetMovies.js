import { useState, useEffect } from "react";

const getMovies = (url) => {
  const [movieData, setMovieData] = useState({});
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getMovieData = async (baseUrl) => {
      setIsLoading(true);
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTg3MWZkMTBmMGFjOGRhNjA4M2QyNGVmMmFlMTAwMiIsIm5iZiI6MTcyNjIwMzAyMy40NDY2MzEsInN1YiI6IjY2ODU2N2Y3NzU0OTI2ZDRlZDNiMjg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KEO2KxPShmWgDYLu4I8oukz7Ix2fHLDVVSI4GCZRAeY`
          },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response);
        }

        const data = await response.json();
        setMovieData(data);
        setIsError(null);
      } catch (error) {
        alert(error.message)
        setIsError(true);
        setMovieData([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieData(url);

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    movieData,
    isError,
    isLoading,
  };
};

export default getMovies;
