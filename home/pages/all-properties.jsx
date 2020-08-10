import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { libraries, mapContainerStyle, mapMobileContainerStyle } from "../lib/GMaps-options";
import { default_center, GMapsOptions } from "../lib/GMaps-options";
import { markerOptions, infoOptions } from "../lib/GMaps-options";
import { Input, AutoComplete, Select, Slider, Drawer } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "../components/Transition";
import { renderOptions } from "../lib/renderOptions";

import Router from 'next/router'
import axios from "../lib/axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as actions from "../store/actions";
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'
import ContainerCardMarker from "../components/Card/ContainerCardMarker";
import ContainerCardProperty from "../components/Card/ContainerCardProperty";
import MobileFilters from "../components/MobileFilter";

const formatter = new Intl.NumberFormat(['ban', 'id'])
const status_data = ["Free Hold", "Lease Hold"];

const pagination_iter = (c, m) => {
  var delta = 1,
      range = [],
      rangeWithDots = [],
      l;

  range.push(1)  
  for (let i = c - delta; i <= c + delta; i++) {
      if (i < m && i > 1) {
          range.push(i);
      }
  }  
  range.push(m);

  for (let i of range) {
      if (l) {
          if (i - l === 2) {
              rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
              rangeWithDots.push('...');
          }
      }
      rangeWithDots.push(i);
      l = i;
  }

  return rangeWithDots;
}

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

const AllProperties = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const property = useSelector(state => state.property.property)
  const dataType = useSelector((state) => state.types.types);
  const listLocation = useSelector(state => state.property.location);

  const [search, setSearch] = useState(formSearch);
  const [radius, setRadius] = useState();
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [infoWindow, setInfoWindow] = useState();
  const [current_zoom, setCurrent_zoom] = useState();
  const [current_position, setCurrent_postition] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(property.page);
  const [queryString, setQueryString] = useState();
  const [visible, setVisible] = useState(false);
  const [childVisible, setChildVisible] = useState(false);

  const { location, type_id, status, price, hotdeal } = search;

  const showDrawer = () => { setVisible(true); };
  const onClose = () => { setVisible(false); };
  const showChildDrawer = () => { setChildVisible(true); };
  const onChildClose = () => { setChildVisible(false); };
  
  //====== PAGINATION ======//
  const pageHandler = (event) => {
    setActive(+event.target.text);
    const searchData = `page=${+event.target.text}&` + queryString
    dispatch(actions.getPropertyBy(false, searchData, 10))
  };
  const prevHandler = () => {
    setActive(property.prev_num);
    const searchData = `page=${property.prev_num}&` + queryString
    dispatch(actions.getPropertyBy(false, searchData, 10))
  };
  const nextHandler = () => {
    setActive(property.next_num);
    const searchData = `page=${property.next_num}&` + queryString
    dispatch(actions.getPropertyBy(false, searchData, 10))
  };
  let pagination = []; let iter_data;
  if(property.iter_pages && property.iter_pages.length > 0) iter_data = property.iter_pages.slice(-1)[0]
  if(property.length === 0) iter_data = property.length
  for(let n of pagination_iter(property.page, iter_data)){
    let click = pageHandler;
    let disabled = false;
    if (n === "...") {
      disabled = true
    }
    if (n === +active) {
      click = null;
      disabled = true
    }
    pagination.push(
      <Pagination.Item key={n + Math.random} active={n === +active} text={n} onClick={click} disabled={disabled}>
        {n}
      </Pagination.Item>
    );
  }
  //====== PAGINATION ======//

  let q = '?'
  q = q + "per_page=1&"
  if(current_position.lat) q = q + `lat=${current_position.lat}&`
  if(current_position.lng) q = q + `lng=${current_position.lng}&`
  if(radius) q = q + `radius=${radius}&`
  if(location.value) q = q + `location=${location.value}&`
  if(type_id.value) if(type_id.value.length !== 0) q = q + `type_id=${type_id.value}&`
  if(status.value) if(status.value.length !== 0) q = q + `status=${status.value}&`
  if(price.value[0] !== 0) q = q + `min_price=${price.value[0]}&`
  if(price.value[1] !== 0) q = q + `max_price=${price.value[1]}&`
  if(hotdeal.value) q = q + `hotdeal=${hotdeal.value}`

  //====== MAPS ======//
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, libraries });
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
    setRadius(30); // 30 km
  }, []);

  const updateCenter = () => {
    if (!mapRef.current) return false;
    const newPos = mapRef.current.getCenter().toJSON();
    setCurrent_postition(newPos);
  };

  const updateZoom = () => {
    if (!mapRef.current) return false;
    const newZoom = mapRef.current.getZoom();
    setCurrent_zoom(newZoom);
  };

  const dragEnd = () => {
    if (!mapRef.current) return false;
  }

  const updateData = () => {
    if (!mapRef.current) return false;
    setInfoWindow();
    if (current_zoom) {
      if (current_zoom <= 7) {
        dispatch(actions.getPropertySuccess([]))
        return false;
      }
      if (current_zoom == 8) setRadius(60); // 60 km
      if (current_zoom == 9) setRadius(50); // 50 km
      if (current_zoom == 10) setRadius(30); // 30 km
      if (current_zoom == 11) setRadius(20); //20 km
      if (current_zoom >= 12) setRadius(10); // 10 km
      if (current_zoom >= 13) setRadius(30 / current_zoom);
    }
    setActive(1)
    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q

    Router.replace(`/all-properties${check}`)
  }

  const infoWindowHover = () => (
    <h6 className="text-center pt-3 pb-2 px-3 d-inline-block text-truncate w-150">{infoWindow.name}</h6>
  );
  const infoWindowClicked = () => (
    <ContainerCardMarker dataProperty={infoWindow} />
  )

  let infoWindowCon;
  if (isHover && infoWindow) {
    infoWindowCon = (
      <InfoWindow options={infoOptions} position={{lat: infoWindow.latitude, lng: infoWindow.longitude}}>
        {infoWindowHover()}
      </InfoWindow>
    );
  }
  if (isClick && infoWindow) {
    infoWindowCon = (
      <InfoWindow options={infoOptions} position={{lat: infoWindow.latitude, lng: infoWindow.longitude}}>
        {infoWindowClicked()}
      </InfoWindow>
    );
  }
  const onHoverWindowHandler = useCallback(data => {
    setIsHover(true); setIsClick(false); setInfoWindow(data);
  },[])
  const onClickMarkerHandler = useCallback(data => {
    setIsClick(true); setIsHover(false); setInfoWindow(data);
  },[])
  const onMapClick = () => {
    setIsHover(false); setIsClick(false); setInfoWindow();
  }

  let propTot = property.length == 0
  let dataMaps = <>{property.data && property.data.length > 0 ? property.data.length : "0"} of {propTot ? " 0 " : property.total} results</>
  if(loading){
    dataMaps = ( <> <LoadingOutlined/> Loading </>)
  }
  //====== MAPS ======//

  //====== SEARCH ======//
  const type_list = []; renderOptions(type_list, dataType, true);
  const status_list = []; renderOptions(status_list, status_data)

  const searchChangeHandler = (e, category) => {
    if (category === "location"){
      const data = { ...search, location: { value: e }, };
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
        price: { value: [0, 0] },
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
        price: { value: [0, 0] },
      };
      setSearch(data);
    }
    if (category === "status") {
      const data = { 
        ...search, 
        status: { value: e },
        period: { value: [] },
        price: { value: [0, 0] },
      };
      setSearch(data);
    }
    if (category === "price") {
      const data = { ...search, price: { value: e }, }
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
  }
  const hotdealHandler = (e) => {
    const data = {
      ...search, 
      hotdeal: { value: e.target.checked },
    };
    setSearch(data);
  }

  //set search data from home
  useEffect(() => {
    if(!searchQuery) return
    const state = JSON.parse(JSON.stringify(search));
    if(searchQuery.location){
      state.location.value = searchQuery.location
    }
    if(searchQuery.status){
      state.status.value = searchQuery.status !== "" ? [searchQuery.status] : []
    }
    if(searchQuery.type_id){
      state.type_id.value = +searchQuery.type_id
    }
    if(searchQuery.min_price){
      const min = searchQuery.min_price !== "" ? +searchQuery.min_price : 0
      state.price.value = [min, state.price.value[1]]
    }
    if(searchQuery.min_price || searchQuery.max_price){
      const max = searchQuery.max_price !== "" ? +searchQuery.max_price : 0
      state.price.value = [state.price.value[0], max]
    }
    setSearch(state)

    const dataQueryString = Object.keys(searchQuery).map(key => key + '=' + searchQuery[key]).join('&');
    setQueryString(dataQueryString)
    const searchData = `page=${active}&` + dataQueryString
    dispatch(actions.getPropertyBy(false, searchData, 10))

    return () => {}
  },[searchQuery])

  useEffect(() => {
    let qLoct = '?'
    if(location.value) qLoct = qLoct + `q=${location.value}&`
    if(type_id.value) if(type_id.value.length !== 0) qLoct = qLoct + `type_id=${type_id.value}`
    dispatch(actions.getLocation(qLoct))
  },[location.value, type_id.value])

  const searchHandler = () => {
    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q

    Router.replace(`/all-properties${check}`)
  }
  const searchHandlerMobile = () => {
    let check = q.slice(-1)
    if(check === "&") check = q.slice(0, -1)
    else check = q

    Router.replace(`/all-properties${check}`)
    setChildVisible(false)
  }
  //====== SEARCH ======//

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  const GMapsOptionsMobile = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false,
    gestureHandling: "greedy",
    zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP},
    streetViewControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP },
    fullscreenControl: false,
  };

  return (
    <>
      <Row className="mt-4rem vw-100 pl-0 pl-sm-0 pl-md-0 pl-lg-2 pl-xl-2 mr-0 ml-0">
        <Col xl={7} lg={7}>
          {/* *** SEARCH DESKTOP *** */}
          <Form className="mb-4 mt-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">
            <Form.Group>
              <Form.Label className="h1 fs-18">Location</Form.Label>
              <AutoComplete 
                className="search-input"
                options={listLocation}
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                value={location.value}
                onChange={e => searchChangeHandler(e, "location")}
              >
                <Input size="large" placeholder="Location"/>
              </AutoComplete>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} className="col-md-4">
                <Select placeholder="Type" className="w-100"
                  onChange={e => searchChangeHandler(e, "type_id")}
                  value={type_id.value}
                  allowClear
                >
                  {type_list}
                </Select>
              </Form.Group>
              <Form.Group as={Col} className="col-md-4">
                <Select placeholder="Status" className="w-100"
                  onChange={e => searchChangeHandler(e, "status")}
                  value={status.value}
                  allowClear
                >
                  {status_list}
                </Select>
              </Form.Group>
              <Form.Group as={Col} className="col-md-4">
                <Select placeholder="Price" className="w-100"
                  dropdownRender={() => (
                    <>
                      <Row>
                        <Col>
                          <Card.Body className="pb-2">
                            <h5 className="card-title fs-12 text-secondary font-weight-bold">MIN</h5>
                            <p className="font-weight-bold text-dark card-text">${formatter.format(price.value[0])}</p>
                          </Card.Body>
                        </Col>
                        <Col>
                          <Card.Body className="text-right pb-2">
                            <h5 className="card-title fs-12 text-secondary font-weight-bold">MAX</h5>
                            <p className="font-weight-bold text-dark card-text float-right">
                              ${`${formatter.format(price.value[1])}`}
                            </p>
                          </Card.Body>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="card-body pt-0">
                            <Slider range 
                              tooltipVisible={false} 
                              min={0}
                              max={1000000000}
                              step={10}
                              value={price.value}
                              onChange={e => searchChangeHandler(e, "price")}
                            />
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                >
                </Select>
              </Form.Group>
            </Form.Row>
            <Button className="btn-red-hot border-0 h-47" block onClick={searchHandler}>
              Search Now
            </Button>
          </Form>
          {/* *** SEARCH DESKTOP *** */}

          <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
            <h5 className="pt-3">
              {property.data && property.data.length > 0 ? property.data.length : '0'} Result for {type_id.value == 1 ? "Villa" : "Land"}
            </h5>
          </div>

          <p className="pt-3 mb-2 font-weight-bold d-none d-sm-none d-md-none d-lg-block d-xl-block">
            {property.data && property.data.length > 0 ? property.data.length : "0"} results
          </p>

          {property.data && property.data.length > 0 ? (
            <>
              <div className="d-none d-sm-none d-md-none d-lg-block d-xl-block">
                <ContainerCardProperty 
                  dataProperty={property} 
                  horizontal={true} 
                  mouseEnter={onHoverWindowHandler} 
                  mouseLeave={() => setIsHover(false)}
                />
              </div>
              <div className="d-block d-sm-block d-md-block d-lg-none d-xl-none">
                <ContainerCardProperty 
                  dataProperty={property} 
                  horizontal={false} 
                  mouseEnter={onHoverWindowHandler} 
                  mouseLeave={() => setIsHover(false)}
                />
              </div>
            </>
          ) : (
            // EMPTY PROPERTY
            <Container> 
              <Card className="border-0 shadow-none text-muted mt-2 pt-5 pb-5">
                <Card.Img
                  variant="top"
                  src="/static/images/no-result-property.png"
                  className="img-size mx-auto"
                />
                <Card.Body>
                  <Card.Title className="text-center">
                    No result
                  </Card.Title>
                </Card.Body>
              </Card>   
            </Container>
          )}

          <div className="mt-4 mb-4">
            {property.iter_pages && property.iter_pages.length > 0 && property.iter_pages.length > 1 && (
              <Pagination className="justify-content-center">
                <Pagination.Prev onClick={prevHandler} disabled={property.prev_num === null} />
                {pagination}
                <Pagination.Next onClick={nextHandler} disabled={property.next_num === null} />
              </Pagination>
            )}
          </div>
        </Col>

        {/* *** MAPS DESKTOP *** */}
        <Col xl={5} lg={5} className="position-sticky px-0 top-4rem card-wrapper d-none d-sm-none d-md-none d-lg-block d-xl-block">
          <AnimatePresence exitBeforeEnter key={loading}>
            <span className="position-absolute text-searching badge-light text-center">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={Fade}
              >
                {dataMaps}
              </motion.div>
            </span>
          </AnimatePresence>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            onCenterChanged={updateCenter}
            onZoomChanged={updateZoom}
            onDragEnd={dragEnd}
            center={default_center}
            options={GMapsOptions}
            onIdle={updateData}
            onLoad={onMapLoad}
            onClick={onMapClick}
            zoom={10}
          >
            {property && property.data && property.data.map(prop => (
              <Marker key={prop.id} 
                icon={markerOptions} 
                position={{ lat: prop.latitude, lng: prop.longitude }} 
                onClick={() => onClickMarkerHandler(prop)}
              />
            ))}
            {infoWindowCon}
          </GoogleMap>
        </Col>
        {/* *** MAPS DESKTOP *** */}
      </Row>

      <Row className="fixed-bottom text-center mb-3 d-block d-sm-block d-md-block d-lg-none d-xl-none">
        <Col>
          <Button variant="dark" className="badge-pill px-3 py-2 fs-14 shadow" onClick={showDrawer}>
            <i className="far fa-map mr-2" />Map
          </Button>
        </Col>
      </Row>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{padding: 0}}
        className="drawer-map d-block d-sm-block d-md-block d-lg-none d-xl-none"
        height="100vh"
        zIndex="1030"
      >
        <AnimatePresence exitBeforeEnter key={loading}>
          <span className="position-absolute text-searching-mobile badge-light text-center">
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={Fade}
            >
              {dataMaps}
            </motion.div>
          </span>
        </AnimatePresence>
        <div className="position-absolute close-mobile-search">
          <Button className="fm-button" variant="light" onClick={onClose}>
            <i className="fas fa-times" />
          </Button>
          <br />
          <Button className="fm-button" variant="light" onClick={showChildDrawer}>
            <i className="fas fa-sliders-h" />
          </Button>
        </div>
        <GoogleMap
          mapContainerStyle={mapMobileContainerStyle}
          onCenterChanged={updateCenter}
          onZoomChanged={updateZoom}
          onDragEnd={dragEnd}
          options={GMapsOptionsMobile}
          center={default_center}
          onIdle={updateData}
          onLoad={onMapLoad}
          onClick={onMapClick}
          zoom={10}
        >
          {property && property.data && property.data.map(prop => (
            <Marker 
              key={prop.id} 
              icon={markerOptions} 
              position={{ lat: prop.latitude, lng: prop.longitude }} 
              onClick={() => onClickMarkerHandler(prop)}
            />
          ))}
          {infoWindowCon}
        </GoogleMap>
      </Drawer>

      <Drawer
        placement="bottom"
        title="Filters"
        onClose={onChildClose}
        closeIcon={ <i className="fas fa-times" /> }
        visible={childVisible}
        height="90vh"
        zIndex="1031"
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        footer={
          <div style={{ textAlign: 'right' }} >
            <Button 
              variant="link" 
              className="mr-2 rounded-0 text-reset"
              onClick={onChildClose}
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
        :global(.page-link){
          border-radius: 2px;
          margin-left: 5px;
          color: #021927;
        }
        :global(.page-item.active .page-link){
          background-color: #021927;
          border-color: #021927;
        }
        :global(.page-link:hover){
          color: #021927;
        }
        :global(.page-item.disabled .page-link){
          color: #9c9c9c;
        }
        :global(.page-link:focus){
          box-shadow: 0 0 0 0.2rem rgba(84, 84, 84, 0.25);
        }
        :global(.carousel .slide) {
          min-width: 100%;
          margin: 0;
          position: relative;
          text-align: center;
          /* background: #000; */
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }       
        :global(.carousel-horizontal > .carousel-root .carousel .slide) {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        :global(.ribbon) {
          width: 160px;
          height: 28px;
          font-size: 12px;
          text-align: center;
          color: #fff;
          font-weight: bold;
          box-shadow: 0px 2px 3px rgba(136, 136, 136, 0.25);
          background: #ff385c;
          transform: rotate(-45deg);
          position: absolute;
          left: -54px;
          top: 12px;
          padding-top: 3px;
          z-index: 10;
          line-height: 2;
        }
        :global(.card-wrapper) {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 4rem);
        }
        :global(.card-wrapper::-webkit-scrollbar) {
          display: none;
        }
        :global(.mt-4rem){
          margin-top: 4rem;
        }
        :global(.top-4rem){
          top: 4rem;
        }
        :global(.ant-select-selection-placeholder, .ant-input::placeholder){
          opacity: 0.4;
          font-size: 14px;
          color: black;
        }
        :global(.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
          border-color: rgb(162, 162, 162);
          border-radius: 0.25rem;
        }
        :global(.ant-input:focus, .ant-input-focused, .ant-input:hover, 
                .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector
        ){
          border: 1px solid rgb(162, 162, 162);
          border-radius: 0.25rem;
          box-shadow: none;
        }
        :global(.search-input){
          width: 100%;
        }
        :global(.ant-select-single .ant-select-selector .ant-select-selection-search-input){
          width: 100%;
          border-radius: 0.25rem;
          padding: 10px 15px;
        }
        :global(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
          height: 47px;
          padding: 8px 11px;
          border-radius: 0.25rem;
        }

        :global(.text-searching) {
          z-index: 10;
          margin: 0 auto;
          top: 2.3rem;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
          align-items: center !important;
          justify-content: center !important;
          background: rgb(255, 255, 255) !important;
          border-radius: 8px !important;
        }

        :global(.anticon){
          vertical-align: 0;
        }
        :global(.drawer-map > .ant-drawer-content-wrapper){
          top: 0;
        }
        :global(.filter-mobile-search){
          right: 0;
          z-index: 10;
          border-radius: 8px !important;
        }
        :global(.close-mobile-search){
          z-index: 10;
          border-radius: 8px !important;
        }
        :global(.filter-mobile-search, .close-mobile-search > .fm-button){
          border-radius: 8px !important;
          margin: 10px;
          width: 40px;
          height: 40px;
          align-items: center;
          padding: 0;
          background-color: white;
        }
        :global(.text-searching-mobile) {
          z-index: 10;
          margin: 10px auto;
          top: 20px;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 500;
          align-items: center !important;
          justify-content: center !important;
          background: rgb(255, 255, 255) !important;
          border-radius: 8px !important;
        }
        
        /*### EMPTY CARD ###*/                                                                                          
        :global(.img-size) {
          width: auto;
          height: 100px;
          opacity: 0.5;
        }

      `}</style>
    </>
  );
};

AllProperties.getInitialProps = async ctx => {
  const searchQuery = ctx.query;
  const dataQueryString = Object.keys(searchQuery).map(key => key + '=' + searchQuery[key]).join('&');

  ctx.store.dispatch(actions.getPropertyStart())
  const resProperty = await axios.get(`/properties?${dataQueryString}`);
  ctx.store.dispatch(actions.getPropertySuccess(resProperty.data)); 

  const resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data));
  return { searchQuery: searchQuery }
}

export default AllProperties;
