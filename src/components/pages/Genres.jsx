import { useState, useEffect } from "react"
import HeaderTitle from '../common/HeaderTitle'
import useGetGenres from '../../utils/hooks/useGetGenres'
import { Link } from "react-router-dom"

const Genres = () => {

  const [ movieGenres, setMovieGenres ] = useState([]);
  const [ seriesGenres, setSeriesGenres ] = useState([]);

  const { genreData: mGenre, error: mError, isLoading: mLoading } = useGetGenres('movie');
  const { genreData: sGenre, error: sError, isLoading: sLoading } = useGetGenres('tv');

  useEffect(() => {
    if(mGenre?.length && !mError && !mLoading) {
      setMovieGenres(mGenre)
    }
  }, [mGenre?.length, mError, mLoading ]);

  useEffect(() => {
    if(sGenre?.length && !sError && !sLoading) {
      setSeriesGenres(sGenre)
    }
  }, [sGenre?.length, sError, sLoading ]);

  return (
    <main id="genres" className="text-white">
      <div className="container flex flex-col gap-10">
        <div>
          <HeaderTitle title="Movie Genres"/>
          <div className="genre-grid mt-3 gap-2">
            {movieGenres.length > 0 && (
              movieGenres.map(genre => 
                <Link to={`/shows/movie-genre=${genre.id}/page=1`} className="bg-charcoal text-center py-3 rounded-md hover:bg-red-800 duration-300" key={genre.id}>{genre.name}</Link>
              )
            )}
          </div>
        </div>

        <div>
          <HeaderTitle title="TV Series Genres"/>
          <div className="genre-grid mt-3 gap-2">
            {seriesGenres.length > 0 && (
              seriesGenres.map(genre => 
                <Link to={`/shows/tv-genre=${genre.id}/page=1`} className="bg-charcoal text-center py-3 rounded-md hover:bg-red-800 duration-300" key={genre.id}>{genre.name}</Link>
              )
            )}
          </div>
        </div>
        
      </div>
    </main>
  )
}

export default Genres