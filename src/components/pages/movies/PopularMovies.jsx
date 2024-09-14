import SectionTitle from '../../common/SectionTitle'
import SliderLayout from '../../layout/SliderLayout'
import MovieCard from '../../ui/MovieCard'

const PopularMovies = () => {
  return (
    <section id="popular_movies" className="flex flex-col gap-5">
      <SectionTitle title="Popular Movies" section="popular_movies"/>

      <SliderLayout section="popular_movies" slidesPerViewArr={[1, 3, 5]}>
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

export default PopularMovies