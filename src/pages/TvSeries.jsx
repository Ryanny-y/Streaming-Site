import HeaderTitle from "../common/HeaderTitle"
import OnAirSeries from "./series/OnAirSeries"
import PopularSeries from "./series/PopularSeries"
import TopRatedSeries from "./series/TopRatedSeries"
import AiringTodaySeries from './series/AiringTodaySeries'

const TvSeries = () => {
  return (
    <main id="tv_series">
      <div className="container flex flex-col gap-10 text-white">
        <HeaderTitle title="TV Series"/>
          
        <AiringTodaySeries />
        <OnAirSeries />
        <PopularSeries />
        <TopRatedSeries />
      </div>
    </main>
  )
}

export default TvSeries