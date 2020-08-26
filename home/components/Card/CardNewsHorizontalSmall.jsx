import Media from 'react-bootstrap/Media'
import moment from "moment";
import Link from 'next/link'
import NoSSR from "react-no-ssr";

const CardNewsHorizontalSmall = ({ slug, title, thumbnail, created_at }) => {
  return(
    <>
      <Media as="li" className="border shadow mb-2">
        <Media.Body className="p-4">
          <Link href="/news/[slug]" as={`/news/${slug}`}>
            <a className="text-reset">
              <h5 className="card-title fs-12 mb-0 mt-2-s truncate-2">{title}</h5>
            </a>
          </Link>
          <p className="card-text">
            <small className="text-muted">
              <NoSSR>
                {moment(created_at).format("DD MMMM YYYY")}
              </NoSSR>
            </small>
          </p>
        </Media.Body>
        <img
          width={64}
          height={64}
          className="align-self-center mr-3 img-fit"
          src={`${process.env.API_URL}/static/newsletters/${slug}/${thumbnail}`} 
          alt={title}
        />
      </Media>
    </>
  )
}

export default CardNewsHorizontalSmall
