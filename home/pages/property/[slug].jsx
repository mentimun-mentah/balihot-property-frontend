import { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow  } from "@react-google-maps/api";
import { GMapsOptions, markerOptions, infoOptions } from "../../lib/GMaps-options";
import { libraries, mapDetailContainerStyle } from "../../lib/GMaps-options";
import { Select } from 'antd';

import cookie from "nookies";
import Router from "next/router";
import axios from "../../lib/axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactBnbGallery from "react-bnb-gallery";
import Container from "react-bootstrap/Container";
import SmoothImage from "render-smooth-image-react";
import ContainerCardMarker from "../../components/Card/ContainerCardMarker";

import DetailPropertyStyle from "../../components/DetailProperty/style.js";

const { Option } = Select;

const Property = ({ propertyData }) => {
  const { slug, name, type_id, property_for, land_size, youtube, description, hotdeal} = propertyData;
  const { status, freehold_price, leasehold_price, leasehold_period } = propertyData; // For Sale 
  const { period, daily_price, weekly_price, monthly_price, annually_price } = propertyData; // For Rent
  const { facilities, bathroom, bedroom, building_size } = propertyData; // For villa
  const { location, latitude, longitude } = propertyData; // For Map 

  let img_list = []
  const images = propertyData.images.split(',')
  for(let key in images){ 
    img_list.push({photo: `${process.env.API_URL}/static/properties/${slug}/${images[key]}`}) 
  }
  let pf = property_for.split(",");

  const mapRef = useRef(null);
  const [center, setCenter] = useState({lat: latitude, lng: longitude});
  const [marker_click, setMarker_click] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);

  const onMapClick = () => setMarker_click(false);
  const markerClickHandler = () => setMarker_click(true);
  const showVideoHandler = () => setShowVideo(!showVideo);
  const showAllPhotoHandler = () => setShowAllPhoto(!showAllPhoto);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Container className="mt-4k2rem pt-5">
        <h1 className="fs-24 fs-18-s text-truncate">{name}</h1>
        <a href="#" 
          className="text-decoration-none text-secondary d-inline-block text-truncate fs-14-s" 
          style={{maxWidth: "48vw"}}
        >
          <i className="fal fa-map-marker-alt mr-1" />
          <span>
            <u>{location}</u>
          </span>
        </a>
        <div className="float-right pr-3">
          <a href="#" className="text-decoration-none text-secondary">
            <span className="mr-3 btn-share-like">
              <i className="far fa-share-square mr-1" />
              <u>Share</u>
            </span>
          </a>
          <a href="#" className="text-decoration-none text-secondary">
            <span className="btn-share-like">
              <i className="fal fa-heart mr-1" />
              <u>Save</u>
            </span>
          </a>
        </div>
      </Container>

      <section className="px-0 py-3">
        <Container className="block d-sm-block d-md-block d-lg-none d-xl-none px-0 mx-0 mw-100vw">
          <div className="img-fluid position-relative img-detail-mobile">
            <div onClick={showAllPhotoHandler} className="hov_pointer">
              <SmoothImage src={img_list[0].photo} objectFit="cover" />
            </div>
            <div className="img-status hov_pointer" onClick={showAllPhotoHandler}>
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
                    <Button className="mr-2 video-btn d-inline" onClick={showVideoHandler}>
                      <i className="far fa-video mr-1" />
                      Video
                    </Button>
                    <Button className="image-btn d-inline" onClick={showAllPhotoHandler}>
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
                <Card.Title className="fs-16-s">
                  Property Overview
                  <Badge pill variant="secondary" 
                    className="font-weight-light for-sale-badge align-middle fs-13 mx-1 text-capitalize"
                  >
                    {pf.length > 0 && pf[0] !== "" && <>{pf.join(" & ")}</>}
                  </Badge>
                </Card.Title>
                <div className="divide-title"></div>
                <Row>
                  <Col lg={4} md={6} sm={6} className="mb-2">
                    <h4 className="fs-14">
                      Land size:
                      <span className="font-weight-normal ml-1">
                        {land_size} are
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
                          <span className="font-weight-normal ml-1">{bedroom}</span>
                        </h4>
                      </Col>
                      <Col lg={4} md={6} sm={6} className="mb-2">
                        <h4 className="fs-14">
                          Bathrooms:
                          <span className="font-weight-normal ml-1">{bathroom}</span>
                        </h4>
                      </Col>
                    </>
                  )}
                  <Col lg={4} md={6} sm={6} className="mb-2">
                    <h4 className="fs-14">
                      Status:
                      <span className="font-weight-normal ml-1 status-detail ">
                        <Select size="small" 
                          defaultValue="lucy" 
                          suffixIcon={<i className="fal fa-sm fa-chevron-down ml-1" />}
                        >
                          <Option value="lucy">Free Hold</Option>
                          <Option value="Yiminghe">Lease Hold</Option>
                        </Select>
                      </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        Can lease until:
                        <span className="font-weight-normal ml-1">
                          30 July 2020
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
                  <p className="card-text text-justify mt-4 fs-14-s">
                    {description}
                  </p>
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
                      {facilities && facilities.slice(0, 10).map(fa => (
                        <Col lg={4} md={6} sm={6} className="mb-2 fs-16" key={fa.id}>
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
                          14 Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-utensils mr-2 fs-16" /> Retaurant:
                        <span className="font-weight-normal ml-1 text-secondary"> 
                          14 Km 
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-mug-hot mr-2 fs-16" /> Cafe:
                        <span className="font-weight-normal ml-1 text-secondary">
                          14 Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-capsules mr-2 fs-16" /> Pharmacy:
                        <span className="font-weight-normal ml-1 text-secondary">
                          14 Km
                        </span>
                      </h4>
                    </Col>
                    <Col lg={4} md={6} sm={6} className="mb-2">
                      <h4 className="fs-14">
                        <i className="fal fa-store mr-2 fs-16" /> Corner Store:
                        <span className="font-weight-normal ml-1 text-secondary">
                          14 Km
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
                    center={center}
                    zoom={16}
                  >
                    <Marker
                      onClick={markerClickHandler}
                      icon={markerOptions}
                      position={center}
                    />
                    {marker_click && (
                      <InfoWindow options={infoOptions} position={{lat: latitude, lng: longitude}}>
                        <ContainerCardMarker dataProperty={propertyData} />
                      </InfoWindow>
                    )}
                  </GoogleMap>

                </Card.Body>
              </Card>

            </Col>

            <Col lg={4} className="mt-4 d-none d-lg-block">
              <Card className="property-inquiry text-center rounded-inquiry">
                <Card.Body>
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
                  >
                    <i className="fal fa-phone-alt mr-2" />
                    <>Call Agent</>
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
                className="float-right rounded-circle w-38  btn-carousel"
              >
                <i className="far fa-angle-right" />
              </Button>
              <Button
                className="mr-2 float-right rounded-circle w-38 btn-carousel"
              >
                <i className="far fa-angle-left" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>


      <Row className="fixed-bottom pt-2 pb-2 pl-4 pr-4 bg-light border-top d-lg-none">
        <Col className="px-1">
          <Button className="btn-call fs-12" block>
            <i className="fal fa-phone-alt mr-2" />
            Call Agent
          </Button>
        </Col>
        <Col className="px-1">
          <Button className="btn-red fs-12" block>
            <i className="fal fa-envelope-open mr-2"></i>
            Send Inquiry
          </Button>
        </Col>
      </Row>

      {/* SHOW ALL PHOTO */}
      <ReactBnbGallery 
        show={showAllPhoto}
        photos={img_list}
        onClose={showAllPhotoHandler}
        wrap={false}
      />

      {/* SHOW VIDEO */}
      <Modal show={showVideo} onHide={showVideoHandler} size="lg" centered>
        <Modal.Body style={{ maxHeight: "80vh", overflowY: "hidden" }}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={youtube}
              allowfullscreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>

      <pre>{JSON.stringify(propertyData, null, 4)}</pre>

      <style jsx>{DetailPropertyStyle}</style>
      <style jsx>{`
        :global(.img-detail > .smooth-image-wrapper){
          height: auto;
        }
        :global(.img-detail-mobile > div > .smooth-image-wrapper){
          width: 100vw;
        }
        :global(.img-detail-mobile > div > .smooth-image-wrapper > .smooth-image){
          height: 50vw;
        }
        /*### IMAGES ###*/
        :global(.row-ml-9px) {
          margin-left: -9px;
        }
        :global(.show-btn){
          position: absolute;
          bottom: 10px;
          right: 8px;
        }
        :global(.image-btn, .video-btn){
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

        :global(.ant-select-arrow){
          top: 38%;
        }
        :global(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
          border: 0;
        }
        :global(.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
          box-shadow: none;
        }

      `}</style>
    </>
  )
}

Property.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  const { access_token } = cookie.get(ctx);
  const headerCfgServer = { headers: { Authorization: `Bearer ${access_token}` } };
  try {
    let resProperty = await axios.get(`/property/${slug}`, headerCfgServer)
    return { propertyData: resProperty.data }
  }
  catch (err) {
    if(err.response && err.response.status == 404){
      process.browser
        ? Router.replace("/", "/") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/" }).end(); //Redirec from Server Side
    }
  }
}

export default Property;
