import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import NoSSR from 'react-no-ssr'
import moment from 'moment'

const CardNews = ({ slug, title, thumbnail, description, created_at }) => {
  let plainText = description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

  return(
    <>
      <Card className="border-0 shadow-none">
        <Card.Img 
          variant="top" 
          className="rounded img-fit" 
          src={`${process.env.API_URL}/static/newsletters/${slug}/${thumbnail}`} 
          height="220" 
          alt={title}
        />
        <Card.Body className="px-0">
          <Link href="/news/[slug]" as={`/news/${slug}`}>
            <a className="text-reset">
              <Card.Title className="text-dark truncate-2">{title}</Card.Title>
            </a>
          </Link>
          <p className="card-text mt-2 mb-2">
            <small className="text-muted">
              <NoSSR>
                {moment(created_at).format("DD MMMM YYYY")}
              </NoSSR>
            </small>
          </p>

          <Card.Text className="text-justify font-weight-light truncate-3">{finalText}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardNews
