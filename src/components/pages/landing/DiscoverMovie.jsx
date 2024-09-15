import SectionTitle from "../../common/SectionTitle";
import MovieCardNoBg from "../../ui/MovieCardNoBg";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useEffect, useState, useRef } from "react";

const DiscoverMovie = () => {

  const randomRef = useRef(Math.floor(Math.random() * 500) + 1);
  const randomNum = randomRef.current;

  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    `https://api.themoviedb.org/3/discover/movie?page=${randomNum}`
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.Swiper) {
        window.Swiper.update();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 && (
        <section id="discover_movies">
          <div className="flex flex-col gap-10">
            <SectionTitle title="Discover Movies" section="discover_movies" />

            <div className="slider-wrapper h-full">
              <swiper-container
                navigation-next-el=".discover_movies.next-btn"
                navigation-prev-el=".discover_movies.prev-btn"
                grid-fill="rows"
                grid-rows="2"
                breakpoints={JSON.stringify({
                  440: {
                    gridFill: "rows",
                    gridRows: "2",
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  568: {
                    gridFill: "rows",
                    gridRows: "2",
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },

                  1024: {
                    gridFill: "rows",
                    gridRows: "2",                    
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                })}
              >
                {movies.map(movie => 
                  <swiper-slide key={movie.id}>
                    <MovieCardNoBg movieId={movie.id}/>
                  </swiper-slide>
                )}
              </swiper-container>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DiscoverMovie;
