import { useState } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GMapsOptions, markerOptions, markers } from "../Properties/GMaps-options";
import ContentLoader from "react-content-loader";
import RenderSmoothImage from "render-smooth-image-react";

import AwesomeSlider from "react-awesome-slider";
import Carousel from "react-multi-carousel";
import CardProperty from "../Card/CardProperty";
import CardMarker from "../Card/CardMarker";

const IMAGE = "/static/images/prop-detail/";
const PROFILE = "/static/images/teams/";
const PLACEHOLDER = "/static/images/placeholder.png";
const IMAGE1 = "/static/images/";

const nextCarousel = () => document.getElementById("nextCarouselClick").click();
const prevCarousel = () => document.getElementById("prevCarouselClick").click();

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
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

const PropertyLocation = withScriptjs(
  withGoogleMap(() => {
    const [showWindow, setShowWindow] = useState(false);
    const showWindowHandler = () => setShowWindow(!showWindow);
    const infoWindowClicked = () => (
      <CardMarker name={markers[0].name} image={markers[0].image} price={markers[0].price} />
    );
    const infoOptions = {
      pixelOffset: { width: 0, height: 35 },
    };

    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: -8.780582, lng: 115.179351 }}
        defaultOptions={GMapsOptions}
        onDragEnd={() => setShowWindow(false)}
      >
        <Marker
          position={{ lat: -8.780582, lng: 115.179351 }}
          icon={markerOptions}
          onClick={showWindowHandler}
        >
          {showWindow && <InfoWindow options={infoOptions}>{infoWindowClicked()}</InfoWindow>}
        </Marker>
      </GoogleMap>
    );
  })
);

const DetailProperty = () => {
  const [showNum, setShowNum] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showNumHandler = () => setShowNum(!showNum);
  const modalShowHandler = () => setModalShow(!modalShow);
  const showAllPhotoHandler = () => setShowAllPhoto(!showAllPhoto);

  const loadedHandler = () => {
    console.log("loaded");
    setLoaded(true);
  };

  return (
    <>
      <Container className="mt-4k2rem pt-5">
        <h1 className="fs-28">HIDEOUT BALI - Eco Bamboo Home</h1>
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
              <ContentLoader viewBox="0 0 380 210">
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
              </ContentLoader>
            </Col>
            <div className="row col-6 align-content-between pr-3">
              <Row className="pb-2">
                <Col className="pr-2">
                  <ContentLoader>
                    <rect x="0" y="0" rx="5" ry="5" width="91%" height="100%" />
                  </ContentLoader>
                </Col>
                <Col className="px-0">
                  <ContentLoader>
                    <rect x="0" y="0" rx="5" ry="5" width="90%" height="100%" />
                  </ContentLoader>
                </Col>
              </Row>
              <Row>
                <Col className="pr-2">
                  <ContentLoader>
                    <rect x="0" y="0" rx="5" ry="5" width="91%" height="100%" />
                  </ContentLoader>
                </Col>
                <Col className="px-0">
                  <ContentLoader>
                    <rect x="0" y="0" rx="5" ry="5" width="90%" height="100%" />
                  </ContentLoader>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row className="row-ml-9px">
            <Col md={6} className="pr-2 pl-1">
              <RenderSmoothImage
                src={`${IMAGE}prop1.jpg`}
                className="img-fluid image-left-radius"
              />
            </Col>
            <div className="row col-6 align-content-between pr-3">
              <Row className="pb-2">
                <Col className="pr-2">
                  <RenderSmoothImage
                    src={`${IMAGE}prop2.jpg`}
                    className="img-fluid image-left-radius"
                  />
                </Col>
                <Col className="px-0">
                  <RenderSmoothImage src={`${IMAGE}prop3.jpg`} className="img-fluid image-tp-rt" />
                </Col>
              </Row>
              <Row>
                <Col className="pr-2">
                  <RenderSmoothImage src={`${IMAGE}prop4.jpg`} className="img-fluid" />
                </Col>
                <Col className="px-0">
                  <RenderSmoothImage src={`${IMAGE}prop5.jpg`} className="img-fluid image-tp-btm" />
                </Col>
              </Row>
              <button
                type="button"
                className="btn show-image float-right"
                onClick={showAllPhotoHandler}
              >
                Show all photos
              </button>
            </div>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row className="property">
            <Col md={8}>
              <div className="property-content">
                <Card className="border-0 shadow-none hov_none">
                  <Card.Header className="bg-transparent">
                    <h1 className="fs-20">Entire villa hosted by Wayan</h1>
                    <span>
                      <i className="fal fa-bed-alt mr-2" />2 bedroom
                    </span>
                    <span aria-hidden="true" className="mr-2 ml-2">
                      ·
                    </span>
                    <span>
                      <i className="fal fa-bath mr-2" />1 shared bath
                    </span>
                    <span aria-hidden="true" className="mr-2 ml-2">
                      ·
                    </span>
                    <span>
                      <i className="fal fa-file-certificate mr-2" />
                      Lease Hold
                    </span>
                  </Card.Header>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-overview">
                    <h3 className="card-title mt-3 fs-22">Property Overview</h3>
                    <Row>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Purpose:<span className="font-weight-normal ml-1">For Sale</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Sale price:<span className="font-weight-normal ml-1">$1500</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Land area:<span className="font-weight-normal ml-1">1300ft2</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Area:<span className="font-weight-normal ml-1">240ft2</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Beds:<span className="font-weight-normal ml-1">3</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Bathrooms:<span className="font-weight-normal ml-1">5</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          Country:<span className="font-weight-normal ml-1">Croatia</span>
                        </h4>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-distance">
                    <h3 className="card-title">Distance to:</h3>
                    <Row>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          <i className="fal fa-umbrella-beach mr-2 fs-16" />
                          Beach:
                          <span className="font-weight-normal ml-1 text-secondary">
                            5 kilometer
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          <i className="fal fa-plane-departure mr-2 fs-16" />
                          Airport:
                          <span className="font-weight-normal ml-1 text-secondary">
                            10 kilometer
                          </span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <h4 className="fs-14">
                          <i className="fal fa-store mr-2 fs-16" />
                          Market:
                          <span className="font-weight-normal ml-1 text-secondary">
                            2 kilometer
                          </span>
                        </h4>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-description mb-2">
                    <h3 className="card-title property-content-title">Property Description</h3>
                    <p className="card-text text-justify mt-4">
                      This beautiful tropical real estate is located in a chic area of Berawa
                      Canggu. This stunning villa features 4 spacious with stylish and cozy en-suite
                      bedrooms with artistic bathrooms. It is furnished same as the pictures and
                      decorated in a great taste with big space in the bedrooms and provides great
                      and comfort. This property generously offers AC units , spacious living area ,
                      spacious dining area , kitchen , swimming pool , storage , water source ,
                      electricity , and parking area. This is a great option available for rent in
                      the heart of Bali. Ideal to rent as a home or for bussiness. Located just 10
                      minutes away from the beach and hardly 20 minutes from the Airport.
                    </p>
                  </div>
                </Card>

                <Card className="hov_none shadow-none m-t-35">
                  <div className="card-body property-amenities">
                    <h3 className="card-title">Property Amenities</h3>
                    <Row>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-hat-chef mr-2" />
                        <label>
                          <small>Kitchen</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-air-conditioner mr-2" />
                        <label>
                          <small>Air conditioning</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-wifi mr-2" />
                        <label>
                          <small>Wifi</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-tv mr-2" />
                        <label>
                          <small>TV</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-couch mr-2" />
                        <label>
                          <small>2 Couch</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="far fa-heat mr-2" />
                        <label>
                          <small>Heating</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-oven mr-2" />
                        <label>
                          <small>Stove</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-refrigerator mr-2" />
                        <label>
                          <small>Refrigerator</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-swimming-pool mr-2" />
                        <label>
                          <small>Pool</small>
                        </label>
                      </Col>
                      <Col lg={4} md={6} className="mb-1">
                        <i className="fal fa-parking-circle mr-2" />
                        <label>
                          <small>Free street parking</small>
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <Card.Footer className="bg-transparent border-0 mb-2 pt-0 pl-30px">
                    <Button className="show-amenities" onClick={modalShowHandler}>
                      Show all 10 amenities
                    </Button>
                  </Card.Footer>
                </Card>

                <Card className="hov_none shadow-none border-0 m-t-35">
                  <Card.Body className="pl-0 pr-0 pb-0">
                    <Card.Title>Property Location</Card.Title>
                    <PropertyLocation
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`}
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `430px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
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
                  <Card.Title className="fs-18 mb-1 pb-1">Asthi Smith</Card.Title>
                  <Card.Subtitle className="fs-14 text-muted">Owner</Card.Subtitle>
                  <Button className="mt-3 btn-call" block size="lg" onClick={showNumHandler}>
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
            responsive={responsive}
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
            <Modal.Title>Amenities</Modal.Title>
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

        <Modal
          show={showAllPhoto}
          onHide={showAllPhotoHandler}
          centered
          className="modal-show-photo"
        >
          <Modal.Header closeButton>
            <Modal.Title>HIDEOUT BALI - Eco Bamboo Home</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Body>
              <AwesomeSlider
                interval={500}
                style={{ width: "80%", height: "80vh" }}
                className="mx-auto slider-all-photo"
              >
                <div data-src={`${IMAGE1}rent.jpg`} className="img-fit h-230px w-288px" />
                <div data-src={`${IMAGE1}sale.jpg`} className="img-fit h-230px w-288px" />
                <div data-src={`${IMAGE1}land.jpg`} className="img-fit h-230px w-288px" />
              </AwesomeSlider>
            </Card.Body>
          </Modal.Body>
        </Modal>
      </section>

      <style jsx>{`
        :global(.btn-share-like) {
          color: #6c757d !important;
          font-size: 14px;
          background-color: transparent;
          border: 0px;
          border-radius: 8px !important;
        }
        :global(.btn-share-like:hover) {
          background: rgb(247, 247, 247) !important;
          color: #000 !important;
        }

        /*### IMAGES ###*/
        :global(.row-ml-9px) {
          margin-left: -9px;
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
        :global(.image-left-radius) {
          border-radius: 15px 0px 0px 15px;
        }
        :global(.image-tp-rt) {
          border-radius: 0px 15px 0px 0px;
        }
        :global(.image-tp-btm) {
          border-radius: 0px 0px 15px 0px;
        }
        /*### IMAGES ###*/

        /*## PROPERTY OVERVIEW ##*/
        .property-overview {
          padding: 10px 30px 20px 30px;
        }
        .property-overview > ul {
          padding: 0;
        }
        .property-overview ul li {
          float: left;
          width: 33%;
          list-style: none;
        }
        .property-overview ul li h4 {
          color: #242526;
          font-size: 14px;
          display: inline-block;
        }
        .property-overview ul li span {
          display: inline-block;
          color: #67686c;
          font-size: 14px;
          padding-left: 1px;
        }
        .property-overview span {
          color: #67686c;
          font-size: 14px;
          padding-left: 1px;
        }
        .property-overview h3 {
          color: rgb(34, 34, 34) !important;
          font-size: 22px !important;
          margin-bottom: 16px;
          margin-top: 20px;
        }
        /*## PROPERTY OVERVIEW ##*/

        /*## DISTANCE TO##*/
        .property-distance {
          padding: 10px 30px 20px 30px;
        }
        .property-distance > ul {
          padding: 0;
        }
        .property-distance ul li {
          float: left;
          width: 33%;
          list-style: none;
        }
        .property-distance ul li h4 {
          color: #242526;
          font-size: 14px;
          display: inline-block;
        }
        .property-distance ul li span {
          display: inline-block;
          color: #67686c;
          font-size: 14px;
          padding-left: 1px;
        }
        .property-distance h3 {
          color: rgb(34, 34, 34) !important;
          font-size: 22px !important;
          margin-bottom: 16px;
          margin-top: 20px;
        }
        /*## DISTANCE TO##*/

        /*## PROPERTY DESC ##*/
        .property-content-title {
          color: rgb(34, 34, 34) !important;
          font-size: 22px !important;
        }
        .property-description {
          padding: 10px 30px 20px 30px;
        }
        .property-description h3 {
          margin-top: 20px;
        }
        /*## PROPERTY DESC ##*/

        /*## PROPERTY AMENTIES ##*/
        .prop-label {
          color: #968080;
        }
        :global(.show-amenities) {
          background: rgb(255, 255, 255) !important;
          color: rgb(34, 34, 34) !important;
          border-color: rgb(34, 34, 34) !important;
          border-radius: 5px;
        }
        .property-amenities {
          padding: 10px 30px 20px 30px;
        }
        .property-amenities > ul {
          padding: 0px;
        }
        .property-amenities ul li {
          float: left;
          width: 33%;
          margin-bottom: 15px;
          list-style: none;
        }
        .property-amenities ul li h4 {
          color: #242526;
          font-size: 14px;
          display: inline-block;
        }
        .property-amenities ul li span {
          display: inline-block;
          color: #67686c;
          font-size: 14px;
          padding-left: 1px;
        }
        .property-amenities h3 {
          margin-top: 20px;
          color: rgb(34, 34, 34) !important;
          font-size: 22px !important;
          margin-bottom: 16px;
        }
        /*## PROPERTY AMENTIES ##*/

        /*## INQUIRY ##*/
        .avatar {
          vertical-align: middle;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid white;
          object-fit: cover;
          object-position: 0px 0px;
        }
        :global(.rounded-inquiry) {
          border-radius: 10px;
        }
        :global(.btn-call, .btn-call:hover, .btn-call:not(:disabled):not(.disabled):active) {
          background-color: #021927;
          color: white;
          border-radius: 6px;
          border-color: #021927;
          font-size: 18px;
          box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
        }
        :global(.btn-call:focus) {
          background-color: #021927;
          border-color: #021927;
          color: white;
          box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
        }
        :global(.btn-red, .btn-red:hover, .btn-red:not(:disabled):not(.disabled):active) {
          background-color: #fc384a;
          color: white;
          border-radius: 6px;
          border-color: #fc384a;
          box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
        }
        :global(.btn-red:focus) {
          background-color: #fc384a;
          border-color: #fc384a;
          color: white;
          box-shadow: 0 0 0 0rem rgba(38, 143, 255, 0);
        }
        /*## INQUIRY ##*/

        /*## PROPERTY CONTENT ##*/
        :global(.property-content) {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100%;
        }
        :global(.property-inquiry) {
          position: sticky;
          top: 5.5rem;
        }
        :global(.property-content::-webkit-scrollbar) {
          display: none;
        }
        /*## PROPERTY CONTENT ##*/

        /*CAROUSEL*/
        :global(.btn-carousel) {
          color: rgb(34, 34, 34) !important;
          background-color: rgba(255, 255, 255, 0.9) !important;
          cursor: pointer !important;
          align-items: center !important;
          justify-content: center !important;
          background-clip: padding-box !important;
          box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px,
            rgba(0, 0, 0, 0.18) 0px 2px 4px !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          transition: box-shadow 0.2s ease 0s, -ms-transform 0.25s ease 0s,
            -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
        }
        :global(.btn-carousel:hover) {
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12) !important;
        }
        /*CAROUSEL*/

        /*### SHOW ALL PHOTO ###*/
        :global(.modal-show-photo > .modal-dialog) {
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          max-width: none !important;
        }
        :global(.modal-show-photo > .modal-dialog > .modal-content) {
          height: auto !important;
          min-height: 100% !important;
          border-radius: 0 !important;
          background-color: #ececec !important;
        }
        /*### SHOW ALL PHOTO ###*/

        /*### AWS SLIDER ###*/
        :global(.slider-all-photo .awssld__controls button) {
          position: fixed;
          top: calc(50%);
          padding-right: 13px;
          padding-left: 13px;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          border-width: 1px !important;
          border-style: solid !important;
          border-color: rgb(176, 176, 176) !important;
          margin-left: 10px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};

export default DetailProperty;
