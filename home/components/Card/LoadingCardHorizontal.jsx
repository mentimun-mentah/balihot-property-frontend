import { Skeleton } from "antd";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoadingCard = () => {
  return (
    <>
      <Card className="mb-3 border-0 shadow-card bor-rad-left-10">
        <Row noGutters>
          <Col xl={5} lg={5} md={5} sm={5} xs={5}>
            <Skeleton.Avatar
              active
              shape="square"
              style={{
                height: "230px",
                width: "100%",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
              className="w-100"
            />
          </Col>
          <Col xl={7} lg={7} md={7} sm={7} xs={7}>
            <Card.Body className="text-dark">
              <Skeleton active paragraph={{ rows: 4 }} />
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default LoadingCard;
