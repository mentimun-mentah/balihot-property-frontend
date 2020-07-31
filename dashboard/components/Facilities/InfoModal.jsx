import Modal from "react-bootstrap/Modal";

const InfoModal = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>How to add Fontawesome Icon </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>
            Go to{" "}
            <a target="_blank" href="https://fontawesome.com/icons?d=gallery">
              Fontawesome
            </a>{" "}
            and search the icon.
          </li>
          <li>Click the icon</li>
          <li>
            Copy text inside the html, examples: "<b>fal fa-bed-alt</b>"
          </li>
        </ol>
      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;
