import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import CardNews from "../../components/Card/CardNews"
import CardNewsHorizontal from "../../components/Card/CardNewsHorizontal"
import CardNewsHorizontalSmall from "../../components/Card/CardNewsHorizontalSmall"

const NewsLetter = () => {
  return(
    <>
      <Jumbotron fluid className="mt-4k2rem img-news">
        <Container>
          <h1 className="text-white font-weight-bold">Property Market News</h1>
          <p className="text-white">
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </p>
        </Container>
      </Jumbotron>

      <Container>
        <h3 className="mt-5">Top News</h3>
        <hr/>
        <Row>
          {[...Array(3)].map((_, i) => (
            <Col md={6} lg={4} xl={4} key={i}>
              <CardNews />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col xl={8} className="order-12 order-md-12 order-lg-12 order-xl-1">
            <Row className="mt-2">
              {[...Array(4)].map((_, topNews) => (
              <Col md={6} lg={12} xl={12} key={topNews} className="pl-2">
                <CardNewsHorizontal />
              </Col>
              ))}
            </Row>
          </Col>
          <Col xl={4} className="order-md-1 order-lg-1 order-xl-1 mb-4">
            <div className="hr-news mb-2"></div>
            <h5 className="text-uppercase">Most Popular</h5>
            <ul className="list-unstyled mt-4">
            {[...Array(3)].map((_,latest) => (
              <CardNewsHorizontalSmall key={latest} />
            ))}
            </ul>
          </Col>
        </Row>
        <div className="text-center">
          <Button className="btn-red-hot mt-4 mb-5">
            More News
          </Button>
        </div>
      </Container>
      <style jsx>{`
        :global(.img-news) {
          background-image: url("https://res.akamaized.net/domain/image/upload/v1587624364/hero-news_ut5xmi.jpg")
        }
        :global(.img-news-horizontal){
          height: 100%;
          object-fit: cover;
        }
        :global(.hr-news) {
          width: 50px;
          border-top: 3px solid rgba(252, 56, 74, 1);
        }
      `}</style>
    </>
  )
}

export default NewsLetter
