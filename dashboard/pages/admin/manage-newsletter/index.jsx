import { withAuth } from "../../../hoc/withAuth"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import CardNews from "../../../components/Card/CardNews";
const CardNewsMemo = React.memo(CardNews);

const ManageNews = () => {
  return(
    <>
      <Container fluid>
        <Row>
          {[...Array(10)].map((_, i) => (
            <Col xl={3} lg={4} md={4} sm={6} xs={12} key={i} >
              <CardNewsMemo />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default withAuth(ManageNews)
