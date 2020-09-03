import { useState } from "react";
import { useDispatch } from "react-redux";
import { formFacility } from "./facilityData";
import { formIsValid } from "../../lib/validateFormFacilities";

import * as actions from "../../store/actions";
import axios, { jsonHeaderHandler } from "../../lib/axios";
import cx from "classnames";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import InfoModal from "./InfoModal";
const InfoModalMemo = React.memo(InfoModal);

const AddFacility = () => {
  const dispatch = useDispatch();
  const [facility, setFacility] = useState(formFacility);
  const [showInfo, setShowInfo] = useState(false);

  const showInfoHandler = () => setShowInfo(!showInfo);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...facility,
      [name]: {
        ...facility[name],
        value: value, isValid: true, message: null
      }
    };
    setFacility(data);
  };

  const submitHandler = event => {
    event.preventDefault()
    if(formIsValid(facility, setFacility)){
      const {name, icon} = facility;
      const data = {
        name: name.value,
        icon: icon.value
      }
      axios.post('/facility/create', data, jsonHeaderHandler())
        .then(res => {
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setFacility(formFacility);
          dispatch(actions.getFacility())
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(facility));
          if (err.response && err.response.data) {
            const {name, icon} = err.response.data;
            if(name){
              state.name.isValid = false;
              state.name.message = name;
            }
            if(icon){
              state.icon.isValid = false;
              state.icon.message = icon;
            }
          }
          setFacility(state);
        })
    }
  }

  const { name, icon } = facility;
  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidIcon = cx({ "is-invalid": !icon.isValid });

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h4>Add Facilities</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Facilities Name</Form.Label>
                    <Form.Control name="name" type="text"
                      placeholder="Facilities name"
                      className={invalidName}
                      onChange={inputChangeHandler}
                      value={name.value}
                    />
                    {!name.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Icon Fontawesome Name{" "}
                      <i
                        className="far fa-map-marker-question hov_pointer text-primary ml-2"
                        onClick={showInfoHandler}
                      />
                    </Form.Label>
                    <Form.Control name="icon" type="text"
                      placeholder="fal fa-bed"
                      className={invalidIcon}
                      onChange={inputChangeHandler}
                      value={icon.value}
                    />
                    {!icon.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{icon.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Save Facilities
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

      {showInfo && (
        <InfoModalMemo show={showInfo} close={showInfoHandler} />
      )}

    </>
  )
}

export default AddFacility
