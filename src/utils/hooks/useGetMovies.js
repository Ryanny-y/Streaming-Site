import { useState, useEffect } from "react";

const useGetmovies = (url) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieData, setMovieData] = useState({});
  const [error, setError] = useState(null);
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
        alert(error.message)
        setError(error);
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
    error,
    isLoading,
  };
};

export default useGetmovies;
