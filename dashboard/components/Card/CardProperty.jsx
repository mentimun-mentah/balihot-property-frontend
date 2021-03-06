import { useState } from "react";
import { renderArrow } from "./CarouselButton";
import { Tooltip } from 'antd';
import { motion } from "framer-motion";
import { Fade } from "../Transition";

import Link from "next/link"
import validator from "validator";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import formatNumber from "../../lib/formatNumber";

import { Carousel } from "react-responsive-carousel";

const CardContainer = ({
  id, type, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size, status,
  villaPriceList, selectedPrice, landPriceList, onDelete, hotdeal, location, LAND_CHECK_ID
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

  let PROPERTY_CODE = 'BHP-'
  PROPERTY_CODE += `${type.name.charAt(0)}${type.name.slice(-1)}${property_for.split(',').map(x => x[0]).join('')}${id}`.toUpperCase()

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
  if(type_id === LAND_CHECK_ID && status === "Free Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size
    return (
      <p className="fs-15 text-dark mb-0" key={i}>
        USD {formatNumber(data.price)} 
        <small className="fs-14">
          {" "}/ are
        </small>
      </p>
    )})
  }
  if(type_id === LAND_CHECK_ID && status === "Lease Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size
    return (
      <p className="fs-15 text-dark mb-0" key={i}>
        USD {formatNumber(data.price)}
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

  if(type_id !== LAND_CHECK_ID){
    price_list = (
      <p className="fs-15 text-dark mb-0">
        USD {formatNumber(selected.price)} 
      </p>
    )
    
    amenities = (
      <>
        {bedroom && (
          <Badge className="font-weight-normal pl-0 mr-1 mb-2">
            <i className="far fa-bed fa-lg mr-2" />
            <span className="pr-1">{bedroom}</span>
          </Badge>
        )}
        {bathroom && (
          <Badge className="font-weight-normal pl-0 mr-1 mb-2">
            <i className="far fa-bath fa-lg mr-2" />
            <span className="pr-1">{bathroom}</span>
          </Badge>
        )}
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
  if(type_id === LAND_CHECK_ID){
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
    className="img-fit h-230 bor-rad-top-10" key={i} />
  ))

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Card className="pos-unset border-0 shadow-card bor-rad-top-10 hov_none">
          <div className="position-relative overflow-hidden">
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
            {type_id === LAND_CHECK_ID && (
              <div className="bottom-left">
                <h5>USD {formatNumber(land_total_price)}</h5>
              </div>
            )}
            {type_id !== LAND_CHECK_ID && (
              <div className="bottom-status">
                {buttonPrice}
              </div>
            )}
          </div>
          <Link href="/property/[slug]" as={`/property/${slug}`}>
            <a className="text-decoration-none">
              <Card.Body className="text-dark p-20 match-height">
                <Card.Title className="text-dark fw-500 mb-0 hov_pointer fs-18 text-truncate">
                  {name}
                </Card.Title>
                {price_list}
                <Card.Text className="fs-12 text-grey text-truncate">
                  <i className="fal fa-map-marker-alt"></i> {location}
                </Card.Text>
                {amenities}
                {land_leasehold}
                {type_id !== LAND_CHECK_ID && status !== null && validator.isIn("Lease Hold", status.split(",")) && selected.period && (
                  <Badge className="font-weight-normal pl-0 mr-1 mb-2">
                    <i className="far fa-lg fa-calendar-alt mr-2" />
                    <span className="pr-1">Can lease until: {selected.period}</span>
                  </Badge>
                )}
              </Card.Body>
            </a>
          </Link>
          <Card.Footer className="text-muted bg-white bor-rad-10 p-20">
            <Row className="fs-11">

              <Col className="col-auto mr-auto text-truncate width-code">
                <span className="text-decoration-none text-muted mr-2 pr-2 bd-right font-weight-bold">
                  CODE: {PROPERTY_CODE}
                </span>
                <span className="text-decoration-none text-muted mr-2 pr-2 font-weight-bold">
                  {type.name}
                </span>
              </Col>
              <Col className="col-auto col-md-auto col-lg-auto col-xl-auto width-additional-btn">
                <Link href="manage-property/[id]" as={`manage-property/${id}`}>
                  <span className="mr-2 pr-2 hov_pointer bd-right">
                    <Tooltip placement="bottomRight" title="Edit" arrowPointAtCenter>
                      <i className="far fa-lg fa-edit" />
                    </Tooltip>
                  </span>
                </Link>
                <span className="hov_pointer" onClick={onDelete}>
                  <Tooltip placement="bottomRight" title="Delete" color="#ff4463" arrowPointAtCenter>
                    <i className="far fa-lg fa-trash-alt" />
                  </Tooltip>
                </span>
              </Col>

              <Col className="d-none">
                <Link href="manage-property/[id]" as={`manage-property/${id}`}>
                  <Button variant="default" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={onDelete} >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </motion.div>
      <style jsx>{`
        :global(.carousel .slide) {
          min-width: 100%;
          margin: 0;
          position: relative;
          text-align: center;
          /* background: #000; */
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
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
        :global(.custom-arrow) {
          position: absolute;
          outline: 0px;
          transition: all 0.5s ease 0s;
          border-radius: 35px;
          z-index: 2;
          border: 0px;
          background: #ffffff4d;
          color: #6a6a6a8a;
          min-width: 30px;
          min-height: 30px;
          opacity: 1;
          cursor: pointer;
          top: 45%;
          right: 5px;
          padding-top: 4px;
        }
        :global(.custom-arrow:hover) {
          background: #ffffffdb;
          color: #6a6a6a;
        }
        
        :global(.match-height) {
          height: 182px;
        }

        :global(.width-code){
          max-width: 70%;
        }
        :global(.width-additional-btn){
          max-width: calc(100% - 70%);
        }

        @media screen and (device-aspect-ratio: 40/71) {
          :global(.width-code){
            max-width: 70%;
          }
          :global(.width-additional-btn){
            max-width: calc(100% - 30%);
          }
        }
      `}</style>
    </>
  );
};
export default React.memo(CardContainer);
