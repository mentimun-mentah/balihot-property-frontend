const IMAGE_PROPERTY = "/static/images/properties/";

export const GMapsOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: true,
  disableDefaultUi: false,
  zoomControlOptions: { position: 1 },
  streetViewControlOptions: { position: 5 },
};

export const markerOptions = {
  url: "/static/images/marker.png",
  scaledSize: { width: 50, height: 50, f: "px", b: "px" },
};

export const infoOptions = {
  pixelOffset: { width: 0, height: -35 },
};

export const markerClicked = {
  url: "/static/images/marker-clicked.png",
  scaledSize: { width: 50, height: 50, f: "px", b: "px" },
};

export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const markers = [
  {
    position: { lat: -8.340539, lng: 115.091948 },
    price: "$200",
    name: "bali property for sale – chill house hipster retreat",
    image: `${IMAGE_PROPERTY}1.jpg`,
    location: "canggu, pererenan",
    clicked: false,
  },
];
