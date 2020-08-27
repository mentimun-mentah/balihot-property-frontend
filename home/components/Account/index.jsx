import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import MyAccount from "./Account";
import Shortlist from "./Shortlist";

const Account = () => {
  const userData = useSelector(state => state.auth.data);
  const [select, setSelect] = useState("account");
  const selectHandler = e => { setSelect(e); }
  return (
    <>
      <Container className="mt-4k2rem bg-light" fluid>
        <Container fluid>
          <Row>
            <Nav
              defaultActiveKey={select}
              className="flex-column col-md-2 d-none d-lg-block sidebar pl-2"
              onSelect={selectHandler}
            >
              <div className="sidebar-sticky mt-5">
                <Row className="no-gutters border-bottom">
                  <Col md={4}>
                    <img
                      src={userData && `${process.env.API_URL}/static/avatars/${userData.avatar}`}
                      width="50"
                      height="50"
                      className="rounded-circle avatar"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body className="px-0 text-truncate">
                      <Card.Title className="h6 fs-13-pro p-l-2-pro text-truncate text-capitalize">
                        {userData && <>{userData.username}</>}
                      </Card.Title>
                    </Card.Body>
                  </Col>
                </Row>
                <Nav.Link eventKey="account" className="p-l-0-pro p-r-0-pro">
                  <span>
                    <i className="far fa-user-circle mr-2" />
                    My Account
                  </span>
                </Nav.Link>
                <Nav.Link eventKey="shortlist" className="p-l-0-pro p-r-0-pro">
                  <span>
                    <i className="far fa-heart mr-2" />
                    Shortlist
                  </span>
                </Nav.Link>
              </div>
            </Nav>

            <Row 
              className="fixed-bottom pt-2 pb-2 pl-4 pr-4 bg-white shadow-menu border-top d-lg-none justify-content-center"
              >
              <Nav
                variant="pills"
                defaultActiveKey={select}
                className="justify-content-center text-center"
                onSelect={selectHandler}
              >
                <Nav.Item className="fs-12 nav-mobile">
                  <Nav.Link href="/" className="btn-light-s">
                    <i className="far fa-home-alt fa-2x" />
                    <br />
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="fs-12 nav-mobile">
                  <Nav.Link eventKey="account">
                    <i className="far fa-user-circle fa-2x" />
                    <br />
                    My Account
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="fs-12 nav-mobile">
                  <Nav.Link eventKey="shortlist">
                    <i className="far fa-heart fa-2x" />
                    <br />
                    Shortlist
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>

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
        :global(.nav-mobile .nav-link){
          color: #212529 !important;
          background-color: #ffffff !important;
          border-color: #f8f9fa !important;
        }
        :global(.nav-mobile .nav-link.active){
          color: #f94d63 !important;
          background-color: #ffffff !important;
          border-color: #f8f9fa !important;
        }
        :global(.sidebar-sticky > a.nav-link.active) {
          color: #ff385c !important;
          font-weight: 600;
        }
        :global(.sidebar-sticky > a.nav-link) {
          color: #343a40 !important;
        }
        :global(.btn-white) {
          background-color: #ffffff !important;
        }
        :global(.shadow-menu) {
          -webkit-box-shadow: 5px -5px 15px 2px rgba(0,0,0,.15);
          box-shadow: 5px -5px 15px 2px rgba(0,0,0,.15)!important;
        }
        :global(.btn-light-s) {
          color: #212529 !important;
          background-color: #ffffff !important;
          border-color: #f8f9fa !important;
        }
        :global(.btn-account-tabs) {
          color: #f94d63 !important;
          background-color: #ffffff !important;
          border-color: #f8f9fa !important;
        }
        // Large devices (ipad pro, 1024px and up)
        @media (max-width: 1200px) {
          :global(.fs-13-pro) {
            font-size: 13px !important;
          }
          :global(.p-l-0-pro) {
            padding-left: 0 !important;
          }
          :global(.p-r-0-pro) {
            padding-right: 0 !important;
          }
          :global(.p-l-2-pro) {
            padding-left: .5rem !important;
          }
        }
        :global(.ant-notification){
          z-index: 1030;
        }

      `}</style>
    </>
  );
};

export default Account;
