import SectionTitle from "../../common/SectionTitle";
import NowMovieCard from "../../ui/NowMovieCard";
import SliderLayout from "../../layout/SliderLayout";

const NowPlaying = () => {
  return (
    <section id="now_playing">
      <div className="flex flex-col gap-10">
        <SectionTitle title="Now Playing Movies" section="now_playing" />

        <SliderLayout section="now_playing" slidesPerViewArr={[1, 3, 4]}>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
          <swiper-slide lazy="true">
            <NowMovieCard />
          </swiper-slide>
        </SliderLayout>
      </div>
    </section>
  );
};

export default NowPlaying;
