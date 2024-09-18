import { useEffect, useState } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import MovieCard from "../../ui/MovieCard";
import useGetShows from "../../../utils/hooks/useGetShows";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/popular"
  );

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 ? (
        <section id="popular_movies" className="flex flex-col gap-5">
          <SectionTitle title="Popular" section="popular_movies" />

          <SliderLayout section="popular_movies" slidesPerViewArr={[2, 3, 5]}>
            {movies.map(movie => 
              <swiper-slide key={movie.id} style={{ height: 'auto' }}>
                <MovieCard movieId={movie.id}/>
              </swiper-slide>
            )}
          </SliderLayout>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default PopularMovies;
