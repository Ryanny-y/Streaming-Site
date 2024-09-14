import SectionTitle from '../../common/SectionTitle'
import MovieCardNoBg from '../../ui/MovieCardNoBg'


const DiscoverMovie = () => {
  return (
    <section id="discover_movies">
      <div className="flex flex-col gap-10">
        <SectionTitle title="Discover Movies" section="discover_movies"/>

        <div className="slider-wrapper h-full">
          <swiper-container
            navigation-next-el=".discover_movies.next-btn"
            navigation-prev-el=".discover_movies.prev-btn"
            grid-fill="rows"
            grid-rows="2"
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
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
            <swiper-slide lazy="true"><MovieCardNoBg/></swiper-slide>
          </swiper-container>

        </div>
      </div>
    </section>
  )
}

export default DiscoverMovie