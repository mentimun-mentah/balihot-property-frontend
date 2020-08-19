import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import { Drawer } from 'antd';
import Router from "next/router";
import SearchContainer from "./Container";
import { renderOptions } from "../../../lib/renderOptions";
import MobileFilters from "../../MobileFilter";

const formSearch = {
  location: { value: "" },
  type_id: { value: [] },
  property_for: { value: [] },
  status: { value: [] },
  period: { value: [] },
  price: { value: [0, 0] },
  facility: { value: [] },
  hotdeal: { value: false },
};

const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale
const period_data = ["Annually", "Monthly", "Weekly", "Daily"]; // If type is Villa
const status_data = ["Free Hold", "Lease Hold"];
const MIN_PRICE = 0;
const MAX_PRICE = 1000000000;

const SearchBox = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(formSearch);
  const selectHandler = useCallback((e) => setSelect(e),[]);

  const { location, type_id, property_for, status, period, price, facility, hotdeal } = search;
  
  const dataFacility = useSelector((state) => state.facilities.facilities);
  const dataType = useSelector((state) => state.types.types);
  let VILLA_CHECK_ID = null;
  let LAND_CHECK_ID = null;

  for(let key in dataType){
    if(dataType[key].name.toLowerCase() === "villa"){
      VILLA_CHECK_ID = dataType[key].id
    }
    if(dataType[key].name.toLowerCase() === "land"){
      LAND_CHECK_ID = dataType[key].id
    }
  }

  const [select, setSelect] = useState(VILLA_CHECK_ID);
  
  const type_list = []; renderOptions(type_list, dataType, true)
  const period_list = []; renderOptions(period_list, period_data)
  const status_list = []; renderOptions(status_list, status_data)
  const facility_list = []; renderOptions(facility_list, dataFacility, true)
  const for_list = [];
  if(type_id.value.length !== 0 && type_id.value == VILLA_CHECK_ID) renderOptions(for_list, for_data.villa)
  if(type_id.value.length !== 0 && type_id.value == LAND_CHECK_ID) renderOptions(for_list, for_data.land)

  //====== SEARCH ======//
  const searchChangeHandler = (e, category) => {
    if (category === "location") {
      const data = { ...search, location: { value: e } };
      setSearch(data);
    }
    if (category === "type_id") {
      const data = { 
        ...search, 
        type_id: { value: e }, 
        status: { value: [] }, 
        property_for: { value: [] },
        period: { value: [] }, 
        facility: { value: [] }, 
      };
      setSearch(data);
    }
    if (category === "property_for") {
      const data = { 
        ...search, 
        property_for: { value: e }, 
        status: { value: [] },
        period: { value: [] }, 
        facility: { value: [] }, 
      };
      setSearch(data);
    }
    if (category === "status") {
      const data = { 
        ...search, 
        status: { value: e },
        period: { value: [] } 
      };
      setSearch(data);
    }
    if (category === "period") {
      const data = { 
        ...search, 
        period: { value: e } 
      };
      setSearch(data);
    }
    if (category === "price") {
      const data = { 
        ...search, 
        price: { value: e } 
      };
      setSearch(data);
    }
    if (category === "facility") {
      const data = { 
        ...search, 
        facility: { value: e } 
      };
      setSearch(data);
    }
  };

  const hotdealHandler = (e) => {
    const data = {
      ...search, 
      hotdeal: { value: e.target.checked },
    };
    setSearch(data);
  }

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const searchHandler = () => {
    Router.push({
      pathname: "/all-properties",
      query: { 
        hotdeal: true, 
      },
    })
  }

  let q = '?'
  if(type_id.value) if(type_id.value.length !== 0) q = q + `type_id=${type_id.value}&`
  if(location.value) q = q + `location=${location.value}&`
  if(property_for.value) if(property_for.value.length !== 0) q = q + `property_for=${property_for.value}&`
  if(status.value) if(status.value.length !== 0) q = q + `status=${status.value}&`
  if(period.value) if(period.value.length !== 0) q = q + `period=${period.value}&`
  if(facility.value) if(facility.value.length !== 0) q = q + `facility=${facility.value.join(",")}&`
  if(price.value[0] !== 0) q = q + `min_price=${price.value[0]}&`
  if(price.value[1] !== 0 && price.value[1] !== MAX_PRICE) q = q + `max_price=${price.value[1]}&`
  if(hotdeal.value) q = q + `hotdeal=${hotdeal.value}`
 
  const searchHandlerMobile = () => {
    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q

    Router.push(`/all-properties${check}`)
  }

  return (
    <>
      <Container className="text-center">
        <Row className="d-block d-sm-block d-md-block d-lg-none d-xl-none justify-content-center">
          <Col lg={12} className="d-block d-sm-block d-md-block d-lg-none d-xl-none align-self-center">
            <Button 
              className="btn-red-hot"
              onClick={showDrawer}
            >
              Find Now <i className="far fa-search ml-1" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="d-none d-sm-none d-md-none d-lg-block">
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
                        <Nav.Link eventKey={VILLA_CHECK_ID}
                          className={ select == VILLA_CHECK_ID ? "active btn-search-tab" : "btn-search-tab" }
                        >
                          Villa
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={LAND_CHECK_ID} className="btn-search-tab">
                          Land
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="9" className="btn-search-tab business">
                          Business
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={searchHandler}>
                        <Nav.Link className="btn-search-tab">
                          Hot Deals
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <AnimatePresence exitBeforeEnter key={select}>
                  <SearchContainer 
                    searchType={+select} 
                    VILLA_CHECK_ID={VILLA_CHECK_ID} 
                    LAND_CHECK_ID={LAND_CHECK_ID} 
                    MIN_PRICE={MIN_PRICE}
                    MAX_PRICE={MAX_PRICE}
                  />
                </AnimatePresence>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* MOBILE SEARCH */}
      <Drawer
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        title="Search your dream property"
        closeIcon={ <i className="fas fa-times" /> }
        placement="bottom"
        onClose={onClose}
        visible={visible}
        height="100%"
        zIndex="1030"
        footer={
          <div style={{ textAlign: 'right' }} >
            <Button 
              variant="link" 
              className="mr-2 rounded-0 text-reset"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="btn-red-hot rounded-0"
              onClick={searchHandlerMobile}
            > 
              Submit 
            </Button>
          </div>
        }
      >
        <MobileFilters 
          search={search} 
          hotdealHandler={hotdealHandler} 
          onChange={searchChangeHandler} 
        />
      </Drawer>

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
          width: auto;
          height: 50px;
          line-height: 35px;
          text-align: center;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
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
          margin-left: 13px;
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
        :global(.nav-item > a.business.active:before) {
          margin-left: 28px;
        }
        :global(.ant-select
            .ant-select-lg
            .ant-select-single
            .ant-select-show-arrow) {
          line-height: 2.5 !important;
        }
        :global(.ant-select-multiple .ant-select-selector) {
          padding: 3px 6px !important;
          max-height: 85px;
          overflow: auto;
          border-radius: 0.25rem;
          height: 47px;
        }
        :global(.ant-select-multiple.ant-select-lg .ant-select-selection-item){
          height: 32px;
          line-height: 30px;
          font-size: 14px;
        }
        :global(.ant-select-multiple .ant-select-selection-item-remove){
          line-height: 2.7;
        }
        :global(.ant-select-multiple .ant-select-selector, .ant-select
            .ant-select-selector, .ant-picker) {
          max-height: 85px;
          overflow: auto;
        }
        :global(.ant-select-focused.ant-select-multiple .ant-select-selector){
          box-shadow: 0 0 0 2px #8a8a8a26;
        }
      `}</style>
      <div id="property" />
    </>
  );
};

export default SearchBox;
