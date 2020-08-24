import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'

const CardRegionHorizontal = ({ slug, name, image, listing, description }) => {
  let plainText = description.replace(/<[^>]+>/g, '');

  return(
    <>
      <Link href="/region/[slug]" as={`/region/${slug}`}>
        <a className="text-decoration-none">
          <Card className="border-0 shadow-none mb-3 hov_pointer region-card-hor">
            <Row>
              <Col className="col-4">
                <img
                  alt={name}
                  src={`${process.env.API_URL}/static/regions/${image}`}
                  className="card-img img-fit"
                  height="60"
                />
              </Col>
              <Col className="col-8 pl-0">
                <Card.Body className="p-0">
                  <h5 className="card-title fs-12 mb-0 mt-2-s">
                    {name}
                  </h5>
                  <p className="card-text mb-0">
                    <small className="text-muted">{listing} listing</small>
                  </p>
                  <p className="card-text text-truncate text-dark fs-12">
                    {plainText}
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </a>
      </Link>
      <style jsx>{`
        :global(.region-card-hor:hover){
          box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
        }
      `}</style>
    </>
  )
}

export default CardRegionHorizontal
