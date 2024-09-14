import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GenreCard from "./GenreCard";
import useGetGenres from "../../utils/hooks/useGetGenres";
import { useEffect, useState } from "react";

const TrendingMovieCard = ({ movieDetails }) => {

  const [ genres, setGenres ] = useState([]);
  const { genreData, error, isLoading } = useGetGenres(movieDetails.genre_ids);

  useEffect(() => {
    if(genreData?.length && !error && !isLoading) {
      setGenres(genreData)
    }

  }, [genreData, error, isLoading])
  return (
    <div className="flex flex-col gap-3">
      <div id="movie_poster" className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt="Movie Poster"
          className="h-80 w-full brightness-75 rounded-lg"
        />

        <h1 id="time" className="absolute top-3 left-3 text-sm">
          <FontAwesomeIcon icon={faClock} />
          <span className="ml-1 tracking-wide">1:45:00</span>
        </h1>

        <h1 id="rating" className="absolute top-3 right-3 text-sm">
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          <span className="ml-1 tracking-wide">6.5</span>
        </h1>
      </div>

      <h1 id="title" className="font-semibold tracking-wide text-xl">
        {movieDetails.original_title}
      </h1>

      <div id="genres" className="flex items-center gap-2">
        {genres &&
          genres.map(genre => 
            <GenreCard key={genre.id} genre={genre.name} />  
          )
        }
      </div>
    </div>
  );
};

export default TrendingMovieCard;
