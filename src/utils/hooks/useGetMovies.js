import { useState, useEffect } from "react";

const useGetMovies = (url) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieData, setMovieData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getMovieData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response);
        }

        const data = await response.json();
        setMovieData(data);
        setError(null);
      } catch (error) {
        console.log(error.message)
        setError(error);
        setMovieData([]);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    movieData,
    error,
    isLoading,
  };
};

export default useGetMovies;
