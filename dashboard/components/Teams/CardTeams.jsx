import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Team = ({name, image, title, phone, edit, onDelete}) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={Fade}
      >
        <Card className="text-center">
          <Card.Img
            variant="top"
            className="img-fit size-teams"
            src={`${process.env.API_URL}/static/teams/${image}`}
          />
          <Card.Body>
            <Card.Title className="fs-16 mb-0">{name}</Card.Title>
            <p className="fs-12">{title}</p>
            <Button variant="default" size="sm" onClick={edit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          </Card.Body>
          <Card.Footer className="text-primary">
            <i className="far fa-phone-plus mr-1" /> <strong>+62 {phone}</strong>
          </Card.Footer>
        </Card>
      </motion.div>
      <style jsx>{`
        :global(.size-teams){
          width: auto !important;
          height: 400px !important;
        }
        @media (min-width: 1024px) {
          :global(.size-teams){
            height: 300px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Team;

