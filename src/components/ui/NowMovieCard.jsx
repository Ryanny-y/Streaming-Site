import { formatDate } from '../../utils/formatter'
import { Link } from 'react-router-dom';

const NowMovieCard = ({ movieDetails }) => {
  return (
    <Link to={`/watch/movie/movie-id=${movieDetails.id}`} className="flex items-center gap-4">
      <div id="movie_poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
          alt="Movie Poster"
          className="h-20 w-20 object-contain"
          loading="lazy"
        />
      </div>
      <div id="movie_details" className="text-sm">
        <h1 id="title">{movieDetails?.original_title}</h1>
        <p id="production">Movie</p>
        <p>{formatDate(movieDetails?.release_date)}</p>
      </div>
    </Link>
  );
};

export default NowMovieCard;
