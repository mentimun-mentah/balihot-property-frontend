import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardNews = ({ id, slug, title, description, thumbnail, onDelete }) => {
  let plainText = description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Card className="text-center hov_none">
          <Card.Img
            className="img-fit h-250"
            src={`${process.env.API_URL}/static/newsletters/${slug}/${thumbnail}`}
          />
          <Card.Body>
            <Link href="/news/[slug]" as={`/news/${slug}`}>
              <a className="text-decoration-none">
                <Card.Title className="text-left mb-0 truncate-2 fs-18">{title}</Card.Title>
              </a>
            </Link>
            <Card.Text className="text-left fs-14 truncate-3">
              {finalText}
            </Card.Text>

            <Link href="manage-newsletter/[id]" as={`manage-newsletter/${id}`}>
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

      <style>{`
        .truncate-2 {
          -webkit-line-clamp: 2;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
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
