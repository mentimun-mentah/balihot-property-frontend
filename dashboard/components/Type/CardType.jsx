import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CardType = ({name, edit, onDelete}) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={Fade}
      >
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="mb-2 fs-16 font-weight-bolder">
              {name}
            </Card.Title>
            <Button
              variant="default"
              size="sm"
              onClick={edit}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={onDelete}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  )
}
export default CardType
