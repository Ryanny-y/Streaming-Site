import { useParams } from "react-router-dom";
import HeaderTitle from "../common/HeaderTitle";
import MovieCard from "../ui/MovieCard";
import { useEffect, useState } from "react";

const AllShows = () => {
  const [shows, setShows] = useState([]);
  const [title, setTitle] = useState("");
  const { filter = "", pageNumber } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  const getGenreName = async (film, id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${film}/list`,
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
      const genreId = id;
      const genre = data.genres.find((genre) => genre.id === genreId);
      setTitle(genre.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMovies = async (film, id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${
          pageNumber.split("=")[1]
        }&with_genres=${id}`,
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
      setShows(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (filter.includes("genre")) {
      const id = Number(filter.split("=")[1]);
      if (filter.includes("movie")) {
        getGenreName("movie", id);
        getMovies("movie", id);
      }

      if (filter.includes("tv")) {
        getGenreName("tv", id);
        getMovies("tv", id);
      }
    }
  }, [filter]);

  return (
    <section id="all_shows">
      <div className="container flex flex-col gap-10 text-white">
        <HeaderTitle title={title} />

        <div className="all_movie_container">
          {shows.length > 0 &&
            (filter.includes("movie") ? (
              shows.map((show) => <MovieCard key={show.id} movieId={show.id}/>)
            ) : filter.includes("tv") ? (
              shows.map((show) => <MovieCard key={show.id} movieId={show.id}/>)
            ) : null)}
        </div>
      </div>
    </section>
  );
};

export default AllShows;
