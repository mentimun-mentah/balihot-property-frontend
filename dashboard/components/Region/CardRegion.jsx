import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Link from "next/link";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Region = ({id, name, image, onDelete}) => {
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
            <Link href="manage-region/[id]" as={`manage-region/${id}`}>
              <Button variant="default" size="sm">
                Edit
              </Button>
            </Link>
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
