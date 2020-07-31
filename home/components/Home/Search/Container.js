import { useState, useCallback, Suspense } from "react";
import { NavDropdown, Row, Col, Nav, Dropdown, Button, NavItem } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "../../Transition";
import Link from "next/link";
import Range from "rc-slider/lib/Range";

import AutoSuggest from "./AutoSuggest";
import DropdownList from "../../Dropdown/dropdown";

const Advanced = React.lazy(() => import("./Advanced"));

const SearchBox = ({ searchType }) => {
  const [advanced, setAdvanced] = useState(false);
  const [type, setType] = useState("Type");
  const [status, setStatus] = useState("Status");
  const [price, setPrice] = useState([1000, 150000]);

  const saleType = [{ name: "Free Hold" }, { name: "Lease Hold" }];
  const rentType = [{ name: "Short Term" }, { name: "Long Term" }];
  const villaType = [{ name: "Modern Style" }, { name: "Balinese" }, { name: "Luxury" }];
  const landType = [
    { name: "Beachfront" },
    { name: "Development and Commersial land" },
    { name: "Residental" },
  ];

  const typeSelectHandler = (e) => setType(e);
  const statusSelectHandler = (e) => setStatus(e);
  const setPriceHandler = useCallback((e) => setPrice(e), []);
  const advancedOpenHandler = useCallback(() => setAdvanced(true), []);
  const advancedCloseHandler = useCallback(() => setAdvanced(false), []);

  let filterData;
  if (searchType === "villa") filterData = villaType;
  if (searchType === "land") filterData = landType;
  if (searchType === "business") filterData = landType;

  return (
    <>
      <motion.div
        className="tab-search-box"
        initial="initial"
        animate="in"
        exit="out"
        variants={Fade}
      >
        <Nav variant="pills" activeKey="1" className="justify-content-around">
          <Nav.Item>
            <AutoSuggest />
          </Nav.Item>
          <NavItem>
            <DropdownList
              optional={advancedCloseHandler}
              filterData={filterData}
              selectedValue={type}
              setFilterData={typeSelectHandler}
            />
          </NavItem>
          <NavItem>
            <DropdownList
              optional={advancedCloseHandler}
              saleRent={searchType === "villa"}
              saleData={searchType === "villa" && saleType}
              rentData={searchType === "villa" && rentType}
              filterData={saleType}
              selectedValue={status}
              setFilterData={statusSelectHandler}
            />
          </NavItem>
          <NavItem>
            <Dropdown className="border rounded" onClick={advancedCloseHandler}>
              <Dropdown.Toggle variant="white" className="h-50 w-150 text-left">
                Price
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-price">
                <Row>
                  <Col>
                    <div className="card-body">
                      <h5 className="card-title fs-12 text-secondary font-weight-bold">MIN</h5>
                      <p className="font-weight-bold card-text">${price[0]}</p>
                    </div>
                  </Col>
                  <Col>
                    <div className="card-body text-right">
                      <h5 className="fs-12 text-secondary font-weight-bold card-title">MAX</h5>
                      <p className="font-weight-bold card-text float-right">
                        ${price[1] === 1000000 ? `${price[1]}++` : `${price[1]}`}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="card-body pt-0">
                      <Range
                        allowCross={false}
                        min={1000}
                        max={1000000}
                        defaultValue={price}
                        onChange={setPriceHandler}
                      />
                    </div>
                  </Col>
                </Row>
              </Dropdown.Menu>
            </Dropdown>
          </NavItem>
          <NavDropdown
            className="menu-large"
            title={
              <span className="text-left dropdown-advanced-toggle">
                Advanced
                <span className="float-md-right pl-3">
                  <i className="fas fa-ellipsis-v"></i>
                </span>
              </span>
            }
            show={advanced}
            onClick={advancedOpenHandler}
          >
            <AnimatePresence exitBeforeEnter key={advanced}>
              <Suspense fallback={<p>Loading..</p>}>
                <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
                  <Advanced hide={advancedCloseHandler} />
                </motion.div>
              </Suspense>
            </AnimatePresence>
          </NavDropdown>
          <Nav.Item onClick={advancedCloseHandler}>
            <Link href="/all-properties" as="/all-properties">
              <Button variant="danger" className="h-50">
                <i className="far fa-search pr-2"></i>
                Search
              </Button>
            </Link>
          </Nav.Item>
        </Nav>
      </motion.div>
      <style jsx>{`
        :global(.nav-pills .nav-link) {
          color: #484848;
        }
        :global(.nav-pills .nav-link.active, .nav-pills .show > .nav-link) {
          color: #484848;
        }
        :global(.tab-search-box) {
          margin-top: 30px;
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px 20px;
          position: relative;
          z-index: 9;
        }
        :global(.tab-search-box:before) {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          bottom: -10px;
          content: "";
          left: -10px;
          position: absolute;
          right: -10px;
          top: -10px;
          z-index: -1;
        }
        /*DROPDOWN PRICE*/
        :global(.dropdown-price) {
          background-color: #ffffff;
          border-radius: 8px;
          -webkit-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -moz-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -o-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          display: none;
          height: 147px;
          left: auto !important;
          margin: 0 auto;
          width: 300px;
          max-width: 300px;
          padding: 10px 10px;
          position: absolute;
          right: 0 !important;
          top: 60px !important;
        }
        :global(.dropdown-price:before) {
          background-color: #ffffff;
          content: "";
          height: 20px;
          left: auto;
          margin: 0 auto;
          position: absolute;
          right: 25%;
          top: -5px;
          width: 20px;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        /*SLIDER*/
        :global(.rc-slider-rail) {
          height: 7px;
        }
        :global(.rc-slider-track) {
          height: 7px;
          background-color: #ff385c;
        }
        :global(.rc-slider-handle) {
          width: 25px;
          height: 25px;
          margin-top: -10px;
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle:before) {
          background-color: #ff5a5f;
          border-radius: 10px;
          content: "";
          height: 11px;
          left: 0;
          margin: 0 auto;
          position: absolute;
          right: 0;
          top: 6px;
          width: 11px;
        }
        :global(.rc-slider-handle:active) {
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle:hover) {
          border-color: #c5c5c5;
        }
        :global(.rc-slider-handle-dragging) {
          border: 1px solid #c5c5c5;
        }
        :global(.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging) {
          border-color: #c5c5c5;
          box-shadow: 0px 0px 5px 0px rgba(19, 19, 28, 0.2);
        }
        :global(.rc-slider-handle:focus) {
          outline: none;
        }
        :global(.rc-slider-handle-click-focused:focus) {
          border-color: #c5c5c5;
          box-shadow: unset;
        }
        :global(.rc-slider-dot-active) {
          border-color: #c5c5c5;
        }
        /*SLIDER*/
        /*DROPDOWN PRICE*/

        /*DROPDOWN ADVANCED*/
        :global(.menu-large) {
          position: static !important;
        }
        :global(.menu-large > a.dropdown-toggle) {
          height: 50px !important;
        }
        :global(.menu-large > a.nav-link) {
          padding: 0.8rem 1rem !important;
          background-color: transparent !important;
        }
        :global(.menu-large > .dropdown-menu) {
          width: 100%;
          transform: translate(0) !important;
          top: 100% !important;
        }
        :global(.menu-large > .dropdown-menu:before) {
          background-color: #ffffff;
          content: "";
          height: 20px;
          left: auto;
          margin: 0 auto;
          position: absolute;
          right: 20%;
          top: -5px;
          width: 20px;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        :global(.menu-large > .show) {
          margin-top: 140px !important;
          padding: 0px;
          top: 0 !important;
          bottom: auto !important;
        }
        :global(.menu-large > .dropdown-toggle::after) {
          display: none !important;
        }
        :global(.dropdown-advanced-toggle::after) {
          display: none !important;
        }
        :global(.dropdown-advanced) {
          background-color: #ffffff;
          border-radius: 8px;
          -webkit-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -moz-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          -o-box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          box-shadow: 0px 0px 50px 0px rgba(32, 32, 32, 0.15);
          display: none;
          min-height: 254px;
          left: 0;
          position: absolute !important;
          top: 60px !important;
          width: 100%;
          z-index: 9;
          padding: 15px;
        }
        /*DROPDOWN ADVANCED*/
      `}</style>
    </>
  );
};

export default SearchBox;
