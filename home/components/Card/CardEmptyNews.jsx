import Card from 'react-bootstrap/Card'
import { motion } from "framer-motion";
import { Fade } from "../Transition";

const CardEmptyNews = ({ cardClass, cardBodyClass, titleClass, img, imgClass, title }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
    <Card className={cardClass}>
      <Card.Img variant="top" src={img} className={imgClass} />
      <Card.Body className={cardBodyClass}>
        <Card.Title className={titleClass}>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  </motion.div>
)

export default CardEmptyNews
