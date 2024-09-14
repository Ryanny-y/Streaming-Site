import SectionTitle from '../../common/SectionTitle'
import SliderLayout from '../../layout/SliderLayout'
import MovieCard from '../../ui/MovieCard'

const TopRatedMovies = () => {
  return (
    <section id="top_rated_movies" className="flex flex-col gap-5">
      <SectionTitle title="Top Rated Movies" section="top_rated_movies"/>

      <SliderLayout section="top_rated_movies" slidesPerViewArr={[1, 3, 5]}>
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

export default TopRatedMovies