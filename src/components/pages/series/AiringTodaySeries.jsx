import { useState, useEffect } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import SeriesCard from '../../ui/SeriesCard'

const PopularSeries = () => {
  const [series, setSeries] = useState([]);

  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/tv/airing_today"
  );

  useEffect(() => {
    if (showData?.results?.length && !error && !isLoading) {
      setSeries(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {series.length > 0 ? (
        <section id="airing_today" className="flex flex-col gap-5">
          <SectionTitle title="Airing Today" section="airing_today" />

          <SliderLayout section="airing_today" slidesPerViewArr={[2, 3, 5]}>
            {series.map(show => 
              <swiper-slide key={show.id} style={{ height: 'auto'}}>
                <SeriesCard seriesId={show.id}/>
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

export default PopularSeries;
