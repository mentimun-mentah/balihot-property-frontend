import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";
import ButtonBoot from "react-bootstrap/Button";
import { motion } from "framer-motion";

import { Input, AutoComplete, Select, Slider, Dropdown, Menu, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { renderOptions } from "../../../lib/renderOptions";
import { Fade } from "../../Transition";

import Router from 'next/router'
import Table from 'react-bootstrap/Table'
import * as actions from "../../../store/actions"

const Option = Select.Option;
const formatter = new Intl.NumberFormat(["ban", "id"]);
const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale

const period_data = ["Annually", "Monthly", "Weekly", "Daily"]; // If type is Villa
const status_data = ["Free Hold", "Lease Hold"];

const formSearch = {
  location: { value: "" },
  type_id: { value: [] },
  property_for: { value: [] },
  status: { value: [] },
  period: { value: [] },
  price: { value: [0, 0] },
  bedroom: { value : [] },
  bathroom: { value: [] },
  facility: { value: [] },
};

const SearchBox = ({ searchType, VILLA_CHECK_ID, LAND_CHECK_ID, MIN_PRICE, MAX_PRICE }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(formSearch);
  const dataType = useSelector(state => state.types.types);
  const dataFacilities = useSelector(state => state.facilities.facilities.slice(0,16));
  const listLocation = useSelector(state => state.property.location);

  const { type_id, location, property_for, status, period, price, facility, bedroom, bathroom } = search;

  //====== SEARCH ======//
  const type_list = []; renderOptions(type_list, dataType, true);
  const for_list = [];
  if (searchType !== LAND_CHECK_ID) renderOptions(for_list, for_data.villa); // 1 for villa
  if (searchType == LAND_CHECK_ID) renderOptions(for_list, for_data.land); // 2 for land
  const period_list = []; renderOptions(period_list, period_data)
  const status_list = []; renderOptions(status_list, status_data)
  const businessData = []
  for(let key in dataType){
    if(dataType[key].name.toLowerCase() !== "villa" && dataType[key].name.toLowerCase() !== "land"){
      businessData.push(dataType[key])
    }
  }
  const business_list = []
  if(businessData){
    renderOptions(business_list, businessData, true)
  }

  const currency = useSelector(state => state.currency.currency)

  let currencySymbol = null
  let currencyValue = 1

  if(currency){
    currencySymbol = Object.keys(currency.rates)
    currencyValue = (+Object.values(currency.rates)).toFixed(0)
  }

  const searchChangeHandler = (e, category) => {
    if (category === "type_id") {
      const data = { 
        ...search, 
        type_id: { value: e }, 
        property_for: { value: [] },
        status: { value: [] }, 
        period: { value: [] }, 
        price: { value: [0, 0] },
        facility: { value: [] }, 
        bedroom: { value: [] },
        bathroom: { value: [] },
      };
      setSearch(data);
    }

    if (category === "location") {
      const data = {
        ...search,
        location: { value: e }
      };
      setSearch(data);
    }
    if (category === "property_for") {
      const data = {
        ...search,
        property_for: { value: e },
        status: { value: [] },
        period: { value: [] }
      };
      setSearch(data);
    }
    if (category === "status") {
      const data = {
        ...search,
        status: { value: e }
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
    if (category === "bedroom") {
      const data = {
        ...search,
        bedroom: { value: e }
      };
      setSearch(data);
    }
    if (category === "bathroom") {
      const data = {
        ...search,
        bathroom: { value: e }
      };
      setSearch(data);
    }
  };

  useEffect(() => {
    if (searchType == LAND_CHECK_ID) {
      const data = {
        ...search,
        property_for: { value: "Sale" },
        status: { value: [] },
        period: { value: [] }
      };
      setSearch(data);
    }
  }, [searchType])

  useEffect(() => {
    let qLoct = '?'
    if(location.value) qLoct = qLoct + `q=${location.value}&`
    if(searchType) qLoct = qLoct + `type_id=${searchType}`
    dispatch(actions.getLocation(qLoct))
  },[location.value, searchType])

  const searchHandler = () => {
    let q = '?'
    if(searchType) q = q + `type_id=${searchType}&`
    if(location.value) q = q + `location=${location.value}&`
    if(property_for.value) if(property_for.value.length !== 0) q = q + `property_for=${property_for.value}&`
    if(status.value) if(status.value.length !== 0) q = q + `status=${status.value}&`
    if(period.value) if(period.value.length !== 0) q = q + `period=${period.value}&`
    if(price.value[0] !== 0) q = q + `min_price=${price.value[0]}&`

    if(price.value[1] !== 0 && price.value[1] !== MAX_PRICE) q = q + `max_price=${price.value[1]}&`

    if(bedroom.value) if(bedroom.value.length !== 0) q = q + `bedroom=${bedroom.value}&`
    if(bathroom.value) if(bathroom.value.length !== 0) q = q + `bathroom=${bathroom.value}&`
    if(facility.value) if(facility.value.length !== 0) q = q + `facility=${facility.value.join(",")}`

    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q
    Router.push(`/all-properties${check}`)
  }

  const advancedMenu = (
    <Menu>
      <div
        className="col-12 justify-content-center px-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="toast-body p-4">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="text-thm3 mb-3 text-dark">Facilities</h4>
              <Checkbox.Group style={{ width: '100%' }} onChange={e => searchChangeHandler(e, "facility")}>
              <Row>
                {dataFacilities && dataFacilities.map(item => (
                  <Col lg={3} md={4} sm={6} xs={6} key={item.id} className="mb-3">
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </Col>
                ))}
              </Row>
              </Checkbox.Group>
              <Row>
                <Col md={2}>
                  <Select 
                    placeholder="Bedroom" 
                    className="w-100" 
                    onChange={e => searchChangeHandler(e, "bedroom")}
                    value={bedroom.value}
                  >
                    {[...Array(16)].map((_, i) => (
                      <Option value={i + 1} key={i}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col md={2}>
                  <Select 
                    placeholder="Bathroom" 
                    className="w-100" 
                    onChange={e => searchChangeHandler(e, "bathroom")}
                    value={bathroom.value}
                  >
                    {[...Array(16)].map((_, i) => (
                      <Option value={i + 1} key={i}>
                        {i + 1}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );

  const priceMenu = (
    <Menu style={{ width: "50vh" }}>
      <div
        className="col-12 justify-content-center px-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="toast-body p-4">
          <Table className="table-borderless">
            <thead>
              <tr>
                <th className="card-title fs-12 text-secondary font-weight-bold pl-0">MIN</th>
                <th className="card-title fs-12 text-secondary font-weight-bold text-right pr-0">MAX</th>
              </tr>
              <tr>
                <td className="pl-0 py-0">
                  <p className="font-weight-bold text-dark card-text">
                    {currencySymbol} {formatter.format(price.value[0])}
                  </p>
                </td>
                <td className="pr-0 py-0">
                  <p className="font-weight-bold text-dark card-text float-right">
                    {currencySymbol} <>{price.value[1] === MAX_PRICE ? `${formatter.format(price.value[1])}++` : `${formatter.format(price.value[1])}`}</>
                  </p>
                </td>
              </tr>
            </thead>
          </Table>
          <Slider
            range
            tooltipVisible={false}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            value={price.value}
            onChange={e => searchChangeHandler(e, "price")}
          />
        </div>
      </div>
    </Menu>
  );
  //====== SEARCH ======//

  return (
    <>
      <motion.div
        className="tab-search-box"
        initial="initial"
        animate="in"
        exit="out"
        variants={Fade}
      >
        <Row>
          {searchType == 0 && (
            <Col className="pr-0">
              <Select
                placeholder="Type"
                className="w-100 text-left"
                onChange={e => searchChangeHandler(e, "type_id")}
                value={type_id.value}
              >
                {business_list}
              </Select>
            </Col>
          )}
          <Col className="pr-0">
            <AutoComplete
              className="search-input w-100"
              options={listLocation}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              value={location.value}
              onChange={e => searchChangeHandler(e, "location")}
            >
              <Input size="large" placeholder="Location" />
            </AutoComplete>
          </Col>
          <Col className={searchType == 0 ? "pr-0" : "pr-0 col-md-2 col-auto"}>
            <Select
              placeholder="For"
              className="w-100 text-left"
              onChange={e => searchChangeHandler(e, "property_for")}
              value={property_for.value}
            >
              {for_list}
            </Select>
          </Col>
          <Col md={2} className={searchType == 0 ? "pr-0 col-auto" : "pr-0"}>
            <Select
              placeholder={
                searchType == VILLA_CHECK_ID && property_for.value === "Sale" ? "Status" : 
                searchType == VILLA_CHECK_ID && property_for.value === "Rent" ? "Period" : 
                searchType == LAND_CHECK_ID && property_for.value === "Sale" ? "Status" : "Status"
              }
              className="w-100 text-left"
              onChange={
                searchType == VILLA_CHECK_ID && property_for.value === "Sale" ? e => searchChangeHandler(e, "status") :
                searchType == VILLA_CHECK_ID && property_for.value === "Rent" ? e => searchChangeHandler(e, "period") :
                searchType == LAND_CHECK_ID && property_for.value === "Sale" ? e => searchChangeHandler(e, "status") : e => searchChangeHandler(e, "status")
                
              }
              value={
                searchType == VILLA_CHECK_ID && property_for.value === "Sale" ? status.value : 
                searchType == VILLA_CHECK_ID && property_for.value === "Rent" ? period.value : 
                searchType == LAND_CHECK_ID && property_for.value === "Sale" ? status.value : status.value
              }
            >
              {
                searchType == VILLA_CHECK_ID && property_for.value === "Sale" ? <>{status_list}</> : 
                searchType == VILLA_CHECK_ID && property_for.value === "Rent" ? <>{period_list}</> : 
                searchType == LAND_CHECK_ID && property_for.value === "Sale" ? <>{status_list}</> : <>{status_list}</>
              }
            </Select>
          </Col>
          <Col md={2} className="pr-0">
            <Dropdown
              className="w-100"
              overlay={priceMenu}
              trigger={["click"]}
              overlayClassName="menu-price"
              placement="bottomCenter"
            >
              <Button className="btn-price">
                <span className="btn-price-text">Price </span>
                <span className="btn-price-arrow">
                  <DownOutlined />
                </span>
              </Button>
            </Dropdown>
          </Col>
          {searchType !== LAND_CHECK_ID && (
            <Col className="align-self-center col-auto">
              <Dropdown
                overlay={advancedMenu}
                trigger={["click"]}
                overlayClassName="menu-large container position-relative"
                className="h-47 btn-advanced text-dark"
              >
                <Button>
                  Advanced <i className="fas fa-ellipsis-v ml-2" />
                </Button>
              </Dropdown>
            </Col>
          )}
          <Col className="col-auto h-47">
            <ButtonBoot variant="danger h-47" onClick={searchHandler}>
              <i className="far fa-search pr-2"></i>
              Search
            </ButtonBoot>
          </Col>
        </Row>
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

        /*SEARH BOX*/
        :global(.ant-select-single
            .ant-select-selector
            .ant-select-selection-search-input) {
          width: 100%;
          border-radius: 0.25rem;
          padding: 10px 15px;
        }
        :global(.ant-input:focus, .ant-input-focused, .ant-input:hover, .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
            .ant-select-selector) {
          border: 1px solid rgb(162, 162, 162);
          border-radius: 0.25rem;
          box-shadow: none;
        }
        :global(.ant-select-selection-placeholder, .ant-input::placeholder) {
          opacity: 0.4;
          font-size: 14px;
          color: black;
        }
        :global(.ant-select-single:not(.ant-select-customize-input)
            .ant-select-selector, .btn-price) {
          height: 47px;
          padding: 8px 11px;
          border-radius: 0.25rem;
        }
        :global(.ant-input:focus, .ant-input-focused, .ant-input:hover, .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
            .ant-select-selector, .ant-btn:hover, .ant-btn:focus) {
          border: 1px solid rgb(162, 162, 162);
          border-radius: 0.25rem;
          box-shadow: none;
        }
        :global(.ant-select:not(.ant-select-disabled):hover
            .ant-select-selector) {
          border-color: rgb(162, 162, 162);
          border-radius: 0.25rem;
        }
        :global(.ant-select-dropdown-empty, .ant-select-dropdown) {
          width: auto !important;
        }
        :global(.btn-price-text) {
          float: left;
          color: #a3a3a3;
        }
        :global(.btn-price-arrow) {
          float: right;
        }
        :global(.btn-price-arrow > span) {
          font-size: 12px;
          color: #a3a3a3;
          vertical-align: 0;
        }
        :global(.menu-large) {
          width: 100%;
          left: 0px !important;
          z-index: 1;
        }
        :global(.btn-advanced) {
          border: 0 !important;
          height: auto;
          font-size: 16px;
        }
        :global(.menu-price) {
          z-index: 1;
        }
      `}</style>

      <style jsx global>{`
        .h-47 {
          height: 47px !important;
        }
        /*DROPDOWN MORE*/
        .ant-checkbox-checked .ant-checkbox-inner{
          background-color: #ff5a5f;
          border-color: #ff5a5f;
        }
        .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {
          border-color: #ff5a5f;
        }
        .ant-checkbox-input:focus + .ant-checkbox-inner{
          border: 1px solid #ff5a5f;
        }
        .ant-checkbox-checked::after{
          border: 1px solid #ff5a5f;
        }
        .ant-checkbox-inner::after{
          top: 45%;
          left: 24%;
        }
      `}</style>
    </>
  );
};

export default SearchBox;
