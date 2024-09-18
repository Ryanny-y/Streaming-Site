import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDuration } from '../../utils/formatter'
 
const Header = () => {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [showNav, setShowNav] = useState(false);
  const [searcHInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultDetails, setResultDetails] = useState([]);

  const handleSearch = async (e) => {
    try {
      const value = e.target.value;
      setSearchInput(value);

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchResults.length) {
      const getDetails = async () => {
        const details = Promise.all(
          searchResults.slice(0, 5).map(async (search) => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${search.id}`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${apiKey}`,
                  },
                }
              );
              if (!response.ok) {
                throw new Error(response);
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.log(error);
            }
          })
        );
        const responses = await details;
        setResultDetails(responses);
      };
      getDetails();
    }
  }, [searchResults]);

  return (
    <header id="header" className="sticky top-0 py-5 z-40 bg-black">
      <div className="container flex flex-wrap items-center justify-between gap-5 text-white">
        {/* NAVIGATION HEADER */}
        <nav id="header-nav">
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl block md:hidden hover:text-red-600 duration-500"
            onClick={() => setShowNav(true)}
          />

          <ul
            className={`flex flex-wrap justify-center items-center gap-4 fixed bg-black ${
              showNav ? "top-0" : "-top-1/2"
            } py-14 left-0 right-0 z-40 duration-700 transition-all px-5`}
          >
            <FontAwesomeIcon
              icon={faChevronUp}
              className="absolute top-5 right-5 font-semibold"
              onClick={() => setShowNav(false)}
            />
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="movies">Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="series">TV Series</Link>
            </li>
            <li className="nav-link">
              <Link to="genres">Genre</Link>
            </li>
            <li className="nav-link">
              <Link to="countries">Countries</Link>
            </li>
          </ul>

          <ul className="hidden items-center gap-4 md:flex">
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="movies">Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="series">TV Series</Link>
            </li>
            <li className="nav-link">
              <Link to="genres">Genre</Link>
            </li>
            <li className="nav-link">
              <Link to="countries">Countries</Link>
            </li>
          </ul>
        </nav>

        {/* SEARCH BAR */}
        <div
          id="search-bar"
          className="bg-white rounded-full relative px-5 py-2 gap-2 grow flex items-center justify-between text-black"
        >
          <input
            type="text"
            value={searcHInput}
            onChange={(e) => handleSearch(e)}
            name="search"
            id="search"
            className="bg-transparent outline-none text-sm min-w-40 w-full"
            placeholder="Search Show."
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />

          {searchResults.length > 0 && (
            <div className="search_results absolute top-10 flex flex-col gap-1 left-0 right-0">
              {resultDetails.map((result) => (
                <div key={result.id} className="result flex items-start gap-2 bg-white px-3 py-2">
                  <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt="Image Poster" className="h-16 w-14" />

                  <span id="details" className="flex flex-col gap-1">
                    <p>{result.original_title}</p>
                    <p>{formatDuration(result.runtime)}</p>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WATCHLIST AND FAVORITES */}
        <div className="flex items-center gap-4 text-white text-xl">
          <span className="relative group flex">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-yellow-500 group-hover:hidden"
            />
            <i className="fas fa-bookmark hidden group-hover:block text-yellow-500"></i>
            <p className="text-xs absolute top-8 group-hover:opacity-100 left-0 opacity-0 transition-all">
              Add To Watchlist
            </p>
          </span>
          <span className="relative group flex">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-600 group-hover:hidden"
            />
            <i className="fas fa-heart hidden group-hover:block text-red-600"></i>
            <p className="text-xs absolute top-8 group-hover:opacity-100 left-0 opacity-0 transition-all">
              Add To Favorites
            </p>
          </span>
        </div>

        {/* LOGIN/REGISTER */}
        <div className="buttons text-white flex items-center gap-3 font-semibold ml-auto">
          <button className="text-red-500 py-1 rounded-full hover:text-white duration-200">
            Login
          </button>
          <button className="bg-red-700 px-5 py-1 rounded-full hover:bg-light-red duration-200">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
