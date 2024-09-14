import NowPlaying from "./landing/NowPlaying"
import Hero from "./landing/Hero"
import Trending from "./landing/Trending"
import PopularMovie from "./landing/PopularMovie"
import POpularSeries from './landing/PopularSeries'
import DiscoverMovie from "./landing/DiscoverMovie"

const Landing = () => {
  return (
    <main className="container flex flex-col gap-16 text-white font-Poppins">
      <Hero />
      <NowPlaying />
      <Trending />
      <PopularMovie />
      <POpularSeries />
      <DiscoverMovie />
    </main>
  )
}

export default Landing