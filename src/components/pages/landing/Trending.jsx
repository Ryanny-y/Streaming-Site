import SectionTitle from "../../common/SectionTitle";
import TrendingMovieCard from "../../ui/TrendingMovieCard";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useEffect, useState } from "react";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const { movieData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/trending/movie/day"
  );

  useEffect(() => {
    if (movieData?.results?.length > 0 && !error && !isLoading) {
      setMovies(movieData.results.slice(0, 9));
    }
  }, [error, isLoading]);

  return (
    <>
      {movies.length > 0 && (
        <section id="trending">
          <div className="flex flex-col gap-10">
            <SectionTitle title="Trending" section="trending" />

            <SliderLayout section="trending" slidesPerViewArr={[1, 2, 3]}>
              {movies.map((movie) => (
                <swiper-slide key={movie.id}>
                  <TrendingMovieCard movieId={movie.id} />
                </swiper-slide>
              ))}
            </SliderLayout>
          </div>
        </section>
      )}
    </>
  );
};

export default Trending;
