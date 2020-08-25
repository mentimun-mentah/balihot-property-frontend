import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Link from "next/link";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CardNews = () => {
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
            src={`http://192.168.18.11:5001/static/regions/43f95f7f997c49faab17cd118518ed06.jpeg`}
          />
          <Card.Body>
            <Card.Title className="text-left mb-0 fs-18">Newss</Card.Title>
            <Card.Text className="text-left fs-14 truncate-3">
              Airbnb’s Global Head of Hosting Catherine Powell shares details about the global ban on parties and updates about Superhost status, Community Support and Enhanced Cleaning.
            </Card.Text>
              <Button variant="default" size="sm">
                Edit
              </Button>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </Card.Body>
        </Card>
      </motion.div>

      <style>{`
        .truncate-3 {
          -webkit-line-clamp: 3;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
};

export default CardNews;
