import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { renderArrow } from "./CarouselButton";
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const image = "/static/images/rent.jpg";
const image2 = "/static/images/land.jpg";
const image3 = "/static/images/sale.jpg";

const sale_rent = [
  { name: "Free Hold", price: "1.000.000.000" },
  { name: "Lease Hold", price: "2.000.000.000" },
  { name: "Daily", price: "3.000.000" },
  { name: "Weekly", price: "4.000.000" },
  { name: "Monthly", price: "5.000.000" },
  { name: "Annually", price: "9.000.000" }
];

const CardHorizontal = ({ type, statusCard, propType }) => {
  const [selected, setSelected] = useState({
    name: "Free Hold",
    price: "1.000.000.000"
  });

  const saleRentHandler = data => {
    const newData = {
      ...selected,
      name: data.name,
      price: data.price
    };
    setSelected(newData);
  };

  const renderButtonSaleRent = () => {
    return sale_rent.map((b, i) => {
      return (
        <div
          className={`${b.name === selected.name && "active"} btn`}
          key={i}
          onClick={() => saleRentHandler(b)}
        >
          {b.name}
        </div>
      );
    });
  };

  let certificate;
  if (statusCard === "lease-hold") certificate = "Lease Hold";
  if (statusCard === "free-hold") certificate = "Free Hold";

  let amenities;
  let price;
  if (type === "land") {
    amenities = (
      <>
        <span className="font-weight-normal pl-0 mr-1 badge mb-2">
          <i className="far fa-expand-arrows fa-lg mr-2" />
          <span className="pr-1">200 m²</span>
        </span>
        <span className="font-weight-normal pl-0 mr-1 badge mb-2">
          <i className="far fa-file-certificate fa-lg mr-2" />
          <span className="pr-1">{certificate}</span>
        </span>
      </>
    );
    price = (
      <div className="bottom-left-hor">
        <h5>IDR 2.500.000.000</h5>
      </div>
    );
  }

  if (type === "villa") {
    amenities = (
      <>
        <span className="font-weight-normal pl-0 mr-1 mb-2 badge">
          <i className="far fa-bed fa-lg mr-2" />
          <span className="pr-1">2</span>
        </span>
        <span className="font-weight-normal pl-0 mr-1 mb-2 badge">
          <i className="far fa-bath fa-lg mr-2" />
          <span className="pr-1">2</span>
        </span>
        <span className="font-weight-normal pl-0 mr-1 mb-2 badge">
          <i className="far fa-expand-arrows fa-lg mr-2" />
          <span className="pr-1">13 are</span>
        </span>
        <span className="font-weight-normal pl-0 mr-1 mb-2 badge">
          <i className="far fa-home fa-lg mr-2" />
          <span className="pr-1">1300 m²</span>
        </span>
      </>
    );
  }

  if (propType === "sale" && type === "villa") {
    price = (
      <div className="bottom-status-hor">
        <div className="btn active">Free Hold</div>
        <div className="btn">Lease Hold</div>
      </div>
    );
  }
  if (propType === "rent" && type === "villa") {
    price = (
      <div className="bottom-status-hor">
        <div className="btn active">Daily</div>
        <div className="btn">Weekly</div>
        <div className="btn">Monthly</div>
        <div className="btn">Annually</div>
      </div>
    );
  }
  if (propType === "sale-rent" && type === "villa") {
    price = <div className="bottom-status-hor">{renderButtonSaleRent()}</div>;
  }

  let purpose;
  if (propType === "sale") purpose = "Sale";
  if (propType === "rent") purpose = "Rent";
  if (propType === "sale-rent") purpose = "Sale & Rent";

  return (
    <>
      <Card className="mb-3 border-0 shadow-card bor-rad-left-10">
        <Row noGutters>
          <Col md={5} className="card-horizontal">
            <Carousel
              infiniteLoop
              swipeable
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
              renderArrowPrev={renderArrow("prev")}
              renderArrowNext={renderArrow("next")}
            >
              <img
                src={image}
                className="card-img img-fit w-100 h-100 bor-rad-left-10 bor-rad-right-0"
              />
              <img
                src={image2}
                className="card-img img-fit w-100 h-100 bor-rad-left-10 bor-rad-right-0"
              />
              <img
                src={image3}
                className="card-img img-fit w-100 h-100 bor-rad-left-10 bor-rad-right-0"
              />
            </Carousel>
            {price}
            <div className="top-left">
              <span className="for-sale">For {purpose}</span>
            </div>
          </Col>

          <Col md={7}>
            <Card.Body className="match-height-hor">
              <p className="text-dark font-weight-bold mb-1 hov_pointer fs-18 lh-1">
                The Buah Bali Villas
              </p>
              <p className="fw-500 fs-16 text-dark mb-1">
                IDR {selected.price}
                <small className="fs-14">
                  {" "}
                  {type !== "villa" && <> / are</>}{" "}
                  {statusCard === "lease-hold" && <>/ year</>}
                </small>
              </p>
              <p className="fs-12 text-secondary card-text text-truncate text-capitalize">
                <i className="fal fa-map-marker-alt mr-1" /> Seminyak, Kuta,
                Bali 30123.
              </p>
              {/* ICON */}
              {amenities}
              {statusCard === "lease-hold" && (
                <span className="font-weight-normal pl-0 mr-1 badge mb-2">
                  <i className="far fa-calendar-alt fa-lg mr-2"></i>
                  <span className="pr-1">
                    Can lease until: 18 February 2049
                  </span>
                </span>
              )}
              <motion.span
                className="font-weight-normal pl-0 mr-1 badge mb-2"
                animate={selected.name === "Lease Hold" ? "in" : "out"}
                variants={Fade}
              >
                <i className="far fa-calendar-alt fa-lg mr-2"></i>
                <span className="pr-1">Can lease until: 18 February 2049</span>
              </motion.span>
              {/* ICON */}
            </Card.Body>
            <Card.Footer className="text-muted bg-white bor-rad-10">
              <Row className="fs-12">
                <Col>
                  <i className="fal fa-lg fa-calendar-check mr-2"></i> 2 Days
                  ago
                </Col>
                <Col className="text-right">
                  <span className="text-decoration-none text-muted mr-2 pr-2 hov_pointer bd-right">
                    <i className="fal fa-lg fa-heart"></i>
                  </span>
                  <a className="text-decoration-none text-muted hov_pointer">
                    <i className="fal fa-lg fa-share-alt"></i>
                  </a>
                </Col>
              </Row>
            </Card.Footer>
          </Col>
        </Row>
      </Card>

      <style jsx>{`
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

        :global(.custom-arrow) {
          position: absolute;
          outline: 0px;
          transition: all 0.5s ease 0s;
          border-radius: 35px;
          z-index: 20;
          border: 0px;
          background: #ffffff4d;
          color: #6a6a6a8a;
          min-width: 30px;
          min-height: 30px;
          opacity: 1;
          cursor: pointer;
          right: 5px;
          padding-top: 4px;
        }
        :global(.custom-arrow:hover) {
          background: #ffffffdb;
          color: #6a6a6a;
        }

        :global(.bottom-status-hor) {
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
          border-bottom-left-radius: 10px;
        }
        :global(.bottom-status-hor > .btn) {
          padding: 3px 8px;
          margin-right: 5px;
          font-size: 11px;
          background: #021927;
          border-radius: 50px;
          color: white;
          text-transform: capitalize;
          cursor: pointer;
        }
        :global(.bottom-status-hor > .btn.active) {
          color: #021927;
          background: white;
        }
        :global(.bottom-status-hor::-webkit-scrollbar) {
          display: none;
        }

        :global(.match-height-hor) {
          height: 179px;
        }

        .top-left span {
          position: absolute;
          top: 8px;
          right: 8px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          background: rgba(145, 147, 152, 0.7);
          border-radius: 5px;
          padding: 4px 8px;
          float: right;
        }
        .top-left span.for-sale {
          background: #551a8b;
        }

        :global(.bottom-left-hor h5) {
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          color: #fff;
          text-transform: uppercase;
          font-size: 18px;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.02),
            rgb(0, 0, 0)
          );
          border-radius: 0px;
          border-bottom-left-radius: 10px;
          padding: 20px 10px 10px 10px;
          margin-bottom: 0px;
        }
      `}</style>
    </>
  );
};

export default CardHorizontal;
