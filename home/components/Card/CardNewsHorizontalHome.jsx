import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import NoSSR from 'react-no-ssr'
import moment from 'moment'

const CardNewsHorizontalHome = ({ order, slug, title, thumbnail, description, created_at  }) => {
  let plainText = description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

  let reorder = order % 2 == 0 
  let finalresult1 = ''
  let finalresult2 = ''

  if(!reorder){
    finalresult1 = 'last'
    finalresult2 = 'first'
  }else{
    finalresult1 = 'first'
    finalresult2 = 'last'
  }

  return(
    <Card className="mb-3 border-0 rounded-0">
      <Row noGutters>
        <Col className={`col-6 order-12 order-md-12 order-lg-${finalresult1} order-xl-${finalresult1}`}>
          <Card.Body className="mt-2-s">
            <Link href="/news/[slug]" as={`/news/${slug}`}>
              <a className="text-reset">
                <h5 className="card-title mb-2 truncate-2">{title}</h5>
              </a>
            </Link>
            <p className="card-text mb-2">
              <small className="text-muted">
                <NoSSR>
                  {moment(created_at).format("DD MMMM YYYY")}
                </NoSSR>
              </small>
            </p>
            <p className="card-text fs-14 text-justify font-weight-light truncate-3">{finalText}</p>
            <Link href="/news/[slug]" as={`/news/${slug}`}>
              <Button className="rounded-0 btn-outline-bhp">Read More</Button>
            </Link>
          </Card.Body>
        </Col>
        <Col className={`col-6 order-1 order-md-1 order-lg-${finalresult2} order-xl-${finalresult2}`}>
          <img 
            src={`${process.env.API_URL}/static/newsletters/${slug}/${thumbnail}`} 
            className="card-img img-fit rounded-0" 
            width="100%" height="245px"
            alt={title}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default CardNewsHorizontalHome
