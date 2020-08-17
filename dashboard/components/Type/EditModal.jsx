import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formType } from "./formType";
import { formIsValid } from "../../lib/validateFormTypes";

import * as actions from "../../store/actions";
import axios, {headerCfg} from '../../lib/axios'
import cx from "classnames";
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

const EditModal = props => {
  const dispatch = useDispatch();
  const [type, setType] = useState(formType);

  useEffect(() => {
    setType(props.currentType);
  }, [props]);

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
    event.preventDefault();
    const {name} = type;
    if (formIsValid(type, setType)) {
      const data = { name: name.value };
      axios.put(`/type/crud/${type.id}`, data, headerCfg)
        .then(res => {
          dispatch(actions.getType())
          props.close()
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(type));
          if (err.response && err.response.data) {
            const {name, icon} = err.response.data;
            if(name){
              state.name.isValid = false;
              state.name.message = name;
            }
          }
          setType(state);
        })
    }
  };

  const { name } = type;
  const invalidName = cx({ "is-invalid": !name.isValid });

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {props.currentType.name.value}</Modal.Title>
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
