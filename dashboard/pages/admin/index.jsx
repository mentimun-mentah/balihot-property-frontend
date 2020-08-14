import { withAuth } from "../../hoc/withAuth"
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

      <Row>
        <Col xl={8}>
          <Card className="shadow">
            <div className="card-header">
              <Row>
                <Col>
                  <h3 className="mb-0">Top properties</h3>
                </Col>
              </Row>
            </div>
    
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Property name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Villa test 1</th>
                    <td>2000</td>
                    <td>340</td>
                  </tr>
                  <tr>
                    <th>Land test 1</th>
                    <td>2200</td>
                    <td>304</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="mb-xl-0" xl="8">
          <Card className="shadow">
            <Card.Header className="bg-transparent">
              <Row className="align-items-center">
                <Col>
                  <h6 className="text-uppercase ls-1 mb-1">Overview</h6>
                  <h2 className="mb-0">Total Order</h2>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="chart">
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <Card.Header className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                  <h2 className="mb-0">Monthly orders</h2>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="chart">
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default withAuth(App);
