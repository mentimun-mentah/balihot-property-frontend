import Card from 'react-bootstrap/Card'
import Link from 'next/link'

const CardNews = () => {
  return(
    <>
      <Card className="border-0 shadow-none">
        <Card.Img variant="top" className="rounded img-fit" src="https://news.airbnb.com/wp-content/uploads/sites/4/2020/07/PJM013418Q412-20181007_Airbnb_Mallorca_DRE_3613_Featured.jpg?w=3003" height="220" />
        <Card.Body className="px-0">
          <Link href="/news/[slug]" as={`/news/test`}>
            <a className="text-reset">
            <Card.Title className="text-dark">Travel the World Beyond Your Doorstep: 15 Ways Airbnb Can Transport You</Card.Title>
            </a>
          </Link>
          <p className="card-text mt-2 mb-2"><small className="text-muted">August, 18 2020</small></p>

          <Card.Text className="text-justify font-weight-light">
          While globetrotting plans might be on hold, travelers can still experience the world with stays
          that transport you to our most missed destinations or right at home through Online Experiences.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardNews
