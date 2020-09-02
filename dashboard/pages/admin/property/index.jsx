import React, { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { Select, DatePicker, Checkbox, InputNumber, message } from "antd";
import { useSelector } from "react-redux";
import { formImage, formProperty } from "../../../components/Property/propertyData.js"
import { for_data } from "../../../components/Property/propertyData.js"
import { period_data, status_data, renderOptions } from "../../../components/Property/propertyData.js"
import { propertyFormIsValid, propertyImageIsValid } from '../../../lib/validateFormProperty'

import * as actions from "../../../store/actions";
import _ from 'lodash';
import axios, {headerCfgFormData} from '../../../lib/axios';
import moment from 'moment';
import cx from 'classnames';
import swal from "sweetalert";
import validator from 'validator'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";

import InfoModal from "../../../components/Property/InfoModal";
import ImageProperty from "../../../components/Property/ImageProperty"
import BuildingInformation from "../../../components/Property/BuildingInformation"
import LocationInformation from "../../../components/Property/LocationInformation"
import StyleProperty from "../../../components/Property/style"
const InfoModalMemo = React.memo(InfoModal);

const ImagePropertyMemo = React.memo(ImageProperty)

const Property = () => {
  const [showInfo, setShowInfo] = useState(false);
  //========= PROPERTY ==========//
  const [imageList, setImageList] = useState(formImage);
  const [property, setProperty] = useState(formProperty);

  const {name, type_id, region_id, property_for, land_size, youtube, description} = property; // Property Information
  const {status, freehold_price, leasehold_price, leasehold_period} = property; // Property for sale
  const {period, daily_price, weekly_price, monthly_price, annually_price, hotdeal} = property; // Property for rent
  const {facilities, bedroom, bathroom, building_size} = property; // Data for Villa
  const {location, latitude, longitude} = property; // Data for Map

  let VILLA_CHECK_ID = null;
  let LAND_CHECK_ID = null;
  //========= PROPERTY ==========//
  
  //========= PROPERTY INFORMATION ==========//
  const dataFacility = useSelector((state) => state.facility.facility);
  const dataRegion = useSelector((state) => state.region.region);
  const dataType = useSelector((state) => state.types.types);

  for(let key in dataType){
    if(dataType[key].name.toLowerCase() === "villa"){
      VILLA_CHECK_ID = dataType[key].id
    }
    if(dataType[key].name.toLowerCase() === "land"){
      LAND_CHECK_ID = dataType[key].id
    }
  }

  const type_list = []; renderOptions(type_list, dataType, true)
  const region_list = []; renderOptions(region_list, dataRegion, true)
  const for_list = []; 
  if(type_id.value.length !== 0 && type_id.value !== LAND_CHECK_ID) renderOptions(for_list, for_data.villa) // for any type except land
  if(type_id.value.length !== 0 && type_id.value == LAND_CHECK_ID) renderOptions(for_list, for_data.land) // for type land
  const period_list = []; renderOptions(period_list, period_data)
  const status_list = []; renderOptions(status_list, status_data)
  const facility_list = []; renderOptions(facility_list, dataFacility, true)
  //========= PROPERTY INFORMATION ==========//
  
  //========= INPUT CHANGE HANDLER ==========//
  const inputChangeHandler = (e, category) => {
    // e for "value" in Select component
    // category for name key
    // For input type from bootstrap
    if (category === "input") {
      let value = e.target.value;
      let name = e.target.name;
      const data = {
        ...property,
        [name]: {
          ...property[name],
          value: value, isValid: true, message: null
        }
      };
      setProperty(data);
    }
    // For Select component which not for input and type_id
    if (category !== "input" && category !== "type_id") {
      const data = {
        ...property,
        [category]: {
          ...property[category],
          value: e, isValid: true, message: null
        }
      };
      setProperty(data);
    }
    if (category === "type_id") {
      const data = {
        ...property,
        type_id: { value: e, isValid: true, message: null },
        property_for: { value: [], isValid: true, message: null },
        land_size: { value:"", isValid: true, message: null },

        status: { value: [], isValid: true, message: null },
        freehold_price: { value:"", isValid: true, message: null },
        leasehold_price: { value:"", isValid: true, message: null },
        leasehold_period: { value:"", isValid: true, message: null },

        period: { value: [], isValid: true, message: null },
        daily_price: { value:"", isValid: true, message: null },
        weekly_price: { value:"", isValid: true, message: null },
        monthly_price: { value:"", isValid: true, message: null },
        annually_price: { value:"", isValid: true, message: null },

        building_size: { value:"", isValid: true, message: null },
        bathroom: { value:"", isValid: true, message: null },
        bedroom: { value:"", isValid: true, message: null },
        facilities: { value: [], isValid: true, message: null }
      };
      setProperty(data);
    }
    if (category === "status"){
      const data = {
        ...property,
        status: { value: e, isValid: true, message: null },
        freehold_price: { value:"", isValid: true, message: null },
        leasehold_price: { value:"", isValid: true, message: null },
        leasehold_period: { value:"", isValid: true, message: null },
      };
      setProperty(data);
    }
    if (category === "property_for"){
      const data = {
        ...property,
        property_for: { value:e , isValid: true, message: null },
        status: { value: [], isValid: true, message: null },
        period: { value: [], isValid: true, message: null },
        daily_price: { value:"", isValid: true, message: null },
        weekly_price: { value:"", isValid: true, message: null },
        monthly_price: { value:"", isValid: true, message: null },
        annually_price: { value:"", isValid: true, message: null },
        freehold_price: { value:"", isValid: true, message: null },
        leasehold_price: { value:"", isValid: true, message: null },
        leasehold_period: { value:"", isValid: true, message: null },
      };
      setProperty(data);
    }
  }

  const hotdealHandler = (e) => {
    const data = {
      ...property,
      hotdeal: { value: e.target.checked, isValid: true, message: null },
    };
    setProperty(data);
  }

  const dateSelectHandler = (_, dateString) => {
    const data = {
      ...property,
      leasehold_period: { value: dateString, isValid: true, message: null },
    };
    setProperty(data);
  };

  const deselectPeriodHandler = (e) => {
    let names = `${e.toLowerCase()}_price`
    const newPeriod = period.value.filter(val => val !== e)
    const state = JSON.parse(JSON.stringify(property));
    for(let x in state){
      if(x === names){
        const data = {
          ...property,
          [x]: { ...names[x], value: "", isValid: true, message: null },
          period: {value: newPeriod, isValid: true, message: null}
        };
        setProperty(data)
      }
    }
  }

  const deselectStatusHandler = (e) => {
    let names = `${e.split(" ").join("").toLowerCase()}_price`
    const newStatus = status.value.filter(val => val !== e)
    const state = JSON.parse(JSON.stringify(property));
    for(let x in state){
      if(x === names){
        const data = {
          ...property,
          [x]: { ...names[x], value: "", isValid: true, message: null },
          status: {value: newStatus, isValid: true, message: null},
          leasehold_period: { value: "", isValid: true, message: null },
        };
        setProperty(data)
      }
    }
  }
  //========= INPUT CHANGE HANDLER ==========//
  
  //========= SUBMIT HANDLER ==========//
  const submitHandler = (e) => {
    e.preventDefault()
    if(propertyImageIsValid(imageList, setImageList) && 
       propertyFormIsValid(property, setProperty, VILLA_CHECK_ID, LAND_CHECK_ID)){
      const date = moment(new Date()).format('DD MMMM YYYY')
      const formData = new FormData();
      imageList.image.value.forEach(file => {
        formData.append('images', file.originFileObj)
      })
      formData.append('name', name.value);
      formData.append('type_id', +type_id.value);
      formData.append('region_id', +region_id.value);
      formData.append('property_for', property_for.value.join(","))
      formData.append('land_size', +land_size.value);
      formData.append('description', description.value);
      formData.append('hotdeal', hotdeal.value);

      // CHECK FOR YOUTUBE
      if(!validator.isEmpty(youtube.value)) formData.append('youtube', youtube.value);

      // #PORPERTY FOR SALE
      if(validator.isIn("Sale", property_for.value) && type_id.value !== LAND_CHECK_ID){ // for any type except land
        formData.append('status', status.value.join(","));
      }
      if(validator.isIn("Sale", property_for.value) && type_id.value === LAND_CHECK_ID){
        formData.append('status', status.value);
      }
      if(validator.isIn("Rent", property_for.value) && 
         !validator.isIn("Sale", property_for.value) && 
         status.value.length < 1){
        formData.append('status', "Free Hold");
      }
      //if(property_for.value.length < 1 && status.value.length < 1) formData.append('status', "Free Hold");

      if(freehold_price.value) formData.append('freehold_price', +freehold_price.value);
      if(validator.isEmpty(freehold_price.value === null ? "" : freehold_price.value.toString()) && 
         validator.isIn("Rent", property_for.value) &&
         !validator.isIn("Sale", property_for.value)){
        formData.append('freehold_price', 1);
      }

      if(leasehold_price.value) formData.append('leasehold_price', +leasehold_price.value);
      if(validator.isEmpty(leasehold_price.value === null ? "" : leasehold_price.value.toString()) && 
         validator.isIn("Rent", property_for.value) &&
         !validator.isIn("Sale", property_for.value)){
        formData.append('leasehold_price', 1);
      }

      if(leasehold_period.value) formData.append('leasehold_period', leasehold_period.value);
      if(validator.isEmpty(leasehold_period.value) && 
         validator.isIn("Rent", property_for.value) &&
         !validator.isIn("Sale", property_for.value)){
        formData.append('leasehold_period', date);
      }
      
      // #PORPERTY FOR RENT
      if(period.value.length < 1 && type_id.value === LAND_CHECK_ID) formData.append('period', 'Daily');
      if(period.value.length > 0) formData.append('period', period.value.join(","));
      
      if(validator.isEmpty(daily_price.value === null ? "" : daily_price.value.toString()) && 
         type_id.value === LAND_CHECK_ID){
        formData.append('daily_price', 1);
      }
      if(daily_price.value) formData.append('daily_price', +daily_price.value);

      if(validator.isEmpty(weekly_price.value === null ? "" : weekly_price.value.toString()) && 
         type_id.value === LAND_CHECK_ID){
        formData.append('weekly_price', 1);
      }
      if(weekly_price.value) formData.append('weekly_price', +weekly_price.value);

      if(validator.isEmpty(monthly_price.value === null ? "" : monthly_price.value.toString()) &&
         type_id.value === LAND_CHECK_ID){
        formData.append('monthly_price', 1);
      }
      if(monthly_price.value) formData.append('monthly_price', +monthly_price.value);

      if(validator.isEmpty(annually_price.value === null ? "" : annually_price.value.toString()) &&
         type_id.value === LAND_CHECK_ID){
        formData.append('annually_price', 1);
      }
      if(annually_price.value) formData.append('annually_price', +annually_price.value);

      // #DATA FOR VILLA AND ONTHER TYPE
      if(facilities.value.length < 1 && type_id.value === LAND_CHECK_ID) formData.append('facility', 1); // FOR LAND
      if(facilities.value.length > 0) formData.append('facility', facilities.value.join(","));

      if(validator.isEmpty(bedroom.value) && type_id.value === LAND_CHECK_ID) formData.append('bedroom', 1); // FOR LAND
      if(bedroom.value) formData.append('bedroom', +bedroom.value);

      if(validator.isEmpty(bathroom.value) && type_id.value === LAND_CHECK_ID) formData.append('bathroom', 1); // FOR LAND
      if(bathroom.value) formData.append('bathroom', +bathroom.value);
    
      if(validator.isEmpty(building_size.value) && type_id.value === LAND_CHECK_ID) formData.append('building_size', 1);
      if(building_size.value) formData.append('building_size', +building_size.value);

      formData.append('location', location.value);
      formData.append('latitude', +latitude.value);
      formData.append('longitude', +longitude.value);

      axios.post('/property/create', formData, headerCfgFormData)
        .then(res => {
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setProperty(formProperty);
          setImageList(formImage);
        })
        .catch(err => {
          if (err.response && err.response.data) {
            const { images, facility } = err.response.data;
            const state = JSON.parse(JSON.stringify(property));
            if(images){
              const data = {
                ...imageList, 
                image: {...imageList.image, isValid: false, message: null}
              }
              message.error(images);
              setImageList(data)
            }
            if(facility){
              state.facilities.value = state.facilities.value;
              state.facilities.isValid = false;
              state.facilities.message = facility;
            }
            for(let key in err.response.data){
              if(state[key]){
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = err.response.data[key];
              }
            }
            setProperty(state)
          }
        })
    } // End of form validation
  }
  //========= SUBMIT HANDLER ==========//

  const showInfoHandler = () => setShowInfo(!showInfo);

  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidType = cx({ "is-invalid": !type_id.isValid });
  const invalidRegion = cx({ "is-invalid": !region_id.isValid });
  const invalidProperty_for = cx({ "is-invalid": !property_for.isValid });
  const invalidLand_size = cx({ "is-invalid": !land_size.isValid });
  const invalidYoutube = cx({ "is-invalid": !youtube.isValid });
  const invalidDescription = cx({ "is-invalid": !description.isValid });
  // Property for sale
  const invalidStatus = cx({ "is-invalid": !status.isValid });
  const invalidFreehold_price = cx({ "is-invalid": !freehold_price.isValid });
  const invalidLeasehold_price = cx({ "is-invalid": !leasehold_price.isValid });
  const invalidLeasehold_period = cx({ "is-invalid": !leasehold_period.isValid });
  // Property for rent 
  const invalidPeriod = cx({ "is-invalid": !period.isValid });

  return (
    <>
      <ImagePropertyMemo
        imageList={imageList}
        setImageList={setImageList}
      />

      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h3 className="mb-0">Add Properties Information</h3>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Row>

                    <Form.Group as={Col} xs={12} lg={4}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name"
                        placeholder="Property name"
                        className={invalidName}
                        value={name.value}
                        onChange={e => inputChangeHandler(e, "input")}
                      />
                      {name.message && (
                        <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Type</Form.Label>
                      <Select size="large"
                        style={{ width: "100%" }}
                        placeholder="Select type"
                        className={invalidType}
                        value={type_id.value}
                        onChange={e => inputChangeHandler(e, "type_id")}
                      >
                        {type_list}
                      </Select>
                      {type_id.message && (
                        <Form.Text className="text-muted fs-12 mb-n2 mt-0">{type_id.message}</Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Region</Form.Label>
                      <Select size="large"
                        style={{ width: "100%" }}
                        placeholder="Select type"
                        className={invalidRegion}
                        value={region_id.value}
                        onChange={e => inputChangeHandler(e, "region_id")}
                      >
                        {region_list}
                      </Select>
                      {region_id.message && (
                        <Form.Text className="text-muted fs-12 mb-n2 mt-0">{region_id.message}</Form.Text>
                      )}
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>For</Form.Label>
                      <Select
                        mode="multiple"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Choose..."
                        className={`${invalidProperty_for} custom_select`}
                        value={property_for.value}
                        onChange={e => inputChangeHandler(e, "property_for")}
                      >
                        {for_list}
                      </Select>
                      {property_for.message && (
                        <Form.Text className="text-muted fs-12 mb-n2 mt-0">{property_for.message}</Form.Text>
                      )}
                    </Form.Group>

                    {type_id.value.length !== 0 && type_id.value !== LAND_CHECK_ID && // for any type except land 
                      validator.isIn("Rent", property_for.value) && (
                      <Form.Group as={Col}>
                        <Form.Label>Period</Form.Label>
                        <Select
                          mode="multiple"
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Select period"
                          className={`${invalidPeriod} custom_select`}
                          value={period.value}
                          onChange={e => inputChangeHandler(e, "period")}
                          onDeselect={deselectPeriodHandler}
                        >
                          {period_list}
                        </Select>
                        {period.message && (
                          <Form.Text className="text-muted fs-12 mb-n2 mt-0">{period.message}</Form.Text>
                        )}
                      </Form.Group>
                    )}
                  </Form.Row>

                  <Form.Row>
                    {validator.isIn("Sale", property_for.value) && (
                      <Form.Group as={Col}>
                        <Form.Label>Status</Form.Label>
                        <Select
                          mode={type_id.value == LAND_CHECK_ID ? "" : "multiple"} // for land
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Select status"
                          className={invalidStatus}
                          value={status.value}
                          onChange={e => inputChangeHandler(e, "status")}
                          onDeselect={deselectStatusHandler}
                        >
                          {status_list}
                        </Select>
                        {status.message && (
                          <Form.Text className="text-muted fs-12 mb-n2 mt-0">{status.message}</Form.Text>
                        )}
                      </Form.Group>
                    )}
                    {validator.isIn("Lease Hold", status.value) && (
                      <Form.Group as={Col}>
                        <Form.Label>Leasehold Period</Form.Label>
                        <br />
                        <DatePicker size="large"
                          style={{ width: "100%" }}
                          format="DD MMMM YYYY"
                          className={invalidLeasehold_period}
                          value={leasehold_period.value && moment(`${leasehold_period.value}`, 'DD MMMM YYYY')}
                          onChange={dateSelectHandler}
                        />
                        {leasehold_period.message && (
                          <Form.Text className="text-muted fs-12 mb-n2 mt-0">{leasehold_period.message}</Form.Text>
                        )}
                      </Form.Group>
                    )}
                  </Form.Row>

                  {/* FREE HOLD & LEASE HOLD PRICE */}
                  <Form.Row>
                    {/*========= LAND =========*/}
                    {type_id.value.length !== 0 && type_id.value == LAND_CHECK_ID && // for land
                      (validator.isIn("Free Hold", status.value) || 
                      validator.isIn("Lease Hold", status.value)) &&(
                      <>
                        <Form.Group as={Col} className="mb-3">
                          <Form.Label>Land Size</Form.Label>
                          <InputGroup>
                            <Form.Control type="number" 
                              placeholder="Land Size" 
                              name="land_size" 
                              className={invalidLand_size}
                              value={land_size.value}
                              onChange={e => inputChangeHandler(e, "input")}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text className={invalidLand_size && "border-invalid"}>are</InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                          {land_size.message && (
                            <Form.Text className="text-muted fs-12 mb-n2 mt-0">{land_size.message}</Form.Text>
                          )}
                        </Form.Group>

                        {validator.isIn("Free Hold", status.value) && (
                          <Form.Group as={Col}>
                            <Form.Label>Price / are</Form.Label>
                            <InputNumber formatter={value => `USD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              parser={value => value.replace(/\USD\s?|(,*)/g, "")}
                              className={`${invalidFreehold_price} w-100`}
                              value={freehold_price.value}
                              onChange={e => inputChangeHandler(e, "freehold_price")}
                            />
                            {freehold_price.message && (
                              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{freehold_price.message}</Form.Text>
                            )}
                          </Form.Group>
                        )}

                        {validator.isIn("Lease Hold", status.value) && (
                          <Form.Group as={Col}>
                            <Form.Label>Price / are / year</Form.Label>
                            <InputNumber formatter={value => `USD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              parser={value => value.replace(/\USD\s?|(,*)/g, "")}
                              className={`${invalidLeasehold_price} w-100`}
                              value={leasehold_price.value}
                              onChange={e => inputChangeHandler(e, "leasehold_price")}
                            />
                            {leasehold_price.message && (
                              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{leasehold_price.message}</Form.Text>
                            )}
                          </Form.Group>
                        )}
                      </>
                    )}
                    {/*========= LAND =========*/}

                    {/*========= VILLA =========*/}
                    {type_id.value.length !== 0 && type_id.value !== LAND_CHECK_ID && status && status.value.map((name,i) => { 
                      let names = `${name.split(" ").join("").toLowerCase()}_price`, invalid, message, value
                      const state = JSON.parse(JSON.stringify(property));
                      for(let x in state){ // leasehold_price & freehold_price for villa
                        if(x === names){
                          invalid = cx({"is-invalid": !state[x].isValid})
                          message = state[x].message
                          value = state[x].value
                        }
                      }
                      return(
                        <Form.Group as={Col} key={i}>
                          <Form.Label>{name} Price</Form.Label>
                          <InputNumber formatter={value => `USD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={value => value.replace(/\USD\s?|(,*)/g, "")}
                            className={`${invalid} w-100`}
                            value={value}
                            onChange={e => inputChangeHandler(e, `${name.split(" ").join("").toLowerCase()}_price`)}
                          />
                          {message && (
                            <Form.Text className="text-muted fs-12 mb-n2 mt-0">{message}</Form.Text>
                          )}
                        </Form.Group>
                      )}
                    )}
                    {/*========= VILLA =========*/}
                  </Form.Row>
                  {/* FREE HOLD & LEASE HOLD PRICE */}

                  {/*PRICE VILLA FOR RENT*/} 
                  <Form.Row>
                    {period && period.value.map((name,i) => {
                      let names = `${name.toLowerCase()}_price`, invalid, message, value
                      const state = JSON.parse(JSON.stringify(property));
                      for(let x in state){
                        if(x === names){
                          invalid = cx({"is-invalid": !state[x].isValid})
                          message = state[x].message
                          value = state[x].value
                        }
                      }
                      return ( 
                        <Form.Group as={Col} key={i}>
                          <Form.Label>{name} Price</Form.Label>
                          <InputNumber formatter={value => `USD ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={value => value.replace(/\USD\s?|(,*)/g, "")}
                            className={`${invalid} w-100`}
                            value={value}
                            onChange={e => inputChangeHandler(e, `${name.toLowerCase()}_price`)}
                          />
                          {message && (
                            <Form.Text className="text-muted fs-12 mb-n2 mt-0">{message}</Form.Text>
                          )}
                        </Form.Group>
                      )}
                    )}
                  </Form.Row>
                  {/*PRICE VILLA FOR RENT*/}

                  <Form.Group>
                    <Form.Label>
                      Youtube
                      <i className="text-info ml-2">optional </i>
                      <i className="far fa-map-marker-question hov_pointer text-primary ml-2" onClick={showInfoHandler}/>
                    </Form.Label>
                    <Form.Control type="text"
                      placeholder="Youtube embed link"
                      name="youtube"
                      className={invalidYoutube}
                      value={youtube.value}
                      onChange={e => inputChangeHandler(e, "input")}
                    />
                    {youtube.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{youtube.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-0">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea"
                      rows="3" name="description"
                      className={invalidDescription}
                      value={description.value}
                      onChange={e => inputChangeHandler(e, "input")}
                    />
                    {description.message && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{description.message}</Form.Text>
                    )}
                  </Form.Group>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {type_id.value.length !== 0 && type_id.value !== LAND_CHECK_ID && (
        <BuildingInformation 
          bedroom={bedroom} 
          bathroom={bathroom}
          building_size={building_size} 
          land_size={land_size}
          facilities={facilities}
          facility_list={facility_list}
          onChange={inputChangeHandler}
          except_villa={type_id.value !== VILLA_CHECK_ID}
        />
      )}

      <LocationInformation 
        property={property}
        setProperty={setProperty}
        onChange={inputChangeHandler}
      />

      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Checkbox checked={hotdeal.value} onChange={hotdealHandler}>
              Hottest Deals ?
            </Checkbox>
            <br />
            <Button variant="danger" className="mb-4 mt-3" onClick={submitHandler}>
              Save Property
            </Button>
          </Col>
        </Row>
      </Container>

      {showInfo && (
        <InfoModalMemo show={showInfo} close={showInfoHandler} />
      )}

      <style jsx>{StyleProperty}</style>
    </>
  );
};

Property.getInitialProps = async ctx => {
  let resFacility = await axios.get('/facilities');
  ctx.store.dispatch(actions.getFacilitySuccess(resFacility.data)); 
  let resRegion = await axios.get('/regions');
  ctx.store.dispatch(actions.getRegionSuccess(resRegion.data)); 
  let resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data)); 
}

export default withAuth(Property);
