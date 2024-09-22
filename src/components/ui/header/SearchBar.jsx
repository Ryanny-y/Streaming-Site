import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { formatDuration } from "../../../utils/formatter";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [searcHInput, setSearchInput] = useState("");
  const [resultDetails, setResultDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
  
  const onSearchEnter = (e) => {
    if(e.key === 'Enter') {
      window.location.href = `/shows/search=${e.target.value}/page=1`
    }
  }

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
    // SEARCH BAR
    <div
      id="search-bar"
      className="bg-white rounded-full relative px-5 py-2 gap-2 grow flex items-center justify-between text-black"
    >
      <input
        type="text"
        value={searcHInput}
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e) => onSearchEnter(e)}
        name="search"
        id="search"
        className="bg-transparent outline-none text-sm min-w-40 w-full"
        placeholder="Search Show."
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />

      {searchResults.length > 0 && (
        <div className="search_results absolute top-10 flex flex-col gap-1 left-0 right-0">
          {resultDetails.map((result) => (
            <Link
              to={`/watch/movie/movie-id=${result.id }`}
              key={result.id}
              className="result flex items-start gap-2 bg-white px-3 py-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                alt="Image Poster"
                className="h-16 w-14"
              />

              <span id="details" className="flex flex-col gap-1">
                <p>{result.original_title}</p>
                <p>{formatDuration(result.runtime)}</p>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
