import { useState, useEffect } from "react";
import { Upload } from "antd";
import { useDispatch } from "react-redux";
import { uploadButton } from "../../lib/imageUploader";
import { formIsValid, formImageIsValid } from "../../lib/validateFormTeams";

import * as actions from "../../store/actions";
import axios, { formHeaderHandler } from '../../lib/axios'
import cx from 'classnames'
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import InputGroup from "react-bootstrap/InputGroup";

const EditModal = props => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState(props.currentTeam);
  const [imageList, setImageList] = useState(props.imageList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTeam(props.currentTeam);
    setImageList(props.imageList);
  },[props])

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("image", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);

      axios.put(`/team/crud/${team.id}`, formData, formHeaderHandler())
      .then(() => { resolve(file); setLoading(false); })
      .catch(err => {
        setLoading(false)
        const status = err.response.status;
        if((status == 401 || status == 422) && (file.size / 1024 / 1024 > 4)){
          message.error("Image cannot grater than 4 Mb")
          reject(file)
          setLoading(false)
        }
        if (err.response && err.response.data) {
          const { image } = err.response.data;
          if(image) {
            const data = {
              ...imageList, 
              image: {value: [], isValid: false, message: image}
            }
            setImageList(data); reject(file); setLoading(false);
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
      ...team,
      [name]: { ...team[name], value: value, isValid: true, message: null }
    };
    setTeam(data);
  };

  // Function for image changing
  const imageChangeHandler = ({ fileList: newFileList }) => {
    const data = {
      ...imageList,
      image: {value: newFileList, isValid: true, message: null}
    }
    setImageList(data)
  };

  const submitHandler = e => {
    e.preventDefault()
    if(formIsValid(team, setTeam) && formImageIsValid(imageList, setImageList)){
      const { image } = imageList;
      const { name, phone, title } = team;
      const formData = new FormData();
      _.forEach(image.value, (file) => {
        if(!file.hasOwnProperty('url')){
          formData.append('image', file.originFileObj)
        }
      })
      formData.append("name", name.value);
      formData.append("phone", phone.value);
      formData.append("title", title.value);
      axios.put(`/team/crud/${team.id}`, formData, formHeaderHandler())
        .then(() => {
          dispatch(actions.getTeam())
          props.close()
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(team));
          if (err.response && err.response.data) {
            const { image, name, phone, title } = err.response.data;
            if(image){
              const data = {
                ...imageList, 
                image: {...imageList.image, isValid: false, message: image}
              }
              setImageList(data)
            }
            if(name){
              state.name.isValid = false;
              state.name.message = name;
            }
            if(phone){
              state.phone.isValid = false;
              state.phone.message = phone;
            }
            if(title){
              state.title.isValid = false;
              state.title.message = title;
            }
          }
          setTeam(state);
        })
    }
  }

  const { image } = imageList;
  const { name, phone, title } = team;
  const invalidImage = cx({ "invalid-upload": !image.isValid });
  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidPhone = cx({ "is-invalid": !phone.isValid });
  const invalidTitle = cx({ "is-invalid": !title.isValid });
  
  return(
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>Edit {props.currentTeam.name.value}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Form.Group className="mb-0">
            <p className="mb-3 lh-100">
              <small className="text-muted fs-12">
                366 × 457 px
              </small>
              <br />
              <small className="text-muted fs-12">
                Image format .jpg. jpeg .png and maximum image size is 4 MB
              </small>
            </p>
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
          <Form.Group className="mt-1">
            <Form.Label>Team Name</Form.Label>
            <Form.Control type="text" name="name"
              className={invalidName}
              onChange={inputChangeHandler}
              value={name.value}
              placeholder="Enter name"
            />
            {!name.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Team Title</Form.Label>
            <Form.Control type="text" name="title"
              value={title.value}
              className={invalidTitle}
              onChange={inputChangeHandler}
              placeholder="Enter title"
            />
            {!title.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{title.message}</Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className={invalidPhone && "border-invalid"}>
                  +62
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="number" name="phone"
                value={phone.value}
                className={invalidPhone}
                onChange={inputChangeHandler}
                placeholder="8512341234"
              />
            </InputGroup>
            {!phone.isValid && (
              <Form.Text className="text-muted fs-12 mb-n2 mt-0">{phone.message}</Form.Text>
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
