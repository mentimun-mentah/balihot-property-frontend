import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'

const CardNewsHorizontal = () => {
  return(
    <>
      <Card className="border-left-0 border-right-0 border-bottom-0 shadow-none mb-3">
        <Row>
          <Col lg={6} xl={8} className="order-12 order-md-12 order-lg-1 order-xl-1">
            <Card.Body className="mt-2-s pl-0-s px-0">
              <Link href="/news/[slug]" as={`/news/test`}>
                <a className="text-reset">
                  <h5 className="card-title mb-2">Spike in tenants losing rental bond amid coronavirus pandemic</h5>
                </a>
              </Link>
              <p className="card-text mb-2"><small className="text-muted">August, 18 2020</small></p>
              <p className="card-text fs-14 text-justify font-weight-light">Almost one in five rental households across NSW are losing their entire bond, as the number of tenants vacating properties continues to rise amid the coronavirus pandemic.</p>
            </Card.Body>
          </Col>

          <Col lg={6} xl={4} className="order-1 order-md-1 order-lg-12 order-xl-12">
            <a href="#">
            <img src="https://news.airbnb.com/wp-content/uploads/sites/4/2020/07/PJM013418Q412-20181007_Airbnb_Mallorca_DRE_3613_Featured.jpg?w=3003" className="card-img img-news-horizontal rounded-0" />
            </a>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default CardNewsHorizontal
