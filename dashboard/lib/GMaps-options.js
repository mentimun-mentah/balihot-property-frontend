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
export const libraries = ["places", "geometry"];
export const myOptions = { componentRestrictions: { country: "id" } };
export const markerOptions = {
  url: "/static/images/marker.png",
  scaledSize: { width: 50, height: 50, f: "px", b: "px" }
};
