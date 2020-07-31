import { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";

const Advanced = ({ hide }) => {
  const [bedroom, setBedroom] = useState("Bedrooms");
  const [bathroom, setBathroom] = useState("Bathrooms");
  const [area, setArea] = useState("Build-up Area");
  const [year, setYear] = useState("Year build");
  const buildArea = [{ name: "Adana" }, { name: "Ankara" }, { name: "Bursa" }];
  const list = [
    { label: "Air Conditioning" },
    { label: "Lawn" },
    { label: "Swimming Pool" },
    { label: "Barbeque" },
    { label: "Microwave" },
    { label: "TV Cable" },
    { label: "Dryer" },
    { label: "Outdoor Shower" },
    { label: "Washer" },
    { label: "Gym" },
    { label: "Refrigerator" },
    { label: "WiFi" },
    { label: "Laundry" },
    { label: "Sauna" },
    { label: "Window Coverings" },
  ];

  const bedroomHandler = (e) => setBedroom(e);
  const bathroomHandler = (e) => setBathroom(e);
  const yearBuildHandler = (e) => setYear(e);
  const areaHandler = (e) => setArea(e);

  return (
    <>
      <div className="toast-body p-4" onClick={(e) => e.stopPropagation()}>
        <div className="row p15 mb-3">
          <div className="col-lg-12">
            <h4 className="text-thm3 mb-3 text-dark">Amenities</h4>
          </div>
          {list.map((item) => (
            <Col lg={3} md={4} key={item.label}>
              <div className="custom-control custom-checkbox text-dark">
                <input
                  type="checkbox"
                  className="form-check-input custom-control-input"
                  id={item.label}
                />
                <label className="form-check-label custom-control-label" htmlFor={item.label}>
                  {item.label}
                </label>
              </div>
            </Col>
          ))}
        </div>
        <Row>
          <Col md={2}>
            <Dropdown drop="up" className="more-util">
              <Dropdown.Toggle variant="white" className="border rounded h-50 w-150 text-left">
                {bedroom}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropown-more max-h-175px overflow-auto">
                {[...Array(8)].map((x, i) => (
                  <Dropdown.Item key={i} onSelect={bedroomHandler} eventKey={i + 1}>
                    {i + 1}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown drop="up" className="more-util">
              <Dropdown.Toggle variant="white" className="border rounded h-50 w-150 text-left">
                {bathroom}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropown-more max-h-175px overflow-auto">
                {[...Array(8)].map((x, i) => (
                  <Dropdown.Item key={i} onSelect={bathroomHandler} eventKey={i + 1}>
                    {i + 1}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={{ offset: 1 }} className="align-self-center text-right text-danger">
            <span className="ml-auto font-weight-bold hov_pointer pr-3" onClick={hide}>
              Hide
            </span>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        /*DROPDOWN MORE*/
        :global(.dropdown-more) {
          z-index: 10 !important;
        }
        :global(.dropdown-item-status) {
          color: #484848;
          font-size: 14px;
          line-height: 2;
          width: 100%;
        }
        :global(.dropdown-item.active) {
          background-color: white;
        }
        :global(.dropdown-item-status > .check-mark) {
          display: none;
        }
        /*DROPDOWN MORE*/
        input[type="checkbox"],
        input[type="radio"] {
          height: 17px;
          width: 17px;
        }
        .custom-control-label::before {
          border-radius: 4px;
        }
        .custom-control-label::after {
          left: -1.4rem;
          top: 5px;
        }
        .custom-control-label:focus,
        .custom-control:focus {
          outline: none;
        }
        .custom-control-label::before {
          background-color: #ffffff;
          border: 1px solid #dddddd;
          height: 18px;
          top: 0.25rem;
          width: 18px;
        }
        .custom-control-input:checked ~ .custom-control-label::before {
          background-color: #ff5a5f;
          border-color: #ff5a5f;
        }
        .custom-control-label {
          color: #4f4f4f;
          font-size: 14px;
          justify-content: left;
          line-height: 28px;
          margin: 0 0 10px;
          outline: none;
          padding-left: 7px;
          padding-right: 15px;
          width: 100%;
        }
        .custom-control-label span {
          color: #c1c1c1;
          font-size: 14px;
        }
        :global(.more-util > .show) {
          position: absolute;
          top: unset !important;
          left: 0px;
          margin: 0px;
          right: auto;
          bottom: 0px !important;
          transform: translate3d(0px, -50px, 0px) !important;
        }
      `}</style>
    </>
  );
};

export default Advanced;

