import SectionTitle from "../../ui/SectionTitle"
import NowMovieCard from "../../ui/NowMovieCard"

const NowPlaying = () => {
  return (
    <section id="now-playing">
      <div className="container flex flex-col gap-10">
        <SectionTitle title="Now Playing Movies" section="now-playing"/>    

        <div className="slider-wrapper">
          <swiper-container
            navigation-next-el=".now-playing.next-btn"
            navigation-prev-el=".now-playing.prev-btn"
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
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
            <swiper-slide lazy="true"><NowMovieCard/></swiper-slide>
          </swiper-container>

        </div>
      </div>
    </section>
  )
}

export default NowPlaying