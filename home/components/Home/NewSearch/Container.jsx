import { useState } from "react";
import { useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";
import ButtonBoot from "react-bootstrap/Button";
import { motion } from "framer-motion";

import { Input, AutoComplete, Select, Slider, Dropdown, Menu, Button, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { renderOptions } from "../../../lib/renderOptions";
import { Fade } from "../../Transition";

import Router from 'next/router'
import Table from 'react-bootstrap/Table'

const Option = Select.Option;
const formatter = new Intl.NumberFormat(["ban", "id"]);
const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale
const status_data = {
  sale: ["Free Hold", "Lease Hold"],
  rent: ["Annually", "Monthly", "Weekly", "Daily"]
};

const formSearch = {
  location: { value: "" },
  type_id: { value: [] },
  property_for: { value: [] },
  status: { value: [] },
  price: { value: [0, 0] },
  bedroom: { value : [] },
  bathroom: { value: [] },
  facility: { value: [] },
};

const SearchBox = ({ searchType }) => {
  const [search, setSearch] = useState(formSearch);
  const dataType = useSelector(state => state.types.types);
  const dataFacilities = useSelector(state => state.facilities.facilities.slice(0,16));

  const { location, property_for, status, price, facility, bedroom, bathroom } = search;

  //====== SEARCH ======//
  const options = [
    { value: "Seminyak" },
    { value: "Kuta" },
    { value: "Nusa Dua" },
    { value: "Sesetan" }
  ];
  const type_list = [];
  renderOptions(type_list, dataType, true);
  const status_list = [];
  if ((searchType == 1 && property_for.value === "Sale") || searchType == 2)
    renderOptions(status_list, status_data.sale);
  if (searchType == 1 && property_for.value === "Rent")
    renderOptions(status_list, status_data.rent);
  const for_list = [];
  if (searchType == 1) renderOptions(for_list, for_data.villa); // 1 for villa
  if (searchType == 2) renderOptions(for_list, for_data.land); // 2 for land

  const searchChangeHandler = (e, category) => {
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
        status: { value: [] }
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

  const searchHandler = () => {
    Router.push({
      pathname: "/all-properties",
      query: { 
        type_id: searchType, 
        location: location.value, 
        property_for: property_for.value,
        status: property_for.value === "Sale" ? status.value : null,
        period: property_for.value === "Rent" ? status.value : null,
        facility: facility.value.join(","),
        min_price: price.value[0] === 0 ? null : price.value[0],
        max_price: price.value[1] === 0 ? null : price.value[1],
        bedroom: bedroom.value,
        bathroom: bathroom.value,
      },
    })
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
                    {[...Array(81)].map((_, i) => (
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
                    {[...Array(8)].map((_, i) => (
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
    <Menu style={{ width: "40vh" }}>
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
                    ${formatter.format(price.value[0])}
                  </p>
                </td>
                <td className="pr-0 py-0">
                  <p className="font-weight-bold text-dark card-text float-right">
                    ${`${formatter.format(price.value[1])}`}
                  </p>
                </td>
              </tr>
            </thead>
          </Table>
          <Slider
            range
            tooltipVisible={false}
            min={0}
            max={1000000000}
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
          <Col className="pr-0">
            <AutoComplete
              className="search-input w-100"
              options={options}
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
          <Col className="pr-0 col-md-2 col-auto">
            <Select
              placeholder="For"
              className="w-100 text-left"
              onChange={e => searchChangeHandler(e, "property_for")}
              value={property_for.value}
            >
              {for_list}
            </Select>
          </Col>
          <Col md={2} className="pr-0">
            <Select
              placeholder="Status"
              className="w-100 text-left"
              onChange={e => searchChangeHandler(e, "status")}
              value={status.value}
            >
              {status_list}
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
          {searchType === "1" && (
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
