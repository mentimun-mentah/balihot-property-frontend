import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Router from "next/router";

import cookie from "nookies";
import axios from "../../lib/axios";
import * as actions from "../../store/actions";

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl={12} lg={12} mb={12}>
          <Card className="hov_none">
            <Card.Body>
              <h3 className="mb-0">Dashboard Admin</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
