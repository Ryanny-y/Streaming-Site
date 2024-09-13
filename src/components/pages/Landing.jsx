import NowPlaying from "./landing/NowPlaying"
import Hero from "./landing/Hero"
import Trending from "./landing/Trending"
import PopularMovie from "./landing/PopularMovie"
import POpularSeries from './landing/PopularSeries'

const Landing = () => {
  return (
    <main className="flex flex-col gap-16 text-white font-Poppins">
      <Hero />
      <NowPlaying />
      <Trending />
      <PopularMovie />
      <POpularSeries />
    </main>
  )
}

export default Landing