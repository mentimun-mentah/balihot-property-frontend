import { Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import axios from "../../lib/axios";
import parse from "html-react-parser";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import * as actions from "../../store/actions";
import ShareModal from "../../components/Card/ShareModal";
import CardRegionHorizontal from "../../components/Card/CardRegionHorizontal";

const ShareModalMemo = React.memo(ShareModal);

const DetailRegion = () => {
  const [showModal, setShowModal] = useState(false);
  const region = useSelector(state => state.region.slug);
  const shareLink = `${process.env.BASE_URL}/region/${region.slug}`;

  console.error = (function(_error) {
    return function(message) {
      if (
        typeof message !== "string" ||
        message.indexOf("component is `contentEditable`") === -1
      ) {
        _error.apply(console, arguments);
      }
    };
  })(console.error);

  const searchHandler = () => {
    Router.push({
      pathname: "/all-properties",
      query: {
        region_id: region.id
      }
    });
  };

  return (
    <>
      <Container className="mt-6 mb-5">
        <h1 className="fs-24-s">{region.name}</h1>
        <div className="news-information font-weight-lighter fs-14 my-2">
          <span className="mr-1 hov_underline" onClick={searchHandler}>
            {region.listing} Listing
          </span>
          {" "}&#8226;{" "}
          <span
            className="share-news ml-1 hov_underline ml-1"
            onClick={() => setShowModal(true)}
          >
            <a>
              <i className="fal fa-share-square" /> 
                <span className="ml-1">Share</span>
            </a>
          </span>
        </div>
        <hr className="mt-0" />

        <Row>
          <Col lg={8} xl={8}>
            <div className="property-content">
              <img
                src={`${process.env.API_URL}/static/regions/${region.image}`}
                className="img-fit img-thumbnail img-detail-region mb-4"
              />
              {parse(region.description)}
            </div>
          </Col>

          <Col lg={4} xl={4}>
            <Card className="m-t-20-s m-t-20-m m-t-0-t property-inquiry">
              <Card.Body className="pb-0">
                <Card.Title className="fs-18-s mb-3">Another Region</Card.Title>
                <hr />
              </Card.Body>
              <Card.Body className="py-0 overflow-auto max-h-400px">
                <Row>
                  {region &&
                    region.another_region.length > 0 &&
                    region.another_region.map(data => (
                      <Col lg={12} xl={12} key={data.id}>
                        <CardRegionHorizontal
                          slug={data.slug}
                          name={data.name}
                          image={data.image}
                          listing={data.listing}
                          description={data.description}
                        />
                      </Col>
                    ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

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
        <ShareModalMemo link={shareLink} />
      </Modal>

      <style jsx>{`
        :global(.img-detail-region) {
          height: 516px !important;
          width: 100% !important;
        }
        :global(.hov_underline:hover) {
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

DetailRegion.getInitialProps = async ctx => {
  const { slug } = ctx.query;
  try {
    const res = await axios.get(`/region/${slug}`);
    ctx.store.dispatch(actions.slugRegionSuccess(res.data));
  } catch {}
};

export default DetailRegion;
