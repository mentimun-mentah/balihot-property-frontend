import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";

import SearchContainer from "./Container";

const SearchBox = () => {
  const [select, setSelect] = useState("villa");
  const selectHandler = (e) => setSelect(e);

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="home_content">
              <div className="home_adv_srch_opt">
                <Row>
                  <Col>
                    <Nav
                      variant="pills"
                      className="justify-content-center"
                      onSelect={selectHandler}
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="villa"
                          className={
                            select === "villa" ? "active btn-search-tab" : "btn-search-tab"
                          }
                        >
                          Villa
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="land" className="btn-search-tab">
                          Land
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <AnimatePresence exitBeforeEnter key={select}>
                  <SearchContainer searchType={select} />
                </AnimatePresence>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        :global(.nav-pills .nav-link) {
          color: #484848;
        }
        :global(.btn:focus) {
          outline: 0;
          box-shadow: unset;
        }
        :global(.form-control:focus) {
          border-color: unset;
          box-shadow: unset;
        }

        :global(.btn-search-tab) {
          background-color: #ffffff;
          color: #1b2032;
          margin-right: 15px;
          width: 100px;
          height: 50px;
          line-height: 35px;
          text-align: center;
        }
        :global(.btn-search-tab:hover) {
          background-color: #ffffff;
          color: #1b2032;
          margin-right: 15px;
        }
        :global(.nav-item > a.btn-search-tab.active) {
          background-color: #ff5a5f;
          color: white;
        }
        :global(.nav-item > a.btn-business.active:before) {
          margin-left: 29px !important;
        }
        :global(.nav-item > a.btn-search-tab.active:before) {
          background-color: #ff5a5f;
          content: "";
          height: 35px;
          margin-left: 12px;
          position: absolute;
          top: 25px;
          width: 20px;
          z-index: -1;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      `}</style>
      <div id="property" />
    </>
  );
};

export default SearchBox;
