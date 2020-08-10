import { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { GMapsOptions, markerOptions, infoOptions } from "../../lib/GMaps-options";
import { libraries, mapDetailContainerStyle } from "../../lib/GMaps-options";
import { cur_dis_list, distance_from_list, getDistance } from "../../lib/GMaps-options";
import { Select, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../../hoc/withAuth";
import { updateObject } from "../../lib/utility.js";

import cookie from "nookies";
import moment from "moment";
import Router from "next/router";
import axios from "../../lib/axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import BootsModal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as actions from "../../store/actions";
import ReactBnbGallery from "react-bnb-gallery";
import Container from "react-bootstrap/Container";
import SmoothImage from "render-smooth-image-react";
import ContainerCardMarker from "../../components/Card/ContainerCardMarker";
import ContainerCardPropertySimilar from "../../components/Card/ContainerCardPropertySimilar";
import ShowMoreText from "react-show-more-text";
import ShareModal from "../../components/Card/ShareModal";

import DetailPropertyStyle from "../../components/DetailProperty/style.js";

const { Option } = Select;

/*carousel similar listings*/
const nextCarousel = () => document.getElementById("nextCarouselClick").click();
const prevCarousel = () => document.getElementById("prevCarouselClick").click();
/*carousel similar listings*/

const showMoreText = () => document.getElementById("show-more-btn").click();
const favLoginBtn = () => document.getElementById("btn-login-navbar").click();

const formatter = new Intl.NumberFormat(["ban", "id"]);

const Property = () => {
  const dispatch = useDispatch();
  const propertyData = useSelector(state => state.property.slug);

  const { id, slug, name, type_id, property_for, land_size, youtube, description, hotdeal, price, love } = propertyData;
  const { status } = propertyData; // For Sale
  const { period } = propertyData; // For Rent
  const { facilities, bathroom, bedroom, building_size } = propertyData; // For villa
  const { location, latitude, longitude } = propertyData; // For Map
  const { seen, similar_listing, created_at } = propertyData; // For Map

  let villaPrice = [];
  let landPrice = [];
  let buttonPrice;
  let img_list = [];
  const images = propertyData.images.split(",");
  for (let key in images) {
    img_list.push({
      photo: `${process.env.API_URL}/static/properties/${slug}/${images[key]}`
    });
  }
  let pf = property_for.split(",");
  const propertyShareLink = `${process.env.BASE_URL}/property/${slug}`;

  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const [marker_click, setMarker_click] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [selected, setSelected] = useState(villaPrice[0]);
  const [isMoreText, setIsMoreText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fav, setFav] = useState(love);
  const [current_distance, setCurrent_distance] = useState(cur_dis_list);
  const [distance_from, setDistance_from] = useState(distance_from_list);

  const onMapClick = () => setMarker_click(false);
  const markerClickHandler = () => setMarker_click(true);
  const showVideoHandler = () => setShowVideo(!showVideo);
  const showAllPhotoHandler = () => setShowAllPhoto(!showAllPhoto);

  const onSelectTagPrice = data => {
    const objData = JSON.parse(data);
    setSelected({
      ...selected,
      name: objData.name,
      price: objData.price,
      period: objData.period ? objData.period : null
    });
  };

  const textShowHandler = val => {
    setIsMoreText(val);
  };

  const loveHandler = id => {
    if (!isAuth()) {
      favLoginBtn();
    }
    if (isAuth() && !fav) {
      dispatch(actions.loveProperty(id));
      setFav(!fav);
    }
    if (isAuth() && fav) {
      dispatch(actions.unLoveProperty(id));
      setFav(!fav);
    }
  };

  // MAP
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);
  // MAP

  if (type_id == 1) {
    let tmp = [];
    for (let key in price) {
      if (price[key]) {
        let name = key.split("_")[0];
        if (name == "leasehold") {
          tmp.push(price[key]);
        }
        if (name == "freehold") {
          villaPrice.push({
            name: "Free Hold",
            price: price[key]
          });
        }
        if (name != "freehold" && name != "leasehold") {
          villaPrice.push({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            price: price[key]
          });
        }
      }
    }
    if (tmp.length > 0) {
      villaPrice.push({
        name: "Lease Hold",
        price: typeof tmp[0] === "number" ? tmp[0] : tmp[1],
        period: typeof tmp[1] === "string" ? tmp[1] : tmp[0]
      });
    }
  }
  if (villaPrice.length > 1) {
    for (let key in villaPrice) {
      let tmp = [];
      if (villaPrice[key].name == "Free Hold" && key !== 0) {
        tmp.push(villaPrice[0]);
        villaPrice[0] = villaPrice[key];
        villaPrice[key] = tmp[0];
        tmp = [];
      }
      if (villaPrice[key].name == "Lease Hold" && key !== 1) {
        tmp.push(villaPrice[1]);
        villaPrice[1] = villaPrice[key];
        villaPrice[key] = tmp[0];
        tmp = [];
      }
    }
  }

  if (type_id == 2) {
    let tmp = [];
    for (let key in price) {
      if (price[key]) {
        let name = key.split("_")[0];
        if (name == "leasehold") {
          tmp.push(price[key]);
        }
        if (name == "freehold") {
          landPrice.push({
            name: "Free Hold",
            price: price[key]
          });
        }
      }
    }
    if (tmp.length > 0) {
      landPrice.push({
        name: "Lease Hold",
        price: typeof tmp[0] === "number" ? tmp[0] : tmp[1],
        period: typeof tmp[1] === "string" ? tmp[1] : tmp[0]
      });
    }
  }

  useEffect(() => {
    setSelected(villaPrice[0]);
  }, []);

  if (villaPrice.length > 0 && selected !== undefined) {
    buttonPrice = villaPrice.map((data, i) => {
      return (
        <Option value={JSON.stringify(data)} key={i}>
          {data.name}
        </Option>
      );
    });
  }

  let price_list, land_total_price;
  if (type_id === 2 && status === "Free Hold") {
    price_list = landPrice.map((data, i) => {
      land_total_price = data.price * land_size;
      return (
        <div key={i}>
          <h4 className="fs-14 text-left">
            Status:
            <span className="font-weight-normal ml-1 status-detail ">
              {data.name}
            </span>
          </h4>
          <h4 className="fs-14 text-left">
            Price:
            <span className="font-weight-normal ml-1">
              IDR {formatter.format(data.price)}
              <small className="fs-14 fs-12-s"> / are</small>
            </span>
          </h4>
          <h4 className="fs-14 text-left">
            Total Price:
            <span className="font-weight-normal ml-1">
              IDR {formatter.format(land_total_price)}
            </span>
          </h4>
        </div>
      );
    });
  }
  if (type_id === 2 && status === "Lease Hold") {
    price_list = landPrice.map((data, i) => {
      land_total_price = data.price * land_size;
      return (
        <div key={i}>
          <h4 className="fs-14 text-left">
            Status:
            <span className="font-weight-normal ml-1 status-detail ">
              {data.name}
            </span>
          </h4>
          <h4 className="fs-14 text-left">
            Price:
            <span className="font-weight-normal ml-1">
              IDR {formatter.format(data.price)}
              <small className="fs-14 fs-12-s"> / are / year</small>
            </span>
          </h4>
          <h4 className="fs-14 text-left">
            Total Price:
            <span className="font-weight-normal ml-1">
              IDR {formatter.format(land_total_price)}
            </span>
          </h4>
          <h4 className="fs-14 text-left">
            Can lease until:
            <span className="font-weight-normal ml-1">{data.period}</span>
          </h4>
        </div>
      );
    });
  }

  /** GET DISTANCE **/
  // Callback
  const callbackAtm = (results, status) => {
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
  // Callback
  //
  // Distance
  const getDistanceTo = () => {
    if (!mapRef.current) return false;
    let marker_position = new google.maps.LatLng(center.lat, center.lng);
    let map = new google.maps.places.PlacesService(mapRef.current);

    // search nearby atm from current cursor
    map.nearbySearch({
        location: marker_position, //Add initial lat/lng here
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ["atm"]
      }, callbackAtm
    );
    map.nearbySearch({
        location: marker_position, //Add initial lat/lng here
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ["restaurant"]
      }, callbackRestaurant 
    );
    map.nearbySearch({
        location: marker_position, //Add initial lat/lng here
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ["cafe"]
      }, callbackCafe
    );
    map.nearbySearch({
        location: marker_position, //Add initial lat/lng here
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ["pharmacy"]
      }, callbackPharmacy
    );
    map.nearbySearch({
        location: marker_position, //Add initial lat/lng here
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: ["convenience_store"]
      }, callbackConvenienveStore
    );

    let atm = new google.maps.LatLng(current_distance.atm.lat, current_distance.atm.lng);
    let restaurant = new google.maps.LatLng(current_distance.restaurant.lat, current_distance.restaurant.lng);
    let cafe = new google.maps.LatLng(current_distance.cafe.lat, current_distance.cafe.lng);
    let pharmacy = new google.maps.LatLng(current_distance.pharmacy.lat, current_distance.pharmacy.lng);
    let convenience_store = new google.maps.LatLng(
      current_distance.convenience_store.lat,
      current_distance.convenience_store.lng
    );

    const dAtm = (getDistance(marker_position, atm) / 1000).toFixed(2);
    const dRestaurant = (getDistance(marker_position, restaurant) / 1000).toFixed(2);
    const dCafe = (getDistance(marker_position, cafe) / 1000).toFixed(2);
    const dPharmacy = (getDistance(marker_position, pharmacy) / 1000).toFixed(2);
    const dConvenience = (getDistance(marker_position, convenience_store) / 1000).toFixed(2);

    const distance = updateObject(distance_from, {
      atm: dAtm,
      restaurant: dRestaurant,
      cafe: dCafe,
      pharmacy: dPharmacy,
      convenience_store: dConvenience
    });
    setDistance_from(distance);
  }
  /** GET DISTANCE **/
  useEffect(() => {
    setTimeout(() => {
      // getDistanceTo()
    }, 2000)
  },[])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Container className="mt-4k2rem pt-5">
        <h1 className="fs-24 fs-18-s text-truncate">{name}</h1>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location}`}
          target="_blank"
          className="text-decoration-none text-secondary d-inline-block text-truncate fs-14-s"
          style={{ maxWidth: "48vw" }}
        >
          <i className="fal fa-map-marker-alt mr-1" />
          <span>
            <u>{location}</u>
          </span>
        </a>
        <div className="float-right pr-3">
          <a
            className="text-decoration-none text-secondary"
            onClick={() => setShowModal(true)}
          >
            <span className="mr-3 btn-share-like">
              <i className="far fa-share-square mr-1" />
              <u>Share</u>
            </span>
          </a>
          <a
            className="text-decoration-none text-secondary"
            onClick={() => loveHandler(id)}
          >
            {fav ? (
              <span className="btn-share-like">
                <i className="fas fa-heart mr-1 text-bhp" />
                <u>Unsave</u>
              </span>
            ) : (
              <span className="btn-share-like">
                <i className="fal fa-heart mr-1" />
                <u>Save</u>
              </span>
            )}
          </a>
        </div>
      </Container>

      <section className="px-0 py-3">
        <Container className="block d-sm-block d-md-block d-lg-none d-xl-none px-0 mx-0 mw-100vw">
          <div className="img-fluid position-relative img-detail-mobile">
            <div onClick={showAllPhotoHandler} className="hov_pointer">
              <SmoothImage src={img_list[0].photo} objectFit="cover" />
            </div>
            <div
              className="img-status hov_pointer"
              onClick={showAllPhotoHandler}
            >
              <span className="img-status-num letter-space">
                1/{img_list.length}
              </span>
            </div>
            <div className="wrapper-btn-video">
              <Button className="btn-video" onClick={showVideoHandler}>
                <i className="far fa-video mr-1" />
                Video
              </Button>
            </div>
          </div>
        </Container>

        <Container className="d-none d-sm-none d-md-none d-lg-block">
          <Row className="row-ml-9px">
            <Col md={6} className="pr-2 pl-1">
              <div className="img-fluid image-left-radius">
                <SmoothImage src={img_list[0].photo} />
              </div>
            </Col>
            <div className="row col-6 align-content-between pr-3">
              <Row className="pb-2">
                <Col className="pr-2">
                  <SmoothImage src={img_list[1].photo} className="img-fluid" />
                </Col>
                <Col className="px-0 image-tp-rt">
                  <SmoothImage src={img_list[2].photo} className="img-fluid" />
                </Col>
              </Row>
              <Row>
                <Col className="pr-2 img-detail">
                  <SmoothImage src={img_list[3].photo} className="img-fluid" />
                </Col>
                <Col className="px-0 image-tp-btm img-detail">
                  <SmoothImage src={img_list[4].photo} className="img-fluid" />
                  <div className="show-btn d-sm-none d-md-block d-lg-block ">
                    <Button
                      className="mr-2 video-btn d-inline"
                      onClick={showVideoHandler}
                    >
                      <i className="far fa-video mr-1" />
                      Video
                    </Button>
                    <Button
                      className="image-btn d-inline"
                      onClick={showAllPhotoHandler}
                    >
                      <i className="far fa-image mr-1" />
                      Photos
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </section>

      <section className="pt-4">
        <Container>
          <Row className="property">
            <Col sm={12} md={12} lg={8}>
              <div className="divider"></div>

              <Card className="shadow-none m-t-25 m-border-0 m-t-0-s">
                <Card.Body className="p-l-0-s p-r-0-s property-overview">
                  <Card.Title className="fs-16-s">Property Overview</Card.Title>
                  <div className="divide-title"></div>
                  <Row>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        Land size:
                        <span className="font-weight-normal ml-1">
                          {land_size}{" "}
                          {type_id == 1 ? "are" : type_id == 2 ? "m²" : ""}
                        </span>
                      </h4>
                    </Col>
                    {type_id == 1 && (
                      <>
                        <Col lg={4} md={6} sm={6} className="mb-2">
                          <h4 className="fs-14">
                            Building size:
                            <span className="font-weight-normal ml-1">
                              {building_size} m²
                            </span>
                          </h4>
                        </Col>
                        <Col lg={4} md={6} sm={6} className="mb-2">
                          <h4 className="fs-14">
                            Bedrooms:
                            <span className="font-weight-normal ml-1">
                              {bedroom}
                            </span>
                          </h4>
                        </Col>
                        <Col lg={4} md={6} sm={6} className="mb-2">
                          <h4 className="fs-14">
                            Bathrooms:
                            <span className="font-weight-normal ml-1">
                              {bathroom}
                            </span>
                          </h4>
                        </Col>
                      </>
                    )}
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        Visited:
                        <span className="font-weight-normal ml-1 status-detail ">
                          {seen} visitor
                        </span>
                      </h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="divider"></div>

              <Card className="shadow-none m-t-35 m-border-0 m-t-0-s">
                <Card.Body className="p-l-0-s p-r-0-s mb-2 property-description">
                  <Card.Title className="fs-16-s property-content-title">
                    Property Description
                  </Card.Title>
                  <div className="divide-title"></div>
                  <ShowMoreText
                    /* Default options */
                    lines={3}
                    more={
                      <span id="show-more-btn" className="d-none">
                        Show more
                      </span>
                    }
                    less={
                      <span id="show-more-btn" className="d-none">
                        Show less
                      </span>
                    }
                    anchorClass=""
                    expanded={false}
                    onClick={textShowHandler}
                  >
                    <p className="card-text mt-4 fs-14-s txt-space-pre-line">
                      {description}
                    </p>
                  </ShowMoreText>
                  {isMoreText ? (
                    <div className="show-less">
                      <a onClick={showMoreText}>Show less</a>
                    </div>
                  ) : (
                    <div className="show-more">
                      <a onClick={showMoreText}>Show more</a>
                    </div>
                  )}
                </Card.Body>
              </Card>

              <div className="divider"></div>

              {type_id == 1 && (
                <Card className="shadow-none m-t-35 m-border-0 m-t-0-s">
                  <Card.Body className="p-l-0-s p-r-0-s mb-2 property-amenities">
                    <Card.Title className="fs-16-s property-content-title">
                      Property Facilities
                    </Card.Title>
                    <div className="divide-title"></div>
                    <Row>
                      {facilities &&
                        facilities.slice(0, 10).map(fa => (
                          <Col
                            lg={4}
                            md={6}
                            sm={6}
                            className="mb-2 fs-16"
                            key={fa.id}
                          >
                            <h4 className="fs-14">
                              <i className={`${fa.icon} mr-2 fs-16`} />
                              <span className="font-weight-normal ml-1">
                                {fa.name}
                              </span>
                            </h4>
                          </Col>
                        ))}
                    </Row>
                  </Card.Body>
                  {facilities && facilities.length > 10 && (
                    <Card.Footer className="bg-transparent border-0 mb-2 pt-0 pl-30px">
                      <Button className="show-amenities m-btn-block m-ft-14">
                        Show all facilities
                      </Button>
                    </Card.Footer>
                  )}
                </Card>
              )}

              <div className="divider"></div>

              <Card className="shadow-none m-t-35 m-border-0 m-t-0-s">
                <Card.Body className="p-l-0-s p-r-0-s mb-2 property-distance">
                  <Card.Title className="fs-16-s property-content-title">
                    Distance to:
                    <span className="float-right hov_pointer text-muted">
                      <i className="fal fa-question-circle"></i>
                    </span>
                  </Card.Title>
                  <div className="divide-title"></div>
                  <Row>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-credit-card mr-2 fs-16" /> ATM:
                        <span className="font-weight-normal ml-1 text-secondary">
                          {distance_from.atm} Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-utensils mr-2 fs-16" /> Retaurant:
                        <span className="font-weight-normal ml-1 text-secondary">
                          {distance_from.restaurant} Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-mug-hot mr-2 fs-16" /> Cafe:
                        <span className="font-weight-normal ml-1 text-secondary">
                          {distance_from.cafe} Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-capsules mr-2 fs-16" /> Pharmacy:
                        <span className="font-weight-normal ml-1 text-secondary">
                          {distance_from.pharmacy} Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-store mr-2 fs-16" /> Corner Store:
                        <span className="font-weight-normal ml-1 text-secondary">
                          {distance_from.convenience_store} Km
                        </span>
                      </h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <div className="divider"></div>

              <Card className="shadow-none m-t-35 border-0 m-t-0-s">
                <Card.Body className="p-l-0-s p-r-0-s pl-0 pr-0 pb-0">
                  <Card.Title className="fs-16-s property-content-title">
                    Property Location
                  </Card.Title>
                  <div className="divide-title"></div>

                  <GoogleMap
                    id="mapProperty"
                    mapContainerStyle={mapDetailContainerStyle}
                    options={GMapsOptions}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                    // onIdle={getDistanceTo}
                    center={center}
                    zoom={16}
                  >
                    <Marker
                      onClick={markerClickHandler}
                      icon={markerOptions}
                      position={center}
                    />
                    {marker_click && (
                      <InfoWindow
                        options={infoOptions}
                        position={{ lat: latitude, lng: longitude }}
                      >
                        <ContainerCardMarker dataProperty={propertyData} />
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </Card.Body>
              </Card>
            </Col>

            <Col
              lg={{ span: 4, order: "last" }}
              md={{ order: "first" }}
              sm={{ order: "first" }}
              xs={{ order: "first" }}
              className="mt-4 d-lg-block m-b-25-s m-b-25-m"
            >
              <Card className="property-inquiry text-center rounded-inquiry">
                <Card.Body className="position-relative overflow-hidden detail-property-info">
                  {hotdeal && (
                    <div className="ribbon-detail-property font-weight-normal fs-11-s">
                      HOT DEAL
                    </div>
                  )}

                  <Card.Title className="fs-18 mb-1 pb-1 text-uppercase">
                    {(type_id == 1 && "Villa") || (type_id == 2 && "Land")} Type
                    Property
                  </Card.Title>
                  <Card.Subtitle className="fs-14 mt-1 text-muted">
                    For {pf.length > 0 && pf[0] !== "" && <>{pf.join(" & ")}</>}{" "}
                  </Card.Subtitle>

                  <hr />

                  <h4 className="fs-14 text-left">
                    Posted date:
                    <span className="font-weight-normal ml-1">
                      {moment.utc(created_at).format("DD MMMM YYYY")}
                    </span>
                  </h4>
                  {price_list}
                  {type_id == 1 && (
                    <>
                      <h4 className="fs-14 text-left">
                        Price tag:
                        <span className="font-weight-normal">
                          <Select
                            size="small"
                            value={selected.name}
                            onChange={onSelectTagPrice}
                            suffixIcon={
                              <i className="fal fa-sm fa-chevron-down ml-1" />
                            }
                            bordered={false}
                          >
                            {buttonPrice}
                          </Select>
                        </span>
                      </h4>
                      <h4 className="fs-14 text-left">
                        Price:
                        <span className="font-weight-normal ml-1">
                          IDR {formatter.format(selected.price)}
                        </span>
                      </h4>
                      {selected.period && (
                        <h4 className="fs-14 text-left">
                          Can lease until:
                          <span className="font-weight-normal ml-1">
                            {selected.period}
                          </span>
                        </h4>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-1">
        <Container>
          <Row className="mb-4">
            <Col className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
              <h3 className="fs-16">Similar listings</h3>
            </Col>
            <Col className="d-none d-sm-none d-md-none d-lg-block d-xl-block">
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

          <ContainerCardPropertySimilar dataProperty={similar_listing} />
        </Container>
      </section>

      {/* SHOW ALL PHOTO */}
      <ReactBnbGallery
        show={showAllPhoto}
        photos={img_list}
        onClose={showAllPhotoHandler}
        wrap={false}
      />

      {/* SHOW VIDEO */}
      <BootsModal show={showVideo} onHide={showVideoHandler} size="lg" centered>
        <BootsModal.Body style={{ maxHeight: "80vh", overflowY: "hidden" }}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={youtube}
              allowFullScreen
            ></iframe>
          </div>
        </BootsModal.Body>
      </BootsModal>

      <Modal
        centered
        footer={null}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        title="Share"
        closeIcon={<i className="fas fa-times" />}
        bodyStyle={{ padding: "10px 0px" }}
        width="400px"
      >
        <ShareModal propertyShareLink={propertyShareLink} />
      </Modal>

      <style jsx>{DetailPropertyStyle}</style>
      <style jsx>{`
        :global(.img-detail > .smooth-image-wrapper) {
          height: auto;
        }
        :global(.img-detail-mobile > div > .smooth-image-wrapper) {
          width: 100vw;
        }
        :global(.img-detail-mobile
            > div
            > .smooth-image-wrapper
            > .smooth-image) {
          height: 50vw;
        }
        /*### IMAGES ###*/
        :global(.row-ml-9px) {
          margin-left: -9px;
        }
        :global(.show-btn) {
          position: absolute;
          bottom: 10px;
          right: 8px;
        }
        :global(.image-btn, .video-btn) {
          background: rgb(255, 255, 255) !important;
          color: rgb(34, 34, 34) !important;
          font-weight: 600 !important;
          font-size: 14px;
          padding: 7px 15px;
          border-color: rgb(34, 34, 34) !important;
          cursor: pointer;
          border-radius: 5px;
        }
        .show-image {
          position: absolute;
          top: 85%;
          left: 70%;
          z-index: 10;
          background: rgb(255, 255, 255) !important;
          color: rgb(34, 34, 34) !important;
          font-weight: 600 !important;
          font-size: 14px;
          padding: 7px 15px;
          border-color: rgb(34, 34, 34) !important;
          cursor: pointer;
          border-radius: 5px;
        }
        :global(.image-left-radius > .smooth-image-wrapper img) {
          border-radius: 15px 0px 0px 15px;
        }
        :global(.image-tp-rt > .smooth-image-wrapper img) {
          border-radius: 0px 15px 0px 0px;
        }
        :global(.image-tp-btm > .smooth-image-wrapper img) {
          border-radius: 0px 0px 15px 0px;
        }
        /*### IMAGES ###*/

        /*### MOBILE VIDEO BUTTON ###*/
        .letter-space {
          letter-spacing: 2px;
        }
        .img-status span {
          position: absolute;
          bottom: 8px;
          right: 8px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          background: rgba(145, 147, 152, 0.7);
          border-radius: 5px;
          padding: 5px 13px;
          float: right;
        }
        .img-status span.img-status-num {
          background: rgba(34, 34, 34, 0.66) !important;
        }
        :global(.btn-video) {
          position: absolute !important;
          bottom: -18px !important;
          background: rgb(255, 255, 255) !important;
          color: rgb(34, 34, 34) !important;
          font-weight: 600 !important;
          font-size: 14px;
          padding: 7px 15px;
          border-color: rgb(34, 34, 34) !important;
          cursor: pointer;
          border-radius: 5px;
        }
        :global(.wrapper-btn-video) {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          padding: 0 10px;
        }
        @media only screen and (max-width: 575.98px) {
          :global(.m-btn-block) {
            display: block;
            width: 100%;
          }
          :global(.m-t-0-s) {
            margin-top: 0 !important;
          }
          :global(.m-btm-1) {
            margin-bottom: 10px !important;
          }
          :global(.divider) {
            border-top: 1px solid #dddddd !important;
          }
          :global(.divide-title) {
            width: 20%;
            text-align: left;
            margin-left: 0;
            border-top: 1px solid #ff385c !important;
            margin-bottom: 16px !important;
          }
        }
        /*### MOBILE VIDEO BUTTON ###*/

        :global(.txt-space-pre-line) {
          white-space: pre-line;
        }

        :global(.show-more, .show-less) {
          width: 100%;
          margin-top: 20px;
          position: relative;
          z-index: 0;
          display: flex;
          padding: 0px;
        }
        :global(.show-more::before) {
          content: "";
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 40px;
          top: -60px;
          background: linear-gradient(
            rgba(255, 255, 255, 0),
            rgb(255, 255, 255)
          );
        }
        :global(.show-more a, .show-less a) {
          font-weight: 500;
          color: rgb(43, 110, 210);
          letter-spacing: 0px;
          display: inline-block;
        }

        :global(.ribbon-detail-property) {
          width: 160px;
          height: 28px;
          font-size: 12px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          box-shadow: 0px 2px 3px rgba(136, 136, 136, 0.25);
          background: #ff385c;
          transform: rotate(45deg);
          position: absolute;
          right: -54px;
          top: 12px;
          padding-top: 3px;
          z-index: 10;
          line-height: 2;
        }

        @media (max-width: 1024px) {
          :global(.fs-13-lg) {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
};

Property.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  try {
    const { access_token } = cookie.get(ctx);
    const headerCfgServer = { headers: { Authorization: `Bearer ${access_token}` } };
    if (access_token) {
      let res = await axios.get(`/property/${slug}`, headerCfgServer);
      ctx.store.dispatch(actions.slugPropertySuccess(res.data));
    } else {
      let res = await axios.get(`/property/${slug}`);
      ctx.store.dispatch(actions.slugPropertySuccess(res.data));
    }
  } catch (err) {
    console.log("property [slug] ===> ", err.response)
    if(err.response.data.msg === "Token has expired"){
      let res = await axios.get(`/property/${slug}`);
      ctx.store.dispatch(actions.slugPropertySuccess(res.data));
    }
    if (err.response && err.response.status == 404) {
      process.browser
        ? Router.replace("/", "/") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/" }).end(); //Redirec from Server Side
    }
  }
};

export default Property;
