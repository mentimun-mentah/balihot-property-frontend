import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formFacility } from "./facilityData";
import { formIsValid } from "../../lib/validateFormFacilities";

import * as actions from "../../store/actions";
import axios, {headerCfg} from '../../lib/axios'
import cx from "classnames";
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

const EditModal = props => {
  const dispatch = useDispatch();
  const [facility, setFacility] = useState(formFacility);

  useEffect(() => {
    setFacility(props.currentFacility);
  }, [props]);

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
    event.preventDefault();
    const {name, icon} = facility;
    if (formIsValid(facility, setFacility)) {
      const data = {
        name: name.value,
        icon: icon.value
      };
      axios.put(`/facility/crud/${facility.id}`, data, headerCfg)
        .then(() => {
          dispatch(actions.getFacility())
          props.close()
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
  };

  const { name, icon } = facility;
  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidIcon = cx({ "is-invalid": !icon.isValid });

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {props.currentFacility.name.value}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Facilities Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className={invalidName}
              value={name.value}
              onChange={inputChangeHandler}
              placeholder="Facilities Name"
            />
            {!name.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-0">
            <Form.Label>Icon</Form.Label>
            <Form.Control
              type="text"
              name="icon"
              className={invalidIcon}
              value={icon.value}
              onChange={inputChangeHandler}
              placeholder="fal fa-bed"
            />
            {!icon.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{icon.message}</Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={props.close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default EditModal;
