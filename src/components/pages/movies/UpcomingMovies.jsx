import SectionTitle from '../../common/SectionTitle'
import SliderLayout from '../../layout/SliderLayout'
import MovieCard from '../../ui/MovieCard'

const UpcomingMovies = () => {
  return (
    <section id="upcoming_movies" className="flex flex-col gap-5">
      <SectionTitle title="Now Playing Movies" section="upcoming_movies"/>

      <SliderLayout section="upcoming_movies" slidesPerViewArr={[1, 3, 5]}>
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

export default UpcomingMovies