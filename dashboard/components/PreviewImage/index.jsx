import Modal from "react-bootstrap/Modal";

const PreviewImage = ({ show, hide, title, image }) => (
  <Modal show={show} onHide={hide} centered>
    <Modal.Header className="border-bottom" closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <img alt="example" style={{ width: "100%" }} src={image} />
    </Modal.Body>
  </Modal>
);

export default PreviewImage;
