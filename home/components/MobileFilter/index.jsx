import { useDispatch, useSelector } from "react-redux";
import { Input, AutoComplete, Select, Slider, Checkbox, Collapse } from 'antd';
import { renderOptions } from "../../lib/renderOptions";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import * as actions from "../../store/actions";
import {useEffect} from "react";

const Panel = Collapse.Panel;
const formatter = new Intl.NumberFormat(["ban", "id"]);
const for_data = { villa: ["Sale", "Rent"], land: ["Sale"] }; // If type is Land than only Sale
const period_data = ["Annually", "Monthly", "Weekly", "Daily"]; // If type is Villa
const status_data = ["Free Hold", "Lease Hold"];
const MIN_PRICE = 0;
const MAX_PRICE = 1000000000;

const MobileFilter = ({search, hotdealHandler, onChange}) => {
  const dispatch = useDispatch();
  const { location, type_id, property_for, status, period, price, facility, hotdeal } = search;

  const dataFacility = useSelector((state) => state.facilities.facilities);
  const dataType = useSelector((state) => state.types.types);
  const listLocation = useSelector(state => state.property.location);
  
  const type_list = []; renderOptions(type_list, dataType, true)
  const period_list = []; renderOptions(period_list, period_data)
  const status_list = []; renderOptions(status_list, status_data)
  const facility_list = []; renderOptions(facility_list, dataFacility, true)
  const for_list = [];
  if(type_id.value == 1) renderOptions(for_list, for_data.villa) // 1 for villa
  if(type_id.value == 2) renderOptions(for_list, for_data.land) // 2 for land

  useEffect(() => {
    let qLoct = '?'
    if(location.value) qLoct = qLoct + `q=${location.value}&`
    if(type_id.value) if(type_id.value.length !== 0) qLoct = qLoct + `type_id=${type_id.value}`
    dispatch(actions.getLocation(qLoct))
  },[type_id.value, location.value])

  return (
    <>
    <Row>
      <Col xs={12} sm={12} md={12} className="mb-3">
        <Form.Label className="fw-600">Location</Form.Label>
        <AutoComplete
          className="search-input w-100"
          options={listLocation}
          filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          value={location.value}
          onChange={e => onChange(e, "location")}
        >
          <Input size="large" placeholder="Location" />
        </AutoComplete>
      </Col>
      <Col xs={12} sm={6} md={6} className="mb-3">
        <Form.Label className="fw-600">Property Type</Form.Label>
        <Select
          placeholder="Select type"
          className="w-100 text-left"
          onChange={e => onChange(e, "type_id")}
          value={type_id.value}
          allowClear
        >
          {type_list}
        </Select>
      </Col>
      <Col xs={12} sm={6} md={6} className="mb-3">
        <Form.Label className="fw-600">Property For</Form.Label>
        <Select
          placeholder="For"
          className="w-100 text-left"
          onChange={e => onChange(e, "property_for")}
          value={property_for.value}
          allowClear
        >
          {for_list}
        </Select>
      </Col>
      {property_for.value === "Sale" && (
        <Col xs={12} sm={12} md={12} className="mb-3">
          <Form.Label className="fw-600">Status</Form.Label>
          <Select
            placeholder="Status"
            className="w-100 text-left"
            onChange={e => onChange(e, "status")}
            value={status.value}
            allowClear
          >
            {status_list}
          </Select>
        </Col>
      )}
      {property_for.value === "Rent" && (
        <Col xs={12} sm={12} md={12} className="mb-3">
          <Form.Label className="fw-600">Period</Form.Label>
          <Select
            placeholder="Period"
            className="w-100 text-left"
            onChange={e => onChange(e, "period")}
            value={period.value}
            allowClear
          >
            {period_list}
          </Select>
        </Col>
      )}
      {type_id.value == 1 && (
        <Col xs={12} sm={12} md={12} className="mb-3">
          <Form.Label className="fw-600">Facilities</Form.Label>
          <Select
            size="large"
            mode="multiple"
            placeholder="Facilities"
            className="w-100 text-left"
            onChange={e => onChange(e, "facility")}
            value={facility.value}
          >
            {facility_list}
          </Select>
        </Col>
      )}
      <Col sm={12} className="px-0">
        <Collapse ghost>
          <Panel className="collapse-price" header={<Form.Label className="fw-600">Price</Form.Label>}>
            <Row>
              <Col>
                <Card.Body className="pb-2 pl-0 pt-0">
                  <h5 className="card-title fs-12 text-secondary mb-1">MIN</h5>
                  <p className="text-dark card-text">IDR{formatter.format(price.value[0])}</p>
                </Card.Body>
              </Col>
              <Col>
                <Card.Body className="pb-2 px-0 pt-0">
                  <h5 className="card-title fs-12 text-secondary mb-1">MAX</h5>
                  <p className="text-dark card-text">
  IDR<>{price.value[1] === MAX_PRICE ? `${formatter.format(price.value[1])}++` : `${formatter.format(price.value[1])}`}</>
                  </p>
                </Card.Body>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="card-body pt-0 px-0 pb-1">
                  <Slider range 
                    tooltipVisible={false} 
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={10}
                    value={price.value}
                    onChange={e => onChange(e, "price")}
                  />
                </div>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
      <Col sm={12} className="mb-3">
        <Checkbox
          checked={hotdeal.value} 
          onChange={hotdealHandler}
        >
          Hot Deals ?
        </Checkbox>
      </Col>
    </Row>
      <style jsx>{`
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
        :global(.collapse-price > .ant-collapse-header){
          padding-bottom: 0px !important;
          padding-top: 0px !important;
        }
        :global(.collapse-price > .ant-collapse-content > .ant-collapse-content-box){
          padding-top: 0px !important;
          padding-left: 16px;
          padding-right: 16px;
        }
        
        :global(.ant-collapse > .collapse-price > .ant-collapse-header .ant-collapse-arrow){
          font-size: 14px !important;
          top: 41% !important;
          left: 13px !important;
        }
      `}</style>
    </>
  )
}

export default MobileFilter;
