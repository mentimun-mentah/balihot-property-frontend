import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Region = ({name, image, edit, onDelete}) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={Fade}
      >
        <Card className="text-center hov_none">
          <Card.Img className="img-fit h-250"
            src={`${process.env.API_URL}/static/regions/${image}`}
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Button variant="default" size="sm" onClick={edit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  );
};

export default Region;

