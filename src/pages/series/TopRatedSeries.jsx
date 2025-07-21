import { useState, useEffect } from "react";
import SectionTitle from "../../common/SectionTitle";
import SliderLayout from "../../layout/SliderLayout";
import useGetShows from "../../../utils/hooks/useGetShows";
import SeriesCard from '../../ui/SeriesCard'

const TopRatedSeries = () => {
  const [series, setSeries] = useState([]);

  const { showData, error, isLoading } = useGetShows(
    "https://api.themoviedb.org/3/tv/top_rated"
  );

  useEffect(() => {
    if (showData?.results?.length && !error && !isLoading) {
      setSeries(showData.results);
    }
  }, [showData?.results?.length, error, isLoading]);

  return (
    <>
      {series.length > 0 ? (
        <section id="top_rated_series" className="flex flex-col gap-5">
          <SectionTitle title="Top Rated" section="top_rated_series" />

          <SliderLayout section="top_rated_series" slidesPerViewArr={[2, 3, 5]}>
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

export default TopRatedSeries;
