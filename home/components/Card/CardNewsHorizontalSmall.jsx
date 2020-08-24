import Media from 'react-bootstrap/Media'
import Link from 'next/link'

const CardNewsHorizontalSmall = () => {
  return(
    <>
      <Media as="li" className="border shadow mb-2">
        <Media.Body className="p-4">
          <Link href="/news/[slug]" as={`/news/test`}>
            <a className="text-reset">
              <h5 className="card-title fs-12 mb-0 mt-2-s">
                Spike in tenants losing rental bond amid coronavirus pandemic
              </h5>
            </a>
          </Link>
          <p className="card-text"><small className="text-muted">August, 18 2020</small></p>
        </Media.Body>
        <img
          width={64}
          height={64}
          className="align-self-center mr-3 img-fit"
          src="https://news.airbnb.com/wp-content/uploads/sites/4/2020/07/PJM013418Q412-20181007_Airbnb_Mallorca_DRE_3613_Featured.jpg?w=3003"
          alt="Generic placeholder"
        />
      </Media>
    </>
  )
}

export default CardNewsHorizontalSmall
