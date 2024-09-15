import { useState, useEffect } from "react";

const useGetMovieDetails = (id) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${apiKey}`,
            },
            signal: controller.signal
          }
        );

        if(!response.ok) {
          const errData = await response.json();
          const errMsg = errData.message || errData.statusText;
          throw new Error(errMsg);
        }

        const data = await response.json();
        setMovieDetails(data);        
        setError(null);

      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setMovieDetails({})
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails(id);

    return () => {
      controller.abort();
    };
  }, [id]);

  return { movieDetails, error, isLoading };
};

export default useGetMovieDetails;
