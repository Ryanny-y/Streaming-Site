import SectionTitle from "../../common/SectionTitle";
import MovieCardNoBg from "../../ui/MovieCardNoBg";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useEffect, useState } from "react";

const PopularMovie = () => {
  
  const [ movies, setMovies ] = useState([])
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/popular"
  );

  useEffect(() => {
    if(showData?.results?.length && !error && !isLoading) {
      setMovies(showData.results.slice(0, 8))
    }
  }, [ showData?.results?.length, error, isLoading ])

  return (
    <section id="popular">
      <div className="flex flex-col gap-10">
        <SectionTitle title="Popular Movies" section="popular_movies" />

        <SliderLayout section="popular_movies" slidesPerViewArr={[1, 3, 4]}>
          {movies && 
            movies.map(movie => 
              <swiper-slide key={movie.id}>
                <MovieCardNoBg movieId={movie.id}/>
              </swiper-slide>
            )
          }
        </SliderLayout>
      </div>
    </section>
  );
};

export default PopularMovie;
