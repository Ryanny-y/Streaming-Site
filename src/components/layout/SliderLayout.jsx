import PropTypes from 'prop-types'

const SliderLayout = ({ children, section = '', slidesPerViewArr = [1, 2, 3, 4]}) => {
  return (
    <div className="slider-wrapper">
      <swiper-container
        navigation-next-el={`.${section}.next-btn`}
        navigation-prev-el={`.${section}.prev-btn`}
        breakpoints={JSON.stringify({
          468: {
            slidesPerView: slidesPerViewArr[0],
            spaceBetween: 10,
          },          
          568: {
            slidesPerView: slidesPerViewArr[1],
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: slidesPerViewArr[2],
            spaceBetween: 20,
          },
        })}
      >
       { children }
      </swiper-container>
    </div>
  );
};

export default SliderLayout;

SliderLayout.propTypes = {
  section: PropTypes.string,
  slidesPerViewArr: PropTypes.array
}