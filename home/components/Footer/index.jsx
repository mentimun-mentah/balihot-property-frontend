import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { BackdropModal } from "../Transition";
import Link from "next/link";
import SendEnquiry from "./SendEnquiry";

const Footer = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const showModalHandler = () => {
    setModalShow(true);
    document.body.classList.add("modal-open");
  };

  const closeModalHandler = () => {
    document.body.classList.remove("modal-open");
    setModalShow(false);
  };

  return (
    <>
      <footer className="site-footer border-top">
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <img
                src="/static/images/balihot-property-logo-red.png"
                width="250"
              />
             <p className="text-justify mt-3 fs-14-s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                iverra tellus in. Sollicitudin ac orci phasellus egestas. Purus
                in mollis nunc sed. Sollicitudin ac orci phasellus egestas
                tellus rutrum tellus pellentesque. Interdum consectetur libero
                id faucibus nisl tincidunt eget.
              </p>
            </Col>
            <Col sm={12} md={4} className="pl-ft-50 pl-md-2 pl-xl-5 pr-md-2">
              <h6>Contact Us</h6>
                <ul className="footer-links mt-3 fs-14-s">
                  <li className="mb-2">
                    <i className="fal fa-map-marker-alt mr-2"></i> 432 Park Ave,
                    New York, NY 10022
                  </li>
                  <li className="mb-2">
                    <i className="fal fa-phone mr-2"></i> (844) 380-8603
                  </li>
                  <li id="send-enquiry-btn" className="hov_pointer underline w-fit-content" onClick={showModalHandler}>
                    <i className="fal fa-envelope mr-2"></i>{" "}
                    Send us an enquiry
                  </li>
                </ul>
              {/*
              <Form>
                <Form.Row>
                  <Form.Group as={Col} className="mb-2">
                    <Form.Control className="bg-light" size="sm" type="text" placeholder="Name" />
                  </Form.Group>
                  <Form.Group as={Col} className="mb-2">
                    <Form.Control className="bg-light" type="number" size="sm" placeholder="Phone Number" />
                  </Form.Group>
                </Form.Row>

                <Form.Group className="mb-2">
                  <Form.Control className="bg-light" type="email" size="sm" placeholder="Enter email" />
                </Form.Group>
                <Form.Group>
                  <Form.Control className="bg-light" as="textarea" rows="3" size="sm" placeholder="Write your message here" />
                </Form.Group>

              <Button className="mt-2 btn-red-hot" size="sm"  block>
                Send message
              </Button>
              </Form>
              */}
            </Col>
            <Col sm={12} md={2}>
              <h6>Quick Links</h6>
              <ul className="footer-links mt-3 fs-14-s">
                <Link href="/#about-us" as="/#about-us">
                  <li className="mb-2 hov_pointer">About Us</li>
                </Link>
                <li className="mb-2 hov_pointer" onClick={showModalHandler}>Contact Us</li>
                <Link href="/#property" as="/#property">
                  <li className="hov_pointer">Property</li>
                </Link>
              </ul>
            </Col>
          </Row>
          <hr />
        </Container>

        <Container>
          <Row>
            <Col xs={12} sm={6} md={8}>
              <p className="copyright-text">
                Copyright &copy; 2020 All Rights Reserved by{" "}
                <a href="#">BaliHotProperty</a>.
              </p>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>

      <AnimatePresence exitBeforeEnter>
        {modalShow ? (
          <motion.div
            className="modal"
            style={{ display: "block" }}
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "650px" }}>
              <div className="modal-content">
                <div className="bar top"></div>
                <div className="bar right delay1"></div>
                <div className="bar bottom delay2"></div>
                <div className="bar left"></div>
                <Modal.Header
                  className="border-0 pb-0 ml-auto"
                  closeButton
                  onClick={closeModalHandler}
                ></Modal.Header>
                <div className="col-md-10 mx-auto">
                  <Modal.Body>
                    <SendEnquiry closed={closeModalHandler} />
                  </Modal.Body>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalShow ? (
          <motion.div
            className="modal-backdrop fade show"
            initial="initial"
            animate="in"
            exit="out"
            transition={{
              duration: 0.2,
            }}
            variants={BackdropModal}
          ></motion.div>
        ) : null}
      </AnimatePresence>

      <style jsx>{`
        .site-footer {
          padding: 45px 15px 15px 15px;
          font-size: 15px;
          line-height: 24px;
          color: #222222;
        }
        .site-footer hr {
          border-top-color: #bbb;
          opacity: 0.5;
        }
        .site-footer hr.small {
          margin: 20px 0;
        }
        .site-footer h6 {
          color: black;
          font-size: 16px;
          text-transform: uppercase;
          margin-top: 5px;
          letter-spacing: 2px;
        }
        .site-footer a {
          color: #222222;
        }
        .site-footer a:hover {
          color: #3366cc;
          text-decoration: none;
        }
        .footer-links {
          padding-left: 0;
          list-style: none;
        }
        .footer-links li {
          display: block;
        }
        .footer-links a {
          color: #222222;
        }
        .footer-links a:active,
        .footer-links a:focus,
        .footer-links a:hover {
          color: #3366cc;
          text-decoration: none;
        }
        .footer-links.inline li {
          display: inline-block;
        }
        .site-footer .social-icons {
          text-align: right;
        }
        .site-footer .social-icons a {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin-left: 6px;
          margin-right: 0;
          border-radius: 100%;
          background-color: #551a8b;
        }
        .copyright-text {
          margin: 0;
        }
        @media (max-width: 991px) {
          .site-footer [class^="col-"] {
            margin-bottom: 30px;
          }
        }
        @media (max-width: 767px) {
          .site-footer {
            padding-bottom: 0;
          }
          .site-footer .copyright-text,
          .site-footer .social-icons {
            text-align: center;
          }
        }
        .social-icons {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }
        .social-icons li {
          display: inline-block;
          margin-bottom: 4px;
        }
        .social-icons li.title {
          margin-right: 15px;
          text-transform: uppercase;
          color: #96a2b2;
          font-weight: 700;
          font-size: 13px;
        }
        .social-icons a {
          background-color: #eceeef;
          color: white;
          font-size: 16px;
          display: inline-block;
          line-height: 44px;
          width: 44px;
          height: 44px;
          text-align: center;
          margin-right: 8px;
          border-radius: 100%;
          -webkit-transition: all 0.2s linear;
          -o-transition: all 0.2s linear;
          transition: all 0.2s linear;
        }
        :global(.social-icons a:active, .social-icons a:focus, .social-icons
            a:hover) {
          color: #fff !important;
          background-color: #29aafe !important;
        }
        .social-icons.size-sm a {
          line-height: 34px;
          height: 34px;
          width: 34px;
          font-size: 14px;
        }
        @media (max-width: 767px) {
          .social-icons li.title {
            display: block;
            margin-right: 0;
            font-weight: 600;
          }
          :global(.pl-ft-50) {
            padding-left: 15px;
          }
        }
        @media (min-width: 768px) {
          :global(.pl-ft-50) {
            padding-left: 80px;
          }
        }

        .cool-link {
          display: inline-block;
          color: #000;
          text-decoration: none;
        }

      .cool-link::after {
        content: '';
        display: block;
        width: 0;
        height: 2px;
        background: #000;
        transition: width .3s;
      }

      .cool-link:hover::after {
        width: 100%;
        //transition: width .3s;
      }

      :global(.w-fit-content){
        width: fit-content;
      }

      .underline {
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: inset 0px -3px #ff395b;
        transition: box-shadow 250ms ease;
      }
      .underline:hover {
        box-shadow: inset 0px -30px #ff408c3b;
      }

      `}</style>
    </>
  );
};

export default Footer;
