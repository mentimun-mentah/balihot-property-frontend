import moment from "moment";
import Link from 'next/link'
import NoSSR from "react-no-ssr";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { motion } from "framer-motion";
import { Fade } from "../Transition";

const CardNewsHorizontal = ({ slug, title, description, thumbnail, created_at }) => {
  let plainText = description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");
  return(
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
      <Card className="border-left-0 border-right-0 rounded-0 border-bottom-0 shadow-none mb-3">
        <Row>
          <Col lg={6} xl={8} className="order-12 order-md-12 order-lg-1 order-xl-1">
            <Card.Body className="mt-2-s pl-0-s px-0">
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
            </Card.Body>
          </Col>

          <Col lg={6} xl={4} className="order-1 order-md-1 order-lg-12 order-xl-12">
            <img 
              src={`${process.env.API_URL}/static/newsletters/${slug}/${thumbnail}`} 
              className="card-img img-news-horizontal rounded-0" 
              alt={title}
            />
          </Col>
        </Row>
      </Card>
      </motion.div>
    </>
  )
}

export default CardNewsHorizontal
