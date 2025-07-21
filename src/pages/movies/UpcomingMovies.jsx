import { useEffect, useState } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import MovieCard from "../../ui/MovieCard";
import useGetShows from "../../../utils/hooks/useGetShows";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/upcoming"
  );

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 ? (
        <section id="upcoming_movies" className="flex flex-col gap-5">
          <SectionTitle title="Upcoming" section="upcoming_movies" />

          <SliderLayout section="upcoming_movies" slidesPerViewArr={[2, 3, 5]}>
            {movies.map((movie) => (
              <swiper-slide key={movie.id} style={{ height: "auto" }}>
                <MovieCard movieId={movie.id} />
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

export default UpcomingMovies;
