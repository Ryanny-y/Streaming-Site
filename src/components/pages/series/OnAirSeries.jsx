import { useState, useEffect } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import SeriesCard from '../../ui/SeriesCard'

const OnAirSeries = () => {
  const [series, setSeries] = useState([]);

  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/tv/on_the_air"
  );

  useEffect(() => {
    if (showData?.results?.length && !error && !isLoading) {
      setSeries(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {series.length > 0 ? (
        <section id="on_the_air" className="flex flex-col gap-5">
          <SectionTitle title="On The Air" section="on_the_air" />

          <SliderLayout section="on_the_air" slidesPerViewArr={[2, 3, 5]}>
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

export default OnAirSeries;
