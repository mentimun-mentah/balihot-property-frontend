import { useState, useRef, useCallback, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Card, Modal, Badge } from "react-bootstrap";
import { GMapsOptions } from "../Properties/GMaps-options";
import { markerOptions, markers, infoOptions } from "../Properties/GMaps-options";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { updateObject } from "../../lib/utility.js";
import { photos } from "./photos";
import { responsiveDetailProperty } from "../shared.js";

import RenderSmoothImage from "render-smooth-image-react";
import ReactBnbGallery from "react-bnb-gallery";
import Carousel from "react-multi-carousel";
import ReactTooltip from "react-tooltip";
import DetailPropertyStyle from "./style.js";

import CardProperty from "../Card/CardPropertyOld.js";
import CardMarker from "../Card/CardMarkerOld.js";

const libraries = ["places", "geometry"];
const default_center = { lat: -8.780582, lng: 115.179351 };
const mapContainerStyle = { height: "500px", width: "100%" };
const IMAGE = "/static/images/prop-detail/";
const PROFILE = "/static/images/teams/";
const IMAGE_PROPERTY = "/static/images/properties/";

/*carousel*/
const nextCarousel = () => document.getElementById("nextCarouselClick").click();
const prevCarousel = () => document.getElementById("prevCarouselClick").click();
const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide }
  } = rest;
  return (
    <div className="carousel-button-group d-none">
      <Button
        id="prevCarouselClick"
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      >
        Prev
      </Button>
      <Button id="nextCarouselClick" onClick={() => next()}>
        Next
      </Button>
    </div>
  );
};
/*carousel*/

let marker = {
  position: { lat: -8.780582, lng: 115.179351 },
  price: "$200",
  name: "bali property for sale – chill house hipster retreat",
  image: `${IMAGE_PROPERTY}1.jpg`,
  location: "canggu, pererenan",
  clicked: false
};

const cur_dis_list = {
  atm: { lat: null, lng: null },
  restaurant: { lat: null, lng: null },
  cafe: { lat: null, lng: null },
  pharmacy: { lat: null, lng: null },
  convenience_store: { lat: null, lng: null }
};

const distance_from_list = {
  atm: null,
  restaurant: null,
  cafe: null,
  pharmacy: null,
  convenience_store: null
};

const rad = x => {
  return (x * Math.PI) / 180;
};

const getDistance = (p1, p2) => {
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

const DetailProperty = () => {
  const mapRef = useRef(null);
  const [center, setCenter] = useState(marker.position);
  const [zoom, setZoom] = useState(16);
  const [current_distance, setCurrent_distance] = useState(cur_dis_list);
  const [distance_from, setDistance_from] = useState(distance_from_list);

  const [loaded, setLoaded] = useState(false);
  const [showNum, setShowNum] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [marker_click, setMarker_click] = useState(false);

  const showNumHandler = () => setShowNum(!showNum);
  const modalShowHandler = () => setModalShow(!modalShow);
  const showVideoHandler = () => setShowVideo(!showVideo);
  const showAllPhotoHandler = () => setShowAllPhoto(!showAllPhoto);
  const markerClickHandler = () => setMarker_click(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
    setLoaded(true);
  }, []);

  if (mapRef.current && !distance_from) {
    setLoaded(false);
  }

  if (!distance_from) {
    setLoaded(false);
  }

  useEffect(() => {
    setLoaded(false);

    return () => {
      setLoaded(false);
    };
  }, []);

  // useEffect(() => {
  //   // getDistanceTo();
  //   // console.log("getDistance()");
  // }, [zoom]);

  if (
    distance_from.atm &&
    distance_from.restaurant &&
    distance_from.cafe &&
    distance_from.pharmacy &&
    distance_from.convenience_store
  ) {
    if (loaded) {
      if (zoom !== 17) setZoom(17);
      if (zoom === 17) {
        setLoaded(false);
      }
    }
  }

  if (!loaded && zoom === 17) setZoom(18);

  const callbackAtm = (results, status) => {
    if (!mapRef.current) return false;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let last = results[0];
      current_distance.atm.lat = last.geometry.location.lat();
      current_distance.atm.lng = last.geometry.location.lng();
    }
  };
  const callbackRestaurant = (results, status) => {
    if (!mapRef.current) return false;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let last = results[0];
      current_distance.restaurant.lat = last.geometry.location.lat();
      current_distance.restaurant.lng = last.geometry.location.lng();
    }
  };
  const callbackCafe = (results, status) => {
    if (!mapRef.current) return false;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let last = results[0];
      current_distance.cafe.lat = last.geometry.location.lat();
      current_distance.cafe.lng = last.geometry.location.lng();
    }
  };
  const callbackPharmacy = (results, status) => {
    if (!mapRef.current) return false;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let last = results[0];
      current_distance.pharmacy.lat = last.geometry.location.lat();
      current_distance.pharmacy.lng = last.geometry.location.lng();
    }
  };
  const callbackConvenienveStore = (results, status) => {
    if (!mapRef.current) return false;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let last = results[0];
      current_distance.convenience_store.lat = last.geometry.location.lat();
      current_distance.convenience_store.lng = last.geometry.location.lng();
    }
  };

  // const getDistanceTo = () => {
  //   if (!mapRef.current) return false;
  //   let marker_position = new google.maps.LatLng(center.lat, center.lng);
  //   let map = new google.maps.places.PlacesService(mapRef.current);
  //   // search nearby atm from current cursor
  //   map.nearbySearch(
  //     {
  //       location: marker_position, //Add initial lat/lng here
  //       rankBy: google.maps.places.RankBy.DISTANCE,
  //       type: ["atm"]
  //     },
  //     callbackAtm
  //   );
  //   map.nearbySearch(
  //     {
  //       location: marker_position, //Add initial lat/lng here
  //       rankBy: google.maps.places.RankBy.DISTANCE,
  //       type: ["restaurant"]
  //     },
  //     callbackRestaurant
  //   );
  //   map.nearbySearch(
  //     {
  //       location: marker_position, //Add initial lat/lng here
  //       rankBy: google.maps.places.RankBy.DISTANCE,
  //       type: ["cafe"]
  //     },
  //     callbackCafe
  //   );
  //   map.nearbySearch(
  //     {
  //       location: marker_position, //Add initial lat/lng here
  //       rankBy: google.maps.places.RankBy.DISTANCE,
  //       type: ["pharmacy"]
  //     },
  //     callbackPharmacy
  //   );
  //   map.nearbySearch(
  //     {
  //       location: marker_position, //Add initial lat/lng here
  //       rankBy: google.maps.places.RankBy.DISTANCE,
  //       type: ["convenience_store"]
  //     },
  //     callbackConvenienveStore
  //   );

  //   let atm = new google.maps.LatLng(
  //     current_distance.atm.lat,
  //     current_distance.atm.lng
  //   );
  //   let restaurant = new google.maps.LatLng(
  //     current_distance.restaurant.lat,
  //     current_distance.restaurant.lng
  //   );
  //   let cafe = new google.maps.LatLng(
  //     current_distance.cafe.lat,
  //     current_distance.cafe.lng
  //   );
  //   let pharmacy = new google.maps.LatLng(
  //     current_distance.pharmacy.lat,
  //     current_distance.pharmacy.lng
  //   );
  //   let convenience_store = new google.maps.LatLng(
  //     current_distance.convenience_store.lat,
  //     current_distance.convenience_store.lng
  //   );

  //   const dAtm = (getDistance(marker_position, atm) / 1000).toFixed(2);
  //   const dRestaurant = (
  //     getDistance(marker_position, restaurant) / 1000
  //   ).toFixed(2);
  //   const dCafe = (getDistance(marker_position, cafe) / 1000).toFixed(2);
  //   const dPharmacy = (getDistance(marker_position, pharmacy) / 1000).toFixed(
  //     2
  //   );
  //   const dConvenience = (
  //     getDistance(marker_position, convenience_store) / 1000
  //   ).toFixed(2);

  //   const distance = updateObject(distance_from, {
  //     atm: dAtm,
  //     restaurant: dRestaurant,
  //     cafe: dCafe,
  //     pharmacy: dPharmacy,
  //     convenience_store: dConvenience
  //   });
  //   setDistance_from(distance);
  // };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Container className="mt-4k2rem pt-5">
        <h1 className="fs-24">HIDEOUT BALI - Eco Bamboo Home </h1>
        <a href="#" className="text-decoration-none text-secondary">
          <i className="fal fa-map-marker-alt mr-1" />
          <span>
            <u>Selat, Bali, Indonesia</u>
          </span>
        </a>
        <div className="float-right">
          <Button variant="light" className="mr-3 btn-share-like">
            <i className="far fa-share-square mr-1" />
            <u>Share</u>
          </Button>
          <Button variant="light" className="btn-share-like">
            <i className="fal fa-heart mr-1" />
            <u>Save</u>
          </Button>
        </div>
      </Container>

      <section>
        <Container>
          <Row className="row-ml-9px">
            <Col md={6} className="pr-2 pl-1">
              <div className="img-fluid image-left-radius">
                <RenderSmoothImage src={`${IMAGE}prop1.jpg`} />
              </div>
            </Col>
            <div className="row col-6 align-content-between pr-3">
              <Row className="pb-2">
                <Col className="pr-2">
                  <RenderSmoothImage
                    src={`${IMAGE}prop2.jpg`}
                    className="img-fluid"
                  />
                </Col>
                <Col className="px-0 image-tp-rt">
                  <RenderSmoothImage
                    src={`${IMAGE}prop3.jpg`}
                    className="img-fluid"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="pr-2">
                  <RenderSmoothImage
                    src={`${IMAGE}prop4.jpg`}
                    className="img-fluid"
                  />
                </Col>
                <Col className="px-0 image-tp-btm">
                  <RenderSmoothImage
                    src={`${IMAGE}prop5.jpg`}
                    className="img-fluid"
                  />
                  <div className="show-btn">
                    <Button className="mr-2 video-btn" onClick={showVideoHandler}>
                      <i className="far fa-video mr-1" />
                      Video
                    </Button>
                    <Button
                      className="image-btn"
                      onClick={showAllPhotoHandler}
                    >
                      <i className="far fa-image mr-1" />
                      Photos
                    </Button>
                  </div>
                </Col>
              </Row>
              {/*
              <button
                type="button"
                className="btn show-image float-right"
                onClick={showAllPhotoHandler}
              >
                Show all
              </button>
              */}
            </div>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row className="property">
            <Col md={8}>
              <div className="property-content">
                <Card className="hov_none shadow-none m-t-25 property-description-container">
                  <div className="card-body property-overview">
                    <h3 className="card-title mt-3 fs-22 mb-4">
                      Property Overview{" "}
                      <Badge
                        pill
                        variant="secondary"
                        className="font-weight-normal for-sale-badge align-middle fs-13"
                      >
                        SALE
                      </Badge>
                    </h3>
                    <Row>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Sale price:
                          <span className="font-weight-normal ml-1">$1500</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Land size:
                          <span className="font-weight-normal ml-1">
                            1300 are
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Building size:
                          <span className="font-weight-normal ml-1">
                            240 m²
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Bedrooms:
                          <span className="font-weight-normal ml-1">3</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Bathrooms:
                          <span className="font-weight-normal ml-1">5</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Status:
                          <span className="font-weight-normal ml-1">
                            Lease Hold
                          </span>
                        </h4>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-description mb-2">
                    <h3 className="card-title property-content-title mb-4">
                      Property Description
                    </h3>
                    <p className="card-text text-justify mt-4">
                      This beautiful tropical real estate is located in a chic
                      area of Berawa Canggu. This stunning villa features 4
                      spacious with stylish and cozy en-suite bedrooms with
                      artistic bathrooms. It is furnished same as the pictures
                      and decorated in a great taste with big space in the
                      bedrooms and provides great and comfort. This property
                      generously offers AC units , spacious living area ,
                      spacious dining area , kitchen , swimming pool , storage ,
                      water source , electricity , and parking area. This is a
                      great option available for rent in the heart of Bali.
                      Ideal to rent as a home or for bussiness. Located just 10
                      minutes away from the beach and hardly 20 minutes from the
                      Airport.
                    </p>
                  </div>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-amenities">
                    <h3 className="card-title mb-4">Property Facilities</h3>
                    <Row>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-hat-chef mr-2" />
                        <label>
                          <small>Kitchen</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-air-conditioner mr-2" />
                        <label>
                          <small>Air conditioning</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-wifi mr-2" />
                        <label>
                          <small>Wifi</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-tv mr-2" />
                        <label>
                          <small>TV</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-couch mr-2" />
                        <label>
                          <small>Couch</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="far fa-heat mr-2" />
                        <label>
                          <small>Heating</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-oven mr-2" />
                        <label>
                          <small>Stove</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2 prop-label">
                        <i className="fal fa-refrigerator mr-2" />
                        <label>
                          <small>
                            <s>Refrigerator</s>
                          </small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-swimming-pool mr-2" />
                        <label>
                          <small>Pool</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <i className="fal fa-parking-circle mr-2" />
                        <label>
                          <small>Free street parking</small>
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <Card.Footer className="bg-transparent border-0 mb-2 pt-0 pl-30px">
                    <Button
                      className="show-amenities"
                      onClick={modalShowHandler}
                    >
                      Show all facilities
                    </Button>
                  </Card.Footer>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-distance">
                    <h3 className="card-title mb-4">
                      Distance to:
                      <span className="float-right hov_pointer text-muted">
                        <i
                          className="fal fa-question-circle"
                          data-multiline="true"
                          data-tip="Try to move the map if distance is invalid."
                        ></i>
                      </span>
                    </h3>
                    <Row>
                      <Col lg={4} md={6} className="mb-2">
                        <h4 className="fs-14">
                          <i className="fal fa-credit-card mr-2 fs-16" />
                          ATM:
                          <span className="font-weight-normal ml-1 text-secondary">
                            {distance_from.atm} Km
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-2">
                        <h4 className="fs-14">
                          <i className="fal fa-utensils mr-2 fs-16" />
                          Retaurant:
                          <span className="font-weight-normal ml-1 text-secondary">
                            {distance_from.restaurant} Km
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-2">
                        <h4 className="fs-14">
                          <i className="fal fa-mug-hot mr-2 fs-16" />
                          Cafe:
                          <span className="font-weight-normal ml-1 text-secondary">
                            {distance_from.cafe} Km
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-2">
                        <h4 className="fs-14">
                          <i className="fal fa-capsules mr-2 fs-16" />
                          Pharmacy:
                          <span className="font-weight-normal ml-1 text-secondary">
                            {distance_from.pharmacy} Km
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-2">
                        <h4 className="fs-14">
                          <i className="fal fa-store mr-2 fs-16" />
                          Corner Store:
                          <span className="font-weight-normal ml-1 text-secondary">
                            {distance_from.convenience_store} Km
                          </span>
                        </h4>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card className="hov_none shadow-none border-0 m-t-35">
                  <Card.Body className="pl-0 pr-0 pb-0 pt-0">
                    <Card.Title>Property Location</Card.Title>
                    <GoogleMap
                      id="mapProperty"
                      mapContainerStyle={mapContainerStyle}
                      options={GMapsOptions}
                      zoom={zoom}
                      center={center}
                      onLoad={onMapLoad}
                      // onIdle={getDistanceTo}
                      onDragEnd={() => setMarker_click(false)}
                    >
                      <Marker
                        icon={markerOptions}
                        position={center}
                        onClick={markerClickHandler}
                      ></Marker>
                      {marker_click && (
                        <InfoWindow options={infoOptions} position={center}>
                          <CardMarker
                            image={marker.image}
                            price={marker.price}
                            name={marker.name}
                          />
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={4} className="mt-4">
              <Card className="property-inquiry text-center rounded-inquiry">
                <Card.Body>
                  <div className="text-center mb-3">
                    <img src={`${PROFILE}Asthi Smith.jpg`} className="avatar" />
                  </div>
                  <Card.Title className="fs-18 mb-1 pb-1">
                    Asthi Smith
                  </Card.Title>
                  <Card.Subtitle className="fs-14 text-muted">
                    Owner
                  </Card.Subtitle>
                  <Button
                    className="mt-3 btn-call"
                    block
                    size="lg"
                    onClick={showNumHandler}
                  >
                    <i className="fal fa-phone-alt mr-2" />
                    {showNum ? <span>+62 812-3098-7865</span> : <>Call Agent</>}
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted bg-transparent">
                  <Button className="btn-red" block>
                    <i className="fal fa-envelope-open mr-2"></i>
                    Send Inquiry
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-1">
        <Container>
          <Row className="mb-4">
            <Col>
              <h3 className="fs-20">Other properties for similar listings</h3>
            </Col>
            <Col>
              <Button
                onClick={nextCarousel}
                className="float-right rounded-circle w-38  btn-carousel"
              >
                <i className="far fa-angle-right" />
              </Button>
              <Button
                onClick={prevCarousel}
                className="mr-2 float-right rounded-circle w-38 btn-carousel"
              >
                <i className="far fa-angle-left" />
              </Button>
            </Col>
          </Row>
          <Carousel
            responsive={responsiveDetailProperty}
            ssr={true}
            infinite
            centerMode
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
            arrows={false}
          >
            {[...Array(3)].map((x, i) => (
              <Col key={i} className="pl-1">
                <CardProperty cardType="sale" />
              </Col>
            ))}
          </Carousel>
        </Container>

        <Modal show={modalShow} onHide={modalShowHandler} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>All Facilities</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <Row>
              {[...Array(30)].map((x, i) => (
                <Col lg={4} md={6} xs={6} className="mb-1" key={i}>
                  <i className="fal fa-hat-chef mr-2" />
                  <label>
                    <small>Kitchen</small>
                  </label>
                </Col>
              ))}
            </Row>
          </Modal.Body>
        </Modal>

        <Modal show={showVideo} onHide={showVideoHandler} size="lg" centered>
          <Modal.Body style={{ maxHeight: "80vh", overflowY: "hidden" }}>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/sBSQrC5wvLo"
                allowfullscreen
              ></iframe>
            </div>
          </Modal.Body>
        </Modal>

        <ReactBnbGallery
          show={showAllPhoto}
          photos={photos}
          onClose={showAllPhotoHandler}
          wrap={false}
        />
      </section>
      <ReactTooltip effect="solid" uuid="mytt" />
      <style jsx>{DetailPropertyStyle}</style>
    </>
  );
};

export default DetailProperty;
