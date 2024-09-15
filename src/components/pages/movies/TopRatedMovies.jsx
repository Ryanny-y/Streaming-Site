import { useEffect, useState } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import MovieCard from "../../ui/MovieCard";
import useGetShows from "../../../utils/hooks/useGetShows";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/top_rated"
  );

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 ? (
        <section id="top_rated_movies" className="flex flex-col gap-5">
          <SectionTitle title="Top Rated Movies" section="top_rated_movies" />

          <SliderLayout section="top_rated_movies" slidesPerViewArr={[1, 3, 5]}>
            {movies.map((movie) => (
              <swiper-slide kay={movie.id} style={{ height: 'auto'}}>
                <MovieCard movieId={movie.id} />
              </swiper-slide>
            ))}
          </SliderLayout>
        </section>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default TopRatedMovies;
