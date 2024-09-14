import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import WatchBtn from "./buttons/WatchBtn";
import WatchTrailerBtn from './buttons/WatchTrailerBtn'


const MovieCard = () => {
  return (
    <div
      className="flex flex-col gap-3 pb-5 px-2 rounded-lg"
      style={{ background: "#333333" }}
    >
      <div className="image_poster w-full h-64">
        <img
          src="images/borderlands.jpeg"
          alt="Movie Poster"
          className="absolute top-0 right-0 w-full h-64 rounded-lg"
        />
      </div>

      <WatchBtn />
      <WatchTrailerBtn />

      <h1 id="title" className="tracking-wide font-medium">Borderlands</h1>

      <div id="ratings_duration" className="flex items-center justify-between text-sm">
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
          <span>5.8</span>
        </p>
        <p className="flex items-center gap-1">
          <FontAwesomeIcon icon={faClock}/>
          <span>2:12:00</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
