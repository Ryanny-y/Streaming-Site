import SectionTitle from '../../ui/SectionTitle'
import SeriesCard from '../../ui/SeriesCard'

const PopularMovie = () => {
  return (
    <section id="popular">
      <div className="container flex flex-col gap-10">
        <SectionTitle title="Popular Series" section="popular_series"/>

        <div className="swiper-wrapper">
          <swiper-container
            navigation-next-el=".popular_series.next-btn"
            navigation-prev-el=".popular_series.prev-btn"
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
            <swiper-slide><SeriesCard /></swiper-slide>
            <swiper-slide><SeriesCard /></swiper-slide>
            <swiper-slide><SeriesCard /></swiper-slide>
            <swiper-slide><SeriesCard /></swiper-slide>
            <swiper-slide><SeriesCard /></swiper-slide>
          </swiper-container>
        </div>
      </div>
    </section>
  )
}

export default PopularMovie