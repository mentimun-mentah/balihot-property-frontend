import { Card } from "react-bootstrap";

const Teams = ({ name, image, title, phone }) => {
  return (
    <>
      <Card className="hov_pointer shadow-none">
        <Card.Img className="img-fit ag-image size-teams" variant="top" src={`${process.env.API_URL}/static/teams/${image}`} />
        <Card.Body>
          <Card.Title className="h5 fs-14-s text-dark text-decoration-none text-truncate">{name}</Card.Title>
          <Card.Subtitle className="mb-2 mt-1 text-secondary fs-12 text-truncate">
            {title}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-muted bg-transparent mx-3 pl-0 pr-1">
          <a className="text-decoration-none fs-14 fs-12-s text-purple text-truncate">
            <i className="far fa-phone-plus mr-1"></i>
            <strong>+62 {phone}</strong>
          </a>
        </Card.Footer>
      </Card>
      <style jsx>{`
        .bg-white {
          background-color: white;
        }
        .text-purple {
          color: #551a8b;
        }
        :global(.size-teams){
          width: auto !important;
          height: 250px !important;
        }
      `}</style>
    </>
  );
};

export default React.memo(Teams);
