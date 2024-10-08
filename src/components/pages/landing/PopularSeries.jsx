import SectionTitle from "../../common/SectionTitle";
import SeriesCardNoBg from "../../ui/SeriesCardNoBg";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import { useEffect, useState } from "react";

const PopularMovie = () => {
  const [series, setSeries] = useState([]);

  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/tv/popular"
  );

  useEffect(() => {
    if (showData?.results?.length && !error && !isLoading) {
      setSeries(showData.results.slice(0, 9));
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <section id="popular">
      <div className="container flex flex-col gap-10">
        <SectionTitle title="Popular Series" section="popular_series" />

        <SliderLayout section="popular_series" slidesPerViewArr={[2, 3, 4]}>
          {series.length &&
            series.map((show) => (
              <swiper-slide key={show.id}>
                <SeriesCardNoBg seriesId={show.id}/>
              </swiper-slide>
            ))}
        </SliderLayout>
      </div>
    </section>
  );
};

export default PopularMovie;
