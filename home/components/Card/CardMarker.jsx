import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { renderArrow } from "./CarouselButton";
import Link from 'next/link'
import Badge from "react-bootstrap/Badge";

const formatter = new Intl.NumberFormat(['ban', 'id'])
const formPrice = { name: "", price: "", period: null }

const CardMarker = ({ 
  type_id, slug, images, name, location, hotdeal, property_for, bedroom, bathroom, status, land_size, 
  building_size, villaPriceList, selectedPrice, landPriceList, VILLA_CHECK_ID, LAND_CHECK_ID
}) => {

  const [selected, setSelected] = useState(formPrice)

  useEffect(() => {
    if(selectedPrice){
      setSelected(selectedPrice)
    }
  },[selectedPrice])

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
  if(type_id === LAND_CHECK_ID && status === "Free Hold"){
    price_list = landPriceList.map((data, i) => {
    land_total_price = data.price * land_size
    return (
      <p className="fw-500 fs-14 text-dark mb-1" key={i}>
        IDR {formatter.format(data.price)} 
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
      <p className="fw-500 fs-14 text-dark mb-1" key={i}>
        IDR {formatter.format(data.price)}
        <small className="fs-14">
          {" "}/ are / year
        </small>
      </p>
    )})
  }

  if(type_id !== LAND_CHECK_ID){
    price_list = <>IDR {formatter.format(selected.price)}</>

    amenities = (
      <div className="text-dark">
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-bed fa-lg mr-1" />
          <span className="fs-14">{bedroom}</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-bath fa-lg mr-1" />
          <span className="fs-14">{bathroom}</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-expand-arrows fa-lg mr-1" />
          <span className="fs-14">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-home fa-lg mr-1" />
          <span className="fs-14">{building_size} m²</span>
        </Badge>
      </div>
    )
  }
  if(type_id === LAND_CHECK_ID){
    amenities = (
      <div className="text-dark">
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-expand-arrows fa-lg mr-1" />
          <span className="fs-14">{land_size} are</span>
        </Badge>
        <Badge className="font-weight-normal pl-0 mr-1">
          <i className="far fa-lg fa-file-certificate mr-1" />
          <span className="fs-14">{status}</span>
        </Badge>
      </div>
    )
  }

  const renderImages = imageCard.map((img, i) => (
    <img src={`${process.env.API_URL}/static/properties/${slug}/${img}`} 
    className="img-fit h-200" key={i} />
  ))
  return (
    <>
      <div className="w-min-content card-marker">
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
            <div className="bottom-left bottom-left-marker">
              <h5>IDR {formatter.format(land_total_price)}</h5>
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
            <div className="info">
              <div className="location text-truncate text-secondary">
                <i className="fal fa-map-marker-alt mr-1" />
                <span className="text-capitalize">
                  {location}
                </span>
              </div>

              <div className="title mt-2 text-truncate text-capitalize">
                {name}
              </div>
              {land_leasehold}
              <div className="price mt-1 mb-2">{price_list}</div>
              {amenities}
            </div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        :global(.status span) {
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
        :global(.status span.for-sale) {
          background: #551a8b;
        }

        :global(.bottom-left-marker h5) {
          font-size: 18px;
          padding: 10px 23px 10px 11px;
        }

        :global(.info) {
          padding: 10px;
          text-align: left;
          overflow-wrap: break-word;
        }
        :global(.info .location) {
          font-size: 14px !important;
          max-width: 230px;
        }
        :global(.info .title) {
          font-weight: 400 !important;
          color: rgb(34, 34, 34) !important;
          font-size: 16px !important;
          padding-bottom: 5px;
          max-width: 230px;
        }
        :global(.info .price) {
          color: rgb(34, 34, 34) !important;
          font-weight: 500;
          font-size: 14px !important;
        }

        :global(.card-marker .carousel .slider-wrapper) {
          width: 250px;
        }

        :global(.carousel .slide) {
          min-width: 100%;
          margin: 0;
          position: relative;
          text-align: center;
          /* background: #000; */
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
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

      `}</style>
    </>
  );
};

export default React.memo(CardMarker);
