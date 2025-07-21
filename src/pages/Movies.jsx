import HeaderTitle from "../common/HeaderTitle"
import NowPlayingMovies from "./movies/NowPlayingMovies"
import PopularMovies from "./movies/PopularMovies"
import TopRatedMovies from './movies/TopRatedMovies'
import UpcomingMovies from "./movies/UpcomingMovies"

const Movies = () => {
  return (
    <main id="movies">
      <div className="container flex flex-col gap-10 text-white">
        <HeaderTitle title="Movies"/>
          
        <NowPlayingMovies />
        <PopularMovies />
        <TopRatedMovies />
        <UpcomingMovies />
      </div>
    </main>
  )
}

export default Movies