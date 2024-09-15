import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import MovieCard from "../../ui/MovieCard";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useState, useEffect } from "react";

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/now_playing"
  );

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 ? (
        <section id="now_playing" className="flex flex-col gap-5">
          <SectionTitle title="Now Playing Movies" section="now_playing" />

          <SliderLayout section="now_playing" slidesPerViewArr={[1, 3, 5]}>
            {movies.map((movie) => (
              <swiper-slide key={movie.id} style={{ height: 'auto'}}>
                <MovieCard movieId={movie.id}/>
              </swiper-slide>
            ))}
          </SliderLayout>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default NowPlayingMovies;
