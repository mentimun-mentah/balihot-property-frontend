import { useState } from "react";
import { renderArrow } from "./CarouselButton";

import Link from "next/link"
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import moment from "moment";

import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { Fade } from "../Transition";

const formatter = new Intl.NumberFormat(['ban', 'id'])

const CardContainer = ({
  slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size, status,
  villaPriceList, selectedPrice, landPriceList, hotdeal, location, created_at, mouseEnter, mouseLeave
}) => {
  const [selected, setSelected] = useState(selectedPrice)

  const imageCard = images.split(",");
  const statusProperty = property_for.split(",");

  const onClickHandler = data => {
    setSelected({
      ...selected,
      name: data.name,
      price: data.price,
      period: data.period ? data.period : null
    })
  }

  let buttonPrice = {};
  if(villaPriceList.length > 0){
    buttonPrice = villaPriceList.map((data, i) => {
      return (
        <button key={i} className={`${data.name === selected.name && 'active'} btn`} 
          onClick={() => onClickHandler(data)}
        > 
          {data.name} 
        </button>
      )
    })
  }

  let amenities, price_list, land_total_price, land_leasehold;
  if(type_id === 2 && status === "Free Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size
    return (
      <p className="fw-500 fs-16 text-dark mb-1" key={i}>
        IDR {formatter.format(data.price)} 
        <small className="fs-14">
          {" "}/ are
        </small>
      </p>
    )})
  }
  if(type_id === 2 && status === "Lease Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size
    return (
      <p className="fw-500 fs-16 text-dark mb-1" key={i}>
        IDR {formatter.format(data.price)}
        <small className="fs-14">
          {" "}/ are / year
        </small>
      </p>
    )})
    land_leasehold = landPriceList.map((data, i) => (
      <Badge className="font-weight-normal pl-0 mr-1 mb-2" key={i}>
        <i className="far fa-lg fa-calendar-alt mr-2" />
        <span className="pr-1">Can lease until: {data.period}</span>
      </Badge>
    ))
  }

  if(type_id === 1){
    price_list = (
      <p className="fw-500 fs-16 text-dark mb-1">
        IDR {formatter.format(selected.price)} 
      </p>
    )
    
    amenities = (
      <>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-bed fa-lg mr-2" />
          <span className="pr-1">{bedroom}</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-bath fa-lg mr-2" />
          <span className="pr-1">{bathroom}</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-expand-arrows fa-lg mr-2" />
          <span className="pr-1">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-home fa-lg mr-2" />
          <span className="pr-1">{building_size} m²</span>
        </Badge>
      </>
    )
  }
  if(type_id === 2){
    amenities = (
      <>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-expand-arrows fa-lg mr-2" />
          <span className="pr-1">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-lg fa-file-certificate mr-2" />
          <span className="pr-1">{status}</span>
        </Badge>
      </>
    )
  }
  const renderImages = imageCard.map((img, i) => (
    <img src={`${process.env.API_URL}/static/properties/${slug}/${img}`} 
    className="card-img h-230 img-fit bor-rad-left-10 bor-rad-right-0" key={i} />
  ))

  return (
    <>
      <Card className="mb-3 border-0 shadow-card bor-rad-left-10" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <Row noGutters>
          <Col xl={5} lg={5} md={5} sm={5} xs={5} className="card-horizontal">
            <div className="position-relative overflow-hidden carousel-horizontal">
              {hotdeal && <div className="ribbon font-weight-normal">HOT DEAL</div> }
              <Carousel
                infiniteLoop
                swipeable
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={renderArrow("prev")}
                renderArrowNext={renderArrow("next")}
              >
                {renderImages}
              </Carousel>
              <div className="status">
                <span className="for-sale">
                  For {statusProperty.length > 0 && statusProperty[0] !== "" && `${statusProperty.join(" & ")}`}
                </span>
              </div>
              {type_id === 2 && (
                <div className="bottom-left bottom-left-hor">
                  <h5 className="fs-18-m">IDR {formatter.format(land_total_price)}</h5>
                </div>
              )}
              {type_id === 1 && (
                <div className="bottom-status bottom-status-hor">
                  {buttonPrice}
                </div>
              )}
            </div>
          </Col>

          <Col xl={7} lg={7} md={7} sm={7} xs={7}>
            <Link href="property/[slug]" as={`property/${slug}`}>
              <a className="text-decoration-none">
                <Card.Body className="text-dark">
                  <p className="text-dark font-weight-bold mb-1 hov_pointer fs-18 lh-1 text-truncate">
                    {name}
                  </p>
                  {price_list}
                  <Card.Text className="fs-12 text-secondary text-truncate">
                    <i className="fal fa-map-marker-alt"></i> {location}
                  </Card.Text>
                  {amenities} <br />
                  {land_leasehold}
                  {type_id == 1 && status !== null && 
                    validator.isIn("Lease Hold", status.split(",")) && selected.period && (
                    <motion.span className="badge font-weight-normal pl-0 mr-1 mb-2"
                      animate={selected.period ? "in" : "out"}
                      variants={Fade}
                    >
                      <i className="far fa-lg fa-calendar-alt mr-2" />
                      <span className="pr-1">Can lease until: {selected.period}</span>
                    </motion.span>
                  )}
                </Card.Body>
                <Card.Footer className="text-muted bg-white bor-rad-10 footer-edit">
                  <Row className="fs-12">
                    <Col>
                    <i className="fal fa-lg fa-calendar-check mr-2"></i> {moment(created_at).startOf('hour').fromNow()}
                    </Col>
                    <Col className="text-right">
                      <span className="text-decoration-none text-muted mr-2 pr-2 hov_pointer bd-right">
                        <i className="fal fa-lg fa-heart"></i>
                      </span>
                      <span className="text-decoration-none text-muted hov_pointer">
                        <i className="fal fa-lg fa-share-alt"></i>
                      </span>
                    </Col>
                  </Row>
                </Card.Footer>
              </a>
            </Link>
          </Col>
        </Row>
      </Card>

      <style jsx>{`
        :global(.footer-edit){
          position: absolute;
          width: 100%;
          bottom: 0;
        }
        :global(.card-horizontal > .carousel-root) {
          position: absolute !important;
          width: 100% !important;
          height: 100% !important;
          top: 0;
          left: 0;
        }
        :global(.carousel.carousel-slider) {
          display: block;
          overflow: hidden;
          position: relative;
          height: 100%;
          width: 100%;
        }
        :global(.carousel .slider-wrapper) {
          height: 100%;
        }
        :global(.carousel .slider) {
          height: inherit;
        }

        :global(.ribbon) {
          width: 160px;
          height: 28px;
          font-size: 12px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          box-shadow: 0px 2px 3px rgba(136, 136, 136, 0.25);
          background: #ff385c;
          transform: rotate(-45deg);
          position: absolute;
          left: -54px;
          top: 12px;
          padding-top: 3px;
          z-index: 10;
          line-height: 2;
        }
        :global(.badge) {
          font-size: 75% !important;
          text-transform: unset;
        }
        :global(.p-20){
          padding: 20px;
        }
        .status span {
          position: absolute;
          top: 8px;
          right: 8px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          background: rgba(145, 147, 152, 0.7);
          border-radius: 5px;
          padding: 5px 13px;
          float: right;
        }
        .status span.for-sale {
          background: #551a8b;
        }
        :global(.bottom-left h5) {
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          color: #fff;
          text-transform: uppercase;
          font-size: 20px;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.02),
            rgb(0, 0, 0)
          );
          border-radius: 0px;
          padding: 10px 23px 20px 23px;
          margin-bottom: 0px;
        }
        :global(.bottom-status) {
          position: absolute;
          bottom: 0px;
          left: 0px;
          padding: 10px 8px 15px 8px;
          width: 100%;
          white-space: pre;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: -ms-autohiding-scrollbar;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.02),
            rgb(0, 0, 0)
          );
        }
        :global(.bottom-status-hor, .bottom-left-hor h5) {
          border-bottom-left-radius: 10px !important;
        }
        :global(.bottom-status > .btn) {
          padding: 3px 8px;
          margin-right: 5px;
          font-size: 11px;
          font-weight: 400;
          background: #021927;
          border-radius: 50px;
          color: white;
          text-transform: capitalize;
          cursor: pointer;
        }
        :global(.bottom-status > .btn:hover) {
          transform: translateY(0px);
        }
        :global(.bottom-status > .btn.active) {
          color: #021927;
          background: white;
        }
        :global(.bottom-status::-webkit-scrollbar) {
          display: none;
        }
        
        :global(.match-height) {
          height: 182px;
        }
      `}</style>
    </>
  );
};

export default React.memo(CardContainer);
