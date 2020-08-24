import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Modal, Button } from 'antd';

import Link from "next/link"
import validator from "validator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import NoSSR from "react-no-ssr";
import moment from "moment";
import ItemsCarousel from 'react-items-carousel';
import * as actions from "../../store/actions";
import ShareModal from "./ShareModal";

import { isAuth } from "../../hoc/withAuth";
import { Fade } from "../Transition";

const formatter = new Intl.NumberFormat(['ban', 'id'])

const favLoginBtn = () => document.getElementById("btn-login-navbar").click();

const CardContainer = ({
  id, slug, name, images, property_for, type_id, bedroom, bathroom, land_size, building_size, status,
  villaPriceList, selectedPrice, landPriceList, hotdeal, location, created_at, love, VILLA_CHECK_ID, LAND_CHECK_ID
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(selectedPrice)
  const [fav, setFav] = useState(love)
  const [showModal, setShowModal] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const currency = useSelector(state => state.currency.currency)
  let currencySymbol = null
  let currencyValue = 1

  if(currency){
    currencySymbol = Object.keys(currency.rates)
    currencyValue = (+Object.values(currency.rates)).toFixed(0)
  }

  const imageCard = images.split(",");
  const statusProperty = property_for.split(",");
  const propertyShareLink = `${process.env.BASE_URL}/property/${slug}`

  const onClickHandler = data => {
    setSelected({
      ...selected,
      name: data.name,
      price: data.price,
      period: data.period ? data.period : null
    })
  }

  const loveHandler = (id, slug) => {
    if(!isAuth()){
      favLoginBtn()
    } 
    if(isAuth() && !fav) {
      dispatch(actions.loveProperty(id, slug))
      setFav(!fav)
    } 
    if(isAuth() && fav) {
      dispatch(actions.unLoveProperty(id, slug))
      setFav(!fav)
    } 
  }

  let buttonPrice = {};
  if(villaPriceList.length > 0){
    buttonPrice = villaPriceList.map((data, i) => {
      return (
        <button key={i} className={`${data.name === selected.name && 'active'} btn fs-10-s`} 
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
    land_total_price = data.price * land_size * currencyValue
    return (
      <p className="fw-500 fs-16 text-dark mb-1 fs-12-s" key={i}>
      {currencySymbol} {formatter.format(data.price * currencyValue)} 
        <small className="fs-14 fs-12-s">
          {" "}/ are
        </small>
      </p>
    )})
  }
  if(type_id === LAND_CHECK_ID && status === "Lease Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size * currencyValue
    return (
      <p className="fw-500 fs-16 text-dark mb-1 fs-12-s" key={i}>
        {currencySymbol} {formatter.format(data.price * currencyValue)}
        <small className="fs-14 fs-12-s">
          {" "}/ are / year
        </small>
      </p>
    )})
    land_leasehold = landPriceList.map((data, i) => (
      <Badge className="font-weight-normal pl-0 mr-1 mb-2" key={i}>
        <i className="far fa-lg fa-calendar-alt mr-2 fs-12-s" />
        <span className="pr-1">Can lease until: {data.period}</span>
      </Badge>
    ))
  }

  if(type_id !== LAND_CHECK_ID){
    price_list = (
      <p className="fw-500 fs-16 text-dark mb-1 fs-12-s">
        {currencySymbol} {formatter.format(selected.price * currencyValue)} 
      </p>
    )
    
    amenities = (
      <>
        {bedroom && (
          <Badge className="font-weight-normal pl-0 mr-1 mb-2">
            <i className="far fa-bed fa-lg mr-2 fs-12-s" />
            <span className="pr-1">{bedroom}</span>
          </Badge>
        )}
        {bathroom && (
          <Badge className="font-weight-normal pl-0 mr-1 mb-2">
            <i className="far fa-bath fa-lg mr-2 fs-12-s" />
            <span className="pr-1">{bathroom}</span>
          </Badge>
        )}
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-expand-arrows fa-lg mr-2 fs-12-s" />
          <span className="pr-1">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-home fa-lg mr-2 fs-12-s" />
          <span className="pr-1">{building_size} m²</span>
        </Badge>
      </>
    )
  }
  if(type_id === LAND_CHECK_ID){
    amenities = (
      <>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-expand-arrows fa-lg mr-2 fs-12-s" />
          <span className="pr-1">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1 mb-2">
          <i className="far fa-lg fa-file-certificate mr-2 fs-12-s" />
          <span className="pr-1">{status}</span>
        </Badge>
      </>
    )
  }
  const renderImages = imageCard.map((img, i) => (
    <img src={`${process.env.API_URL}/static/properties/${slug}/${img}`} 
    className="w-100 img-fit h-230" key={i} />
  ))
  return (
    <>
      <Card className="pos-unset border-0 shadow-card hov_none mt-2 mb-2 bor-rad-top-10">
        <div className="position-relative overflow-hidden bor-rad-top-10">
          {hotdeal && <div className="ribbon font-weight-normal fs-11-s">HOT DEAL</div> }
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            infiniteLoop
            numberOfCards={1}
            leftChevron={
              <Button shape="circle" className="custom-arrow-left">
                <i className="fas fa-chevron-left" />
              </Button>}
            rightChevron={
              <Button shape="circle" className="custom-arrow-right">
                <i className="fas fa-chevron-right" />
              </Button>}
          >
            {renderImages}
          </ItemsCarousel>
          <div className="status">
            <span className="for-sale fs-10-s">
              For {statusProperty.length > 0 && statusProperty[0] !== "" && `${statusProperty.join(" & ")}`}
            </span>
          </div>
          {type_id === LAND_CHECK_ID && (
            <div className="bottom-left">
              <h5 className="fs-16-s">{currencySymbol} {formatter.format(land_total_price)}</h5>
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
            <Card.Body className="text-dark match-height">
              <Card.Title className="text-dark font-weight-bold mb-1 hov_pointer text-truncate fs-16-s">
                {name}
              </Card.Title>
              {price_list}
              <Card.Text className="fs-12 text-secondary text-truncate m-b-5-s">
                <i className="fal fa-map-marker-alt"></i> {location}
              </Card.Text>
              {amenities}
              {land_leasehold}
              {type_id !== LAND_CHECK_ID && status !== null && validator.isIn("Lease Hold", status.split(",")) && selected.period && (
                <motion.span className="badge font-weight-normal pl-0 mr-1 mb-2"
                  animate={selected.period ? "in" : "out"}
                  variants={Fade}
                >
                  <i className="far fa-lg fa-calendar-alt mr-2 fs-12-s" />
                  <span className="pr-1">Can lease until: {selected.period}</span>
                </motion.span>
              )}
            </Card.Body>
          </a>
        </Link>
        <Card.Footer className="text-muted bg-white bor-rad-10">
          <Row className="fs-12">
            <Col className="col-auto">
              <NoSSR>
                <i className="fal fa-lg fa-calendar-check mr-2"></i> {moment(created_at).startOf('hour').fromNow()}
              </NoSSR>
            </Col>
            <Col className="text-right">
              <span className="text-decoration-none text-muted mr-2 pr-2 hov_pointer bd-right">
                {fav ? (
                  <i className="fas fa-lg fa-heart text-bhp" onClick={() => loveHandler(id, slug)} />
                ) : (
                  <i className="fal fa-lg fa-heart" onClick={() => loveHandler(id, slug)} />
                )}
              </span>
              <a className="text-decoration-none text-muted hov_pointer">
                <i className="fal fa-lg fa-share-alt" onClick={() => setShowModal(true)} />
              </a>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      <Modal
        centered
        footer={null}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        title="Share"
        closeIcon={ <i className="fas fa-times" /> }
        bodyStyle={{padding: "10px 0px"}}
        width="400px"
      >
        <ShareModal link={propertyShareLink} />
      </Modal>

      <style jsx>{`
        :global(.share-button:hover){
          background-color: #fafafa;
        }
        :global(.share-button:focus){
          background-color: #efefef;
        }
        :global(.carousel .slide) {
          min-width: 100%;
          margin: 0;
          position: relative;
          text-align: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        :global(.carousel-image-vertikal > .carousel.carousel-slider) {
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
        
        :global(.match-height) {
          height: 182px;
        }
      `}</style>
    </>
  );
};

export default React.memo(CardContainer);
