import { useParams, useNavigate } from "react-router-dom";
import HeaderTitle from "../common/HeaderTitle";
import MovieCard from "../ui/MovieCard";
import { useEffect, useState, useMemo, useCallback } from "react";
import useGetCountries from "../../utils/hooks/useGetCountries";
import SeriesCard from "../ui/SeriesCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const AllShows = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [shows, setShows] = useState([]);
  const [title, setTitle] = useState("");
  const [ loading, setLoading ] = useState(false);
  const { filter = "", pageNumber } = useParams();
  const pageNumberInt = parseInt(pageNumber.split("=")[1]);
  const { countries } = useGetCountries();
  const navigate = useNavigate();

  const fetchAPI = async (url, errMessage) => {
    try {
      setLoading(true)
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errMessage;
        throw new Error(errMsg);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  };

  const getGenreName = async (film, id) => {
    try {
      const data = await fetchAPI(
        `https://api.themoviedb.org/3/genre/${film}/list`,
        "Failed To Fetch Genre Name"
      );

      if (data) {
        const genre = data.genres.find((genre) => genre.id === id);
        if (genre) setTitle(genre.name);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getShows = async (film, options) => {
    try {
      const data = await fetchAPI(
        `https://api.themoviedb.org/3/discover/${film}?page=${
          pageNumber.split("=")[1]
        }&${options}`,
        "Failed to fetch Shows"
      );
      if (data) {
        setShows(data.results);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSearchResults = async (query) => {
    try {
      const data = await fetchAPI(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        'Failed to fetch Movie'
      );
      if(data) {
        setShows(data.results);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (filter.includes("genre")) {
      const [filmTypeWithGenre, genreId] = filter.split("=");
      const filmType = filmTypeWithGenre.split('-')[0];
    
      getGenreName(filmType, Number(genreId));
      getShows(filmType, `with_genres=${genreId}`);
    }

    if (filter.includes("country") && countries.length) {
      const countryParam = filter.split("=")[1];
      const country = countries.find((c) => c.iso_3166_1 === countryParam);
      if (country) {
        setTitle(country.english_name);
        getShows("movie", `with_origin_country=${country.iso_3166_1}`);
      }
    }

    if (filter.includes("search")) {
      const query = filter.split("=")[1];
      setTitle(`Search Result for ${query}`);
      getSearchResults(query);
    }
  }, [filter, countries, pageNumber]);

  const navigateToPage = useCallback(
    (newPage) => {
      if (newPage < 1) return;
      const routeBase = filter.includes("movie") ? "movie-genre" : "tv-genre";
      const genreId = filter.split("=")[1];
      navigate(`/shows/${routeBase}=${genreId}/page=${newPage}`);
    },
    [filter, navigate]
  );

  const showCards = useMemo(() => {
    return shows.length > 0
      ? shows.map((show) =>
          filter.includes("tv") ? (
            <SeriesCard key={show.id} seriesId={show.id} />
          ) : (
            <MovieCard key={show.id} movieId={show.id} />
          )
        )
      : null;
  }, [shows, filter]);

  return (
    <section id="all_shows">
      <div className="container flex flex-col gap-10 text-white">
        <HeaderTitle title={title} />

        {loading ? (
          <p>Loading</p>
        ) : (
        <div className="all_movie_container">
          {shows.length > 0 ? showCards : <p>No Shows Found</p>} 
        </div>
        )}

        {shows.length > 0 && (
          <div className="page_switch flex gap-3 items-center justify-center">
            <button
              className="prev_btn hover:text-red-500 duration-200"
              onClick={() => navigateToPage(pageNumberInt - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <p id="page_number" className="text-xl text-red-500">
              {pageNumberInt}
            </p>
            <button
              className="next_btn hover:text-red-500 duration-200"
              onClick={() => navigateToPage(pageNumberInt + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllShows;