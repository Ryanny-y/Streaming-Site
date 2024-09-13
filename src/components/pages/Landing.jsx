import NowPlaying from "./landing/NowPlaying"
import Hero from "./landing/Hero"
import Trending from "./landing/Trending"
import Popular from "./landing/Popular"

const Landing = () => {
  return (
    <main className="flex flex-col gap-16 text-white font-Poppins">
      <Hero />
      <NowPlaying />
      <Trending />
      <Popular />
    </main>
  )
}

export default Landing