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

export const GMapsOptionsMobile = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: true,
  disableDefaultUi: false,
  gestureHandling: "greedy",
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

export const libraries = ["places", "geometry"];
export const mapContainerStyle = { height: "calc(100vh - 4rem)", width: "100%" };
export const mapDetailContainerStyle = { height: "500px", width: "100%" };
export const mapMobileContainerStyle = { height: "100vh", width: "100vw" };
export const default_center = { lat: -8.340539, lng: 115.091949 };
