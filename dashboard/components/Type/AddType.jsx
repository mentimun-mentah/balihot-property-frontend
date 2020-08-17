import { useState } from "react";
import { useDispatch } from "react-redux";
import { formType } from "./formType";
import { formIsValid } from "../../lib/validateFormTypes";

import * as actions from "../../store/actions";
import axios, { headerCfg } from "../../lib/axios";
import cx from "classnames";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddType = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(formType);
  const [showInfo, setShowInfo] = useState(false);

  const showInfoHandler = () => setShowInfo(!showInfo);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...type,
      [name]: {
        ...type[name],
        value: value, isValid: true, message: null
      }
    };
    setType(data);
  };

  const submitHandler = event => {
    event.preventDefault()
    if(formIsValid(type, setType)){
      const {name} = type;
      const data = { name: name.value }
      axios.post('/type/create', data, headerCfg)
        .then(res => {
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setType(formType);
          dispatch(actions.getType())
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(type));
          if (err.response && err.response.data) {
            const {name} = err.response.data;
            if(name){
              state.name.isValid = false;
              state.name.message = name;
            }
          }
          setType(state);
        })
    }
  }

  const { name } = type;
  const invalidName = cx({ "is-invalid": !name.isValid });

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h4>Add Type</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Type Name</Form.Label>
                    <Form.Control name="name" type="text"
                      placeholder="Type name"
                      className={invalidName}
                      onChange={inputChangeHandler}
                      value={name.value}
                    />
                    {!name.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Save Type
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

    </>
  )
}

export default AddType
