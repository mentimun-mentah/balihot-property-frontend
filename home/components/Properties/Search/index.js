import { useState } from "react";
import { Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import Range from "rc-slider/lib/Range";
import AutoSuggest from "./AutoSuggest";

const SearchBox = () => {
  const [price, setPrice] = useState([1000, 150000]);
  const priceHandler = (value) => setPrice(value);
  return (
    <Form>
      <Form.Group>
        <Form.Label className="map-search-title">Location</Form.Label>
        <AutoSuggest />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} className="col-md-4">
          <Dropdown className="border rounded">
            <Dropdown.Toggle
              id="dropdown-property"
              variant="white"
              className="h-50 text-left w-100 dropdown-text-turncate"
            >
              <span className="text">Type</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item className="dropdown-text-turncate">
                <span className="text">Villa</span>
                <span className="float-md-right check-mark">
                  <i className="fad fa-check"></i>
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group as={Col} className="col-md-4">
          <Dropdown className="border rounded">
            <Dropdown.Toggle
              id="dropdown-property"
              variant="white"
              className="h-50 text-left w-100 dropdown-text-turncate"
            >
              <span className="text">Status</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item className="dropdown-text-turncate">
                <span className="text">Short Term</span>
                <span className="float-md-right check-mark">
                  <i className="fad fa-check"></i>
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group as={Col} className="col-md-4">
          <Dropdown className="border rounded">
            <Dropdown.Toggle
              id="dropdown-property"
              variant="white"
              className="h-50 text-left w-100 dropdown-text-turncate"
            >
              <span className="text">Price</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
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
                      onChange={priceHandler}
                    />
                  </div>
                </Col>
              </Row>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form.Row>
      <Button className="btn-red-hot border-0 h-50" block>
        Search Now
      </Button>
    </Form>
  );
};

export default SearchBox;
