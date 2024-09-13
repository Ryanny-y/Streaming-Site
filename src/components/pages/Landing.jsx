import NowPlaying from "./landing/NowPlaying"
import Hero from "./landing/Hero"
import Trending from "./landing/Trending"

const Landing = () => {
  return (
    <main className="flex flex-col gap-16 text-white font-Poppins">
      <Hero />
      <NowPlaying />
      <Trending />
    </main>
  )
}

export default Landing