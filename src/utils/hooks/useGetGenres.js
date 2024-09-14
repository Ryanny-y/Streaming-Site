import { useEffect, useState } from "react";

const useGetGenres = (genreIds) => {
  const apiKey = import.meta.env.API_KEY
  const [genreData, setGenreData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const getGenres = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
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
        const genres = data.genres.filter(genre => genreIds.some(id => genre.id === id));
        setGenreData(genres.slice(0, 3));
        setError(null)
      } catch (error) {
        alert(error);
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
  }, [genreIds]);

  return { genreData, error, isLoading };
};

export default useGetGenres;
