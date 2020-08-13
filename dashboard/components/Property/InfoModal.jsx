import Modal from "react-bootstrap/Modal";

const InfoModal = ({ show, close }) => {
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>How to add Fontawesome Icon </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>
              On a computer, go to the YouTube video you want to embed.
            </li>
            <li>Under the video, click <strong>SHARE <i className="fas fa-share" /></strong>.</li>
            <li>Click <strong>Embed</strong>.</li>
            <li>From the box that appears, copy the link inside src quotes.</li>
            <li className="text-break">
              &lt;iframe width="560" height="315" src="<mark>https://www.youtube.com/embed/bS9eXS</mark>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/&gt;
            </li>
            <li>Copy the highlighted text.</li>
          </ol>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        :global(.text-break){
          word-break: break-all
        }
      `}</style>
    </>
  );
};

export default InfoModal;
