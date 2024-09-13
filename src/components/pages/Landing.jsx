import NowPlaying from "./landing/NowPlaying"
import Hero from "./landing/Hero"

const Landing = () => {
  return (
    <main className="flex flex-col gap-16 text-white">
      <Hero />
      <NowPlaying />
    </main>
  )
}

export default Landing