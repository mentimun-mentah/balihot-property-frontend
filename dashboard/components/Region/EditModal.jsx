import { useState, useEffect } from "react";
import { Upload } from "antd";
import { useDispatch } from "react-redux";
import { uploadButton } from "../../lib/imageUploader";
import { formIsValid } from "../../lib/validateFormRegion";

import * as actions from "../../store/actions";
import axios, {headerCfgFormData} from '../../lib/axios'
import cx from 'classnames'
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

const EditModal = props => {
  const dispatch = useDispatch();
  const [region, setRegion] = useState(props.currentRegion);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRegion(props.currentRegion);
  },[props])

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("image", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);

      axios.put(`/region/crud/${region.id}`, formData, headerCfgFormData)
        .then(() => { resolve(file); setLoading(false); })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(region));
          if (err.response && err.response.data) {
            const { image } = err.response.data;
            for (let key in err.response.data) {
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = err.response.data[key];
              }
            }
            if(image) {
              const data = {
                ...region, 
                image: {value: [], isValid: false, message: image}
              }
              setRegion(data); reject(file); setLoading(false);
            } else {
              resolve(file); setLoading(false);
            }
          }
        });
    });
    return promise;
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    const data = {
      ...region,
      [name]: { ...region[name], value: value, isValid: true, message: null }
    };
    setRegion(data);
  };

  const imageChangeHandler = ({ fileList: newFileList }) => {
    const data = {
      ...region,
      image: {value: newFileList, isValid: true, message: null}
    }
    setRegion(data)
  };

  const submitHandler = e => {
    e.preventDefault()
    const {name, image} = region;
    if(formIsValid(region, setRegion)){
      const formData = new FormData();
      _.forEach(image.value, (file) => {
        if(!file.hasOwnProperty('url')){
          formData.append('image', file.originFileObj)
        }
      })
      formData.append("name", name.value);
      axios.put(`/region/crud/${region.id}`, formData, headerCfgFormData)
        .then(() => {
          dispatch(actions.getRegion())
          props.close()
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(region));
          if (err.response && err.response.data) {
            const { image, name } = err.response.data;
            if (name) {
              state.name.isValid = false;
              state.name.message = name;
            }
            if (image) {
              state.image.isValid = false;
              state.image.message = image;
              state.image.value = [];
            }
          }
          setRegion(state);
        })
    }
  }

  const { name, image } = region;
  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidImage = cx({ "invalid-upload": !image.isValid });
  
  return(
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>Edit {props.currentRegion.name.value}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-0">
            <Form.Label>2000 x 3000 pixels</Form.Label>
            <Upload
              accept="image/*"
              listType="picture-card"
              className={invalidImage}
              fileList={image.value}
              onChange={imageChangeHandler}
              beforeUpload={validateImage}
            >
              {image.value.length >= 1 ? null : uploadButton(loading)}
            </Upload>
            {!image.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt--2">{image.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-0 mt-1">
            <Form.Label>Region Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className={invalidName}
              onChange={inputChangeHandler}
              value={name.value}
              placeholder="Enter region"
            />
            {!name.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={submitHandler}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={props.close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
