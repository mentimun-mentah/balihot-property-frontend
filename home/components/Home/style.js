import css from "styled-jsx/css";

const HomeStyle = css`
`

export default HomeStyle 

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1023, min: 576},
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export const responsivePlace = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1023, min: 576},
    items: 1,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};

export const ButtonGroupPlace = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group d-none">
      <button className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
      <button onClick={() => next()} />
    </div>
  );
};
