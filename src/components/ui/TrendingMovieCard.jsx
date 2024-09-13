import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from '@fortawesome/free-regular-svg-icons' 
import { faStar } from "@fortawesome/free-solid-svg-icons"
import GenreCard from "./GenreCard"

const TrendingMovieCard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div id="movie_poster" className="relative">
        <img src="images/borderlands.jpeg" alt="Movie Poster" className="h-80 w-full brightness-75 rounded-lg"/>

        <h1 id="time" className="absolute top-3 left-3 text-sm">
          <FontAwesomeIcon icon={faClock}/>
          <span className="ml-1 tracking-wide">1:45:00</span>
        </h1>

        <h1 id="rating" className="absolute top-3 right-3 text-sm">
          <FontAwesomeIcon icon={faStar} className="text-yellow-300"/>
          <span className="ml-1 tracking-wide">6.5</span>
        </h1>
      </div>

      <h1 id="title" className="font-semibold tracking-wide text-xl">Borderlands</h1>
      
      <div id="genres" className="flex items-center gap-2">
        <GenreCard genre="Crime"/>
        <GenreCard genre="Action"/>
        <GenreCard genre="Thriller"/>
      </div>
    </div>
  )
}

export default TrendingMovieCard