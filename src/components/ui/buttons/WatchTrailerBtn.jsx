import { Link } from "react-router-dom";

const WatchTrailerBtn = ({ movieId }) => {
  return (
    <Link to={`/watch/trailer/movie-id=${movieId}`}
      id="watch_btn"
      className="flex items-center gap-2 bg-yellow-600 w-full justify-center self-center py-1 font-semibold text-sm rounded-sm tracking-wide hover:bg-yellow-500 duration-300"
    >
      Watch Trailer
    </Link>
  );
};

export default WatchTrailerBtn;
