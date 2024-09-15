import { useState, useEffect } from "react";

const useGetShows = (url) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [showData, setShowData] = useState({});
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
        setShowData(data);
        setError(null);
      } catch (error) {
        console.log(error.message)
        setError(error);
        setShowData([]);
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
    showData,
    error,
    isLoading,
  };
};

export default useGetShows;
