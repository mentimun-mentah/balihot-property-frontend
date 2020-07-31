import { Container, Row, Col } from "react-bootstrap";
import CardHorizontal from "../components/NewCard/CardHorizontal";
import CardProperty from "../components/NewCard/CardProperty";

const TestCard = () => {
  return (
    <>
      <Container>
        <h2 className="m-t-100 ">Land for Sale</h2>
        <Row className=" m-b-50">
          <Col lg={4} md={4}>
            <CardProperty statusCard="free-hold" type="land" propType="sale" />
          </Col>
          <Col lg={4} md={4}>
            <CardProperty statusCard="lease-hold" type="land" propType="sale" />
          </Col>
        </Row>
        <h2>Villa for Sale & Rent</h2>
        <Row className=" m-b-200">
          <Col lg={4} md={4}>
            <CardProperty type="villa" propType="sale-rent" />
          </Col>
          <Col lg={4} md={4}>
            <CardProperty statusCard="free-hold" type="villa" propType="sale" />
          </Col>
          <Col lg={4} md={4}>
            <CardProperty statusCard="free-hold" type="villa" propType="rent" />
          </Col>
        </Row>

      </Container>

      <Row className="w-100vw pl-5">
        <Col lg={7} md={7}>
          <Container>
            <Row>
              <Col lg={12} md={12}>
                <CardHorizontal
                  statusCard="free-hold"
                  type="land"
                  propType="sale"
                />
              </Col>
              <Col lg={12} md={12}>
                <CardHorizontal
                  statusCard="lease-hold"
                  type="land"
                  propType="sale"
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={5} md={5}>
          Land For Sale
        </Col>
        <Col lg={7} md={7}>
          <Container>
            <Row>
              <Col lg={12} md={12}>
                <CardHorizontal type="villa" propType="sale-rent" />
              </Col>
              <Col lg={12} md={12}>
                <CardHorizontal
                  statusCard="free-hold"
                  type="villa"
                  propType="sale"
                />
              </Col>
              <Col lg={12} md={12}>
                <CardHorizontal
                  statusCard="free-hold"
                  type="villa"
                  propType="rent"
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={5} md={5}>
          Villa For Sale & Rent
        </Col>
      </Row>
    </>
  );
};

export default TestCard;
