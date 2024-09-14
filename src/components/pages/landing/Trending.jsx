import SectionTitle from '../../common/SectionTitle';
import TrendingMovieCard from '../../ui/TrendingMovieCard';

const Trending = () => {
  return (
    <section id="trending">
      <div className="flex flex-col gap-10">
        <SectionTitle title="Trending" section="trending"/>

        <div className="swiper-wrapper">
          <swiper-container
            navigation-next-el=".trending.next-btn"
            navigation-prev-el=".trending.prev-btn"
            breakpoints= {
              JSON.stringify({
                  640:{
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },

                  768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                  },

                  1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                  }
              })
            }
          >
            <swiper-slide><TrendingMovieCard /></swiper-slide>
            <swiper-slide><TrendingMovieCard /></swiper-slide>
            <swiper-slide><TrendingMovieCard /></swiper-slide>
            <swiper-slide><TrendingMovieCard /></swiper-slide>
          </swiper-container>
        </div>
      </div>
    </section>
  )
}

export default Trending