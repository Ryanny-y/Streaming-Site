import { useEffect, useState } from 'react';
import useGetShows from '../../../utils/hooks/useGetShows';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatRatings, formatDuration } from '../../../utils/formatter'
import { Link } from 'react-router-dom'

const Hero = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movies, setMovies] = useState([]);
  const [randomNum] = useState(() => Math.floor(Math.random() * 482) + 1);
  const [movieDetails, setMovieDetails] = useState([]);
  
  // Fetch top-rated movies
  const { showData, error, isLoading } = useGetShows(`https://api.themoviedb.org/3/movie/top_rated?page=${randomNum}`);

  useEffect(() => {
    if (showData?.results?.length && !error && !isLoading) {
      setMovies(showData.results.slice(0, 5)); // Get the top 5 movies
    }
  }, [showData, error, isLoading]);

  useEffect(() => {
    if (movies.length > 0) {
      fetchMovieDetails();
    }
  }, [movies]);

  const fetchMovieDetails = async () => {
    try {
      const responses = await Promise.all(
        movies.map(movie => getMovieDetails(movie.id))
      );

      const successfulDetails = responses.filter(response => response);
      setMovieDetails(successfulDetails);
      
    } catch (error) {
      console.log('An unexpected error occurred:', error.message);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }

      return await response.json();
    } catch (error) {
      console.log(`Error fetching details for movie ID ${id}:`, error.message);
      return null; // Return null for failed requests
    }
  };

  return (
    <section id="hero" className="relative" style={{ height: 'calc(100vh - 76px)' }}>
      <div className="swiper-wrapper h-full w-full">
        <swiper-container style={{ height: '100%' }}>
          {movieDetails.length > 0 ? (
            movieDetails.map(movie => (
              <swiper-slide key={movie.id} style={{ height: '100%' }}>
                <div id="movie-container" className="container relative bg-black h-full flex flex-col gap-3 justify-end pb-10">
                  <Link to={`/watch/movie/movie-id=${movie.id}`} className='absolute top-0 bottom-0 left-1/2 -translate-x-1/2 brightness-75'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                      alt="Movie Poster"
                    />
                  </Link>
                  
                  <h1 id="title" className='font-bold text-3xl z-10'>{movie.original_title}</h1>

                  <div className="flex gap-3 items-center z-10">
                    <div id="genres" className="flex items-center gap-1 text-sm font-medium">
                      {movie.genres.slice(0,3).map(genre => 
                        <span key={genre.id} className='bg-red-700 px-4 rounded-lg py-1'>{genre.name}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <p className='flex items-center gap-1'>
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        {dayjs(movie.release_date).format('YYYY')}
                      </p>
                      <p className='flex items-center gap-1'>
                        <FontAwesomeIcon icon={faClock}/>
                        {formatDuration(movie.runtime)}
                      </p>
                      <p className='flex items-center gap-1'>
                        <FontAwesomeIcon icon={faStar} className='text-yellow-300'/>
                        {formatRatings(movie.vote_average)}
                      </p>
                    </div>
                  </div>

                  <p className='text-sm md:w-1/2 font-meidum tracking-wider leading-snug z-10'>{movie.overview}</p>
                  
                </div>
              </swiper-slide>
            ))
          ) : (
            <p className='h-full w-full flex items-center justify-center font-semibold text-4xl'>Loading</p>
          )}
        </swiper-container>
      </div>
    </section>
  );
};

export default Hero;
