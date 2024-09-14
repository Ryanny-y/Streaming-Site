import SectionTitle from '../../common/SectionTitle'
import SliderLayout from '../../layout/SliderLayout'
import MovieCard from '../../ui/MovieCard'

const NowPlayingMovies = () => {
  return (
    <section id="now_playing" className="flex flex-col gap-5">
      <SectionTitle title="Now Playing Movies" section="now_playing"/>

      <SliderLayout section="now_playing" slidesPerViewArr={[1, 3, 5]}>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
        <swiper-slide><MovieCard /></swiper-slide>
      </SliderLayout>
    </section>
  )
}

export default NowPlayingMovies