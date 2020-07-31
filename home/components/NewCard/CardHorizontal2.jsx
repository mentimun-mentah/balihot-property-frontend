import { Carousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const renderArrow = direction => (onClickHandler, shouldBeEnabled) => {
  if (!shouldBeEnabled) return;

  const styles = {
    position: "absolute",
    cursor: "pointer",
    top: "40%",
    zIndex: 2
  };

  if (direction === "prev") {
    styles.left = 5;
    styles.paddingRight = "8px";
  } else {
    styles.right = 5;
    styles.paddingLeft = "8px";
  }

  return (
    <button
      type="button"
      onClick={onClickHandler}
      style={styles}
      className="custom-arrow"
    >
      {direction === "prev" ? (
        <i className="fas fa-chevron-left"></i>
      ) : (
        <i className="fas fa-chevron-right"></i>
      )}
    </button>
  );
};

const image = "/static/images/rent.jpg";
const image2 = "/static/images/properties/2.jpg";


const CardHorizontal = () => {

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
            </Carousel>
            <div className="top-left">
              <span className="for-sale">For sale & rent</span>
            </div>
            <div className="bottom-status">
              <div className="btn active">Free Hold</div>
              <div className="btn">Lease Hold</div>
              <div className="btn">Daily</div>
              <div className="btn">Weekly</div>
              <div className="btn">Monthly</div>
              <div className="btn">Annually</div>
            </div>
          </Col>

          <Col md={7}>
            <Card.Body className="match-height-hor">
              <p className="text-dark font-weight-bold mb-1 hov_pointer fs-18 lh-1">
                The Buah Bali Villas
              </p>
              <p className="fw-500 fs-14 text-dark mb-1">
                IDR 1.250.000.000
                <small className="fs-12"> / are</small>
              </p>
              <p className="fs-12 text-secondary card-text text-truncate text-capitalize">
                <i className="fal fa-map-marker-alt mr-1" /> Seminyak, Kuta,
                Bali 30123.
              </p>
              {/* ICON */}
              <span className="font-weight-normal pl-0 mr-1 badge">
                <i className="far fa-bed fa-lg mr-2" />
                <span className="pr-1">2</span>
              </span>
              <span className="font-weight-normal pl-0 mr-1 badge">
                <i className="far fa-bath fa-lg mr-2" />
                <span className="pr-1">2</span>
              </span>
              <span className="font-weight-normal pl-0 mr-1 badge">
                <i className="far fa-expand-arrows fa-lg mr-2" />
                <span className="pr-1">13 are</span>
              </span>
              <span className="font-weight-normal pl-0 mr-1 badge">
                <i className="far fa-home fa-lg mr-2" />
                <span className="pr-1">1300 m²</span>
              </span>
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
        :global(.shadow-card) {
          box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px !important;
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

        .bottom-status {
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
        .bottom-status > .btn {
          padding: 3px 8px;
          margin-right: 5px;
          font-size: 11px;
          background: #021927;
          border-radius: 50px;
          color: white;
          text-transform: capitalize;
          cursor: pointer;
        }
        .bottom-status > .btn.active {
          color: #021927;
          background: white;
        }
        .bottom-status::-webkit-scrollbar {
          display: none;
        }

        .bottom-left h5 {
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
