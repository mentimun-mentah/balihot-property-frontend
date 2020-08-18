import { withAuth } from "../../hoc/withAuth"
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Chart from "chart.js";
import cookie from "nookies";
import Link from "next/link";

import * as actions from "../../store/actions";
import axios from "../../lib/axios";
import TotalVisitor from "../../components/Dashboard/TotalVisitor";

import { chartOptions, parseOptions } from "../../components/Chart/chart-pro";

const App = () => {
  const propertyVisitorData = useSelector(state => state.dashboard.propertyVisitor)
  const propertyLovedData = useSelector(state => state.dashboard.propertyLoved)

  parseOptions(Chart, chartOptions());
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
        <Col className="mb-xl-0">
          <Card className="shadow">
            <Card.Header className="bg-transparent">
              <Row className="align-items-center">
                <Col>
                  <h6 className="text-uppercase ls-1 mb-1">Overview</h6>
                  <h2 className="mb-0">Total Visitors</h2>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="chart">
                <TotalVisitor />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={7}>
          <Card className="shadow">
            <div className="card-header">
              <Row>
                <Col>
                  <h3 className="mb-0">Most visited</h3>
                </Col>
              </Row>
            </div>
    
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Property name</th>
                    <th scope="col">Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyVisitorData && propertyVisitorData.map((data, i) => (
                    <tr key={i}>
                      <th>
                        <Link href="/property/[slug]" as={`/property/${data.slug}`}>
                          <a className="text-dark"> {data.name} </a>
                        </Link>
                      </th>
                      <td>{data.visitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>

        <Col xl={5}>
          <Card className="shadow">
            <div className="card-header">
              <Row>
                <Col>
                  <h3 className="mb-0">Most loved</h3>
                </Col>
              </Row>
            </div>
    
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Property name</th>
                    <th scope="col">Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyLovedData && propertyLovedData.map((data, i) => (
                    <tr key={i}>
                      <th>
                        <Link href="/property/[slug]" as={`/property/${data.slug}`}>
                          <a className="text-dark"> {data.name} </a>
                        </Link>
                      </th>
                      <td>{data.loved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

App.getInitialProps = async ctx => {
  try{
    const { access_token } = cookie.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    let resTotalVisitor = await axios.get('/dashboard/total-visitor', headerCfg);
    ctx.store.dispatch(actions.getTotalVisitorSuccess(resTotalVisitor.data)); 
    let resPropertyVisitor = await axios.get('/dashboard/visitor-properties', headerCfg);
    ctx.store.dispatch(actions.getPropertyVisitorSuccess(resPropertyVisitor.data)); 
    let resPropertyLoved = await axios.get('/dashboard/loved-properties', headerCfg);
    ctx.store.dispatch(actions.getPropertyLovedSuccess(resPropertyLoved.data)); 
  } catch {}
}

export default withAuth(App);
