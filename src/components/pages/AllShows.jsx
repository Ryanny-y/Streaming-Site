import { useParams, useNavigate } from "react-router-dom";
import HeaderTitle from "../common/HeaderTitle";
import MovieCard from "../ui/MovieCard";
import { useEffect, useState } from "react";
import useGetCountries from '../../utils/hooks/useGetCountries'
import SeriesCard from '../ui/SeriesCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const AllShows = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [shows, setShows] = useState([]);
  const [title, setTitle] = useState("");
  const { filter = "", pageNumber } = useParams();
  const pageNumberInt = parseInt(pageNumber.split('=')[1]);
  const { countries } = useGetCountries();
  const navigate = useNavigate();

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

  const getMovies = async (film, options) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${film}?page=${
          pageNumber.split("=")[1]
        }&${options}`,
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
        getMovies("movie", `with_genres=${id}`);
      }

      if (filter.includes("tv")) {
        getGenreName("tv", id);
        getMovies("tv", `with_genres=${id}`);
      }
    }

    if (filter.includes("country")) {
      const countryParam = filter.split('=')[1];
      if(countries.length) {
        const country = countries.find(country => country.iso_3166_1 === countryParam);
        setTitle(country.english_name);
        getMovies('movie', `with_origin_country=${country.iso_3166_1}`)
      }
    }
  }, [filter, countries, pageNumber]);

  const handlePrevPage = () => {
    const newPage = pageNumberInt - 1;
    console.log(newPage);
    if(newPage < 1) {
      return;
    }
    if(filter.includes('movie')) {
      const genre = filter.split('=')[1];
      navigate(`/shows/movie-genre=${genre}/page=${newPage}`)
    }
  }

  const handleNextPage = () => {
    const newPage = pageNumberInt + 1;
    if(filter.includes('movie')) {
      const genre = filter.split('=')[1]
      navigate(`/shows/movie-genre=${genre}/page=${newPage}`)
    }
  }

  return (
    <section id="all_shows">
      <div className="container flex flex-col gap-10 text-white">
        <HeaderTitle title={title} />

        <div className="all_movie_container">
          {shows.length > 0 &&
            ((filter.includes("movie") || (filter.includes('country'))) ? (
              shows.map((show) => <MovieCard key={show.id} movieId={show.id}/>)
            ) : filter.includes("tv") ? (
              shows.map((show) => <SeriesCard key={show.id} seriesId={show.id}/>)
            ) : null)}
        </div>

        <div className="page_switch flex gap-3 items-center justify-center">
          <button className="prev_btn hover:text-red-500 duration-200" onClick={handlePrevPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p id="page_number" className="text-xl text-red-500">
              {pageNumberInt}
          </p>
          <button className="next_btn hover:text-red-500 duration-200" onClick={handleNextPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllShows;
