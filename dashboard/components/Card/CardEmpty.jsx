import Card from 'react-bootstrap/Card'

const CardEmpty = ({ cardClass, img, imgClass, bodyClass, titleClass, title }) => (
  <Card className={cardClass}>
    <Card.Img variant="top" src={img} className={imgClass} />
    <Card.Body className={bodyClass}>
      <Card.Title className={titleClass}>
        {title}
      </Card.Title>
    </Card.Body>
  </Card>
)

export default CardEmpty
