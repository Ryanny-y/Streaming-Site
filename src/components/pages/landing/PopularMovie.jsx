import SectionTitle from '../../ui/SectionTitle'
import MovieCard from '../../ui/MovieCard'

const PopularMovie = () => {
  return (
    <section id="popular">
      <div className="container flex flex-col gap-10">
        <SectionTitle title="Popular Movies" section="popular_movies"/>

        <div className="swiper-wrapper">
          <swiper-container
            navigation-next-el=".popular_movies.next-btn"
            navigation-prev-el=".popular_movies.prev-btn"
            breakpoints= {
              JSON.stringify({
                  640:{
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
  
                  768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                  },
  
                  1024: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                  }
              })
            }
            >
            <swiper-slide><MovieCard /></swiper-slide>
            <swiper-slide><MovieCard /></swiper-slide>
            <swiper-slide><MovieCard /></swiper-slide>
            <swiper-slide><MovieCard /></swiper-slide>
            <swiper-slide><MovieCard /></swiper-slide>
          </swiper-container>
        </div>
      </div>
    </section>
  )
}

export default PopularMovie