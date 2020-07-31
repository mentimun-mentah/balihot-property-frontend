import { useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import MyAccount from "./Account";
import Shortlist from "./Shortlist";

const PROFILE = "/static/images/teams/Asthi Smith.jpg";
const Account = () => {
  const [select, setSelect] = useState("account");
  const selectHandler = (e) => setSelect(e);
  return (
    <>
      <Container className="mt-4k2rem bg-light" fluid>
        <Container>
          <Row>
            <Nav
              defaultActiveKey={select}
              className="flex-column col-md-2 d-md-none d-lg-block sidebar pl-0"
              onSelect={selectHandler}
            >
              <div className="sidebar-sticky mt-5">
                <Row className="no-gutters border-bottom">
                  <Col md={4}>
                    <img src={PROFILE} width="50" height="50" className="rounded-circle avatar" />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="px-0 text-truncate">
                      <Card.Title className="h6">Albert Davis</Card.Title>
                    </Card.Body>
                  </Col>
                </Row>
                <Nav.Link eventKey="account">
                  <span>
                    <i className="far fa-user-circle mr-2" />
                    My Account
                  </span>
                </Nav.Link>
                <Nav.Link eventKey="shortlist">
                  <span>
                    <i className="far fa-heart mr-2" />
                    Shortlist
                  </span>
                </Nav.Link>
              </div>
            </Nav>

            <AnimatePresence exitBeforeEnter key={select}>
              {select === "account" && <MyAccount />}
              {select === "shortlist" && <Shortlist />}
            </AnimatePresence>
          </Row>
        </Container>
      </Container>
      <style jsx>{`
        .avatar {
          vertical-align: middle;
          border-radius: 50%;
          border: 2px solid white;
          object-fit: cover;
          object-position: 0px 0px;
        }
        :global(.custom-place::placeholder) {
          font-size: 14px !important;
        }
        :global(input:-internal-autofill-selected) {
          -webkit-appearance: menulist-button;
          background-color: #fff !important;
          background-image: none !important;
          color: -internal-light-dark-color(black, white) !important;
        }
        .btn-file {
          position: relative;
          overflow: hidden;
          font-size: 12px !important;
        }
        .btn-file:hover {
          cursor: pointer;
        }
        .btn-file input[type="file"] {
          left: 0;
          opacity: 0;
          outline: none;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: inherit;
          display: block;
        }
        .bg-upload {
          background-color: whitesmoke;
          color: #4a4a4a;
        }
        :global(.sidebar-sticky > a.nav-link.active) {
          color: #ff385c !important;
          font-weight: 600;
        }
        :global(.sidebar-sticky > a.nav-link) {
          color: #343a40 !important;
        }
      `}</style>
    </>
  );
};

export default Account;
