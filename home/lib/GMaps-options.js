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
  disableAutoPan: true,
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

export const cur_dis_list = {
  atm: { lat: null, lng: null },
  restaurant: { lat: null, lng: null },
  cafe: { lat: null, lng: null },
  pharmacy: { lat: null, lng: null },
  convenience_store: { lat: null, lng: null }
};

export const distance_from_list = {
  atm: null,
  restaurant: null,
  cafe: null,
  pharmacy: null,
  convenience_store: null
};

const rad = x => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
  /* Haversine formula */
  let R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(p2.lat() - p1.lat());
  let dLong = rad(p2.lng() - p1.lng());
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) *
      Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d; // returns the distance in meter
};
