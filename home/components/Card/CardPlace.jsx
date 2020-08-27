import { useState } from "react";
import Card from "react-bootstrap/Card";
import Router from "next/router";
import Link from "next/link";
import { Tooltip } from "antd";

const CardPlace = ({ id, slug, name, image, listing }) => {
  const [isHover, setIsHover] = useState(false);
  const searchHandler = () => {
    Router.push({
      pathname: "/all-properties",
      query: {
        region_id: id
      }
    });
  };

  return (
    <>
      <div className="mt-4 mb-2" className="popular-place">
        <Card
          className="text-white shadow-none"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Card.Img
            src={`${process.env.API_URL}/static/regions/${image}`}
            alt="Card image"
            className="img-fit"
            width="300"
            height="400"
          />
          <Card.ImgOverlay>
            <Card.Body>
              <h4 className="text-capitalize text-white fs-18-s">{name}</h4>
              <h6 className="text-white fs-14-s">{listing} Listing</h6>
              <Link href="/region/[slug]" as={`/region/${slug}`}>
                <Tooltip
                  overlayClassName="region-area-information"
                  placement="bottomRight"
                  title="Area information"
                  visible={isHover}
                >
                  <i className={`fas fa-info infoarea-btn`} />
                </Tooltip>
              </Link>
              <i
                className="far fa-angle-right angle-btn"
                onClick={searchHandler}
              />
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
      </div>
      <style jsx>{`
        :global(.popular-place .card .card-body:before) {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.02),
            rgba(44, 44, 47, 47)
          );
          z-index: -1;
        }
        :global(.popular-place .card .card-body) {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          padding: 0 24px 22px 24px;
        }
        :global(.popular-place .card .card-body .infoarea-btn) {
          position: absolute;
          right: 12px;
          bottom: 368px;
          border: 1px solid #e0e1e6;
          padding: 5px 5px;
          color: #fff;
          border-radius: 100%;
          height: 20px;
          width: 20px;
          font-size: 8px;
          text-align: center;
          transition: all 0.1s linear !important;
        }
        :global(.popular-place .card .infoarea-btn:hover, .popular-cities
            .card:focus
            .infoarea-btn) {
          background: #fff;
          color: black;
          border-color: transparent;
        }
        :global(.popular-place .card .card-body .angle-btn) {
          position: absolute;
          right: 24px;
          bottom: 31px;
          border: 1px solid #e0e1e6;
          padding: 12px 12px;
          color: #fff;
          border-radius: 100%;
          height: 40px;
          width: 40px;
          font-size: 14px;
          text-align: center;
          transition: all 0.1s linear !important;
        }
        :global(.popular-place .card .angle-btn:hover, .popular-cities
            .card:focus
            .angle-btn) {
          background: #fff;
          color: black;
          border-color: transparent;
        }
        :global(.popular-place .card .card-body:hover) {
          cursor: pointer;
          transition: all 0.1s linear !important;
        }
        :global(.ant-tooltip-placement-bottomRight .ant-tooltip-arrow){
          right: 2px;
        }
      `}</style>
    </>
  );
};

export default React.memo(CardPlace);
