import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Nav, Button, Form, Card} from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import { Drawer, Input, AutoComplete, Select, Slider, Checkbox } from 'antd';
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

const formatter = new Intl.NumberFormat(["ban", "id"]);
const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale
const period_data = ["Annually", "Monthly", "Weekly", "Daily"]; // If type is Villa
const status_data = ["Free Hold", "Lease Hold"];

const SearchBox = () => {
  const [select, setSelect] = useState("1");
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(formSearch);
  const selectHandler = useCallback((e) => setSelect(e),[]);

  const { location, type_id, property_for, status, period, price, facility, hotdeal } = search;
  
  const dataFacility = useSelector((state) => state.facilities.facilities);
  const dataType = useSelector((state) => state.types.types);
  
  const type_list = []; renderOptions(type_list, dataType, true)
  const period_list = []; renderOptions(period_list, period_data)
  const status_list = []; renderOptions(status_list, status_data)
  const facility_list = []; renderOptions(facility_list, dataFacility, true)
  const for_list = [];
  if(type_id.value == 1) renderOptions(for_list, for_data.villa) // 1 for villa
  if(type_id.value == 2) renderOptions(for_list, for_data.land) // 2 for land

  //====== SEARCH ======//
  const options = [ { value: "Seminyak" }, { value: "Kuta" }, { value: "Nusa Dua" }, { value: "Sesetan" } ];

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

  const searchHandlerMobile = () => {
    Router.push({
      pathname: "/all-properties",
      query: { 
        location: location.value, 
        type_id: type_id.value,
        property_for: property_for.value,
        status: status.value,
        period: period.value,
        facility: facility.value.join(","),
        min_price: price.value[0] === 0 ? null : price.value[0],
        max_price: price.value[1] === 0 ? null : price.value[1],
        hotdeal: hotdeal.value, 
      },
    })
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
                        <Nav.Link eventKey="1"
                          className={ select === "1" ? "active btn-search-tab" : "btn-search-tab" }
                        >
                          Villa
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2" className="btn-search-tab">
                          Land
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
                  <SearchContainer searchType={select} />
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
        {/* <Row> */}
        {/*   <Col xs={12} sm={12} md={12} className="mb-3"> */}
        {/*     <Form.Label className="fw-600">Location</Form.Label> */}
        {/*     <AutoComplete */}
        {/*       className="search-input w-100" */}
        {/*       options={options} */}
        {/*       filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1} */}
        {/*       value={location.value} */}
        {/*       onChange={e => searchChangeHandler(e, "location")} */}
        {/*     > */}
        {/*       <Input size="large" placeholder="Location" /> */}
        {/*     </AutoComplete> */}
        {/*   </Col> */}
        {/*   <Col xs={12} sm={6} md={6} className="mb-3"> */}
        {/*     <Form.Label className="fw-600">Property Type</Form.Label> */}
        {/*     <Select */}
        {/*       placeholder="Select type" */}
        {/*       className="w-100 text-left" */}
        {/*       onChange={e => searchChangeHandler(e, "type_id")} */}
        {/*       value={type_id.value} */}
        {/*     > */}
        {/*       {type_list} */}
        {/*     </Select> */}
        {/*   </Col> */}
        {/*   <Col xs={12} sm={6} md={6} className="mb-3"> */}
        {/*     <Form.Label className="fw-600">Property For</Form.Label> */}
        {/*     <Select */}
        {/*       placeholder="For" */}
        {/*       className="w-100 text-left" */}
        {/*       onChange={e => searchChangeHandler(e, "property_for")} */}
        {/*       value={property_for.value} */}
        {/*     > */}
        {/*       {for_list} */}
        {/*     </Select> */}
        {/*   </Col> */}
        {/*   {property_for.value === "Sale" && ( */}
        {/*     <Col xs={12} sm={12} md={12} className="mb-3"> */}
        {/*       <Form.Label className="fw-600">Status</Form.Label> */}
        {/*       <Select */}
        {/*         placeholder="Status" */}
        {/*         className="w-100 text-left" */}
        {/*         onChange={e => searchChangeHandler(e, "status")} */}
        {/*         value={status.value} */}
        {/*       > */}
        {/*         {status_list} */}
        {/*       </Select> */}
        {/*     </Col> */}
        {/*   )} */}
        {/*   {property_for.value === "Rent" && ( */}
        {/*     <Col xs={12} sm={12} md={12} className="mb-3"> */}
        {/*       <Form.Label className="fw-600">Period</Form.Label> */}
        {/*       <Select */}
        {/*         placeholder="Period" */}
        {/*         className="w-100 text-left" */}
        {/*         onChange={e => searchChangeHandler(e, "period")} */}
        {/*         value={period.value} */}
        {/*       > */}
        {/*         {period_list} */}
        {/*       </Select> */}
        {/*     </Col> */}
        {/*   )} */}
        {/*   {type_id.value == 1 && ( */}
        {/*     <Col xs={12} sm={12} md={12} className="mb-3"> */}
        {/*       <Form.Label className="fw-600">Facilities</Form.Label> */}
        {/*       <Select */}
        {/*         size="large" */}
        {/*         mode="multiple" */}
        {/*         placeholder="Facilities" */}
        {/*         className="w-100 text-left" */}
        {/*         onChange={e => searchChangeHandler(e, "facility")} */}
        {/*         value={facility.value} */}
        {/*       > */}
        {/*         {facility_list} */}
        {/*       </Select> */}
        {/*     </Col> */}
        {/*   )} */}
        {/*   <Col sm={12} className="mb-3"> */}
        {/*     <Form.Label className="fw-600">Price</Form.Label> */}
        {/*     <Row> */}
        {/*       <Col> */}
        {/*         <Card.Body className="pb-2 pl-0 pt-0"> */}
        {/*           <h5 className="card-title fs-12 text-secondary mb-1">MIN</h5> */}
        {/*           <p className="text-dark card-text">${formatter.format(price.value[0])}</p> */}
        {/*         </Card.Body> */}
        {/*       </Col> */}
        {/*       <Col> */}
        {/*         <Card.Body className="pb-2 pl-0 pt-0"> */}
        {/*           <h5 className="card-title fs-12 text-secondary mb-1">MAX</h5> */}
        {/*           <p className="text-dark card-text"> */}
        {/*             ${`${formatter.format(price.value[1])}`} */}
        {/*           </p> */}
        {/*         </Card.Body> */}
        {/*       </Col> */}
        {/*     </Row> */}
        {/*     <Row> */}
        {/*       <Col> */}
        {/*         <div className="card-body pt-0 px-0 pb-1"> */}
        {/*           <Slider range */} 
        {/*             tooltipVisible={false} */} 
        {/*             min={0} */}
        {/*             max={1000000000} */}
        {/*             step={10} */}
        {/*             value={price.value} */}
        {/*             onChange={e => searchChangeHandler(e, "price")} */}
        {/*           /> */}
        {/*         </div> */}
        {/*       </Col> */}
        {/*     </Row> */}
        {/*   </Col> */}
        {/*   <Col sm={12} className="mb-3"> */}
        {/*     <Checkbox */}
        {/*       checked={hotdeal.value} */} 
        {/*       onChange={hotdealHandler} */}
        {/*     > */}
        {/*       Hot Deals ? */}
        {/*     </Checkbox> */}
        {/*   </Col> */}
        {/* </Row> */}
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
