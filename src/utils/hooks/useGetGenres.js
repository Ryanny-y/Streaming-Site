import { useEffect, useState } from "react";

const useGetGenres = (film) => {
  const apiKey = import.meta.env.VITE_API_KEY
  const [genreData, setGenreData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGenres = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${film}/list`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(response);
        }

        const data = await response.json();
        setGenreData(data.genres)
        setError(null)
      } catch (error) {
        console.log(error);
        setGenreData([]);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getGenres();

    return () => {
      controller.abort();
    };
  }, []);

  return { genreData, error, isLoading };
};

export default useGetGenres;
