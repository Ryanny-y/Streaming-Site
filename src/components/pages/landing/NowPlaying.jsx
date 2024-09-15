import SectionTitle from "../../common/SectionTitle";
import NowMovieCard from "../../ui/NowMovieCard";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useEffect, useState } from "react";

const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/movie/now_playing"
  );

  useEffect(() => {
    if (showData?.results?.length > 0 && !error && !isLoading) {
      setMovies(showData.results.slice(0, 8));
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {movies.length > 0 ? (
        <section id="now_playing">
          <div className="flex flex-col gap-10">
            <SectionTitle title="Now Playing Movies" section="now_playing" />

            {movies.length && (
              <SliderLayout section="now_playing" slidesPerViewArr={[1, 2, 4]}>
                {movies.map((movie) => (
                  <swiper-slide key={movie.id} lazy="true">
                    <NowMovieCard movieDetails={movie} />
                  </swiper-slide>
                ))}
              </SliderLayout>
            )}
          </div>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default NowPlaying;
