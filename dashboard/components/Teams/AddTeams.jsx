import { useState } from "react";
import { useDispatch } from "react-redux";
import { Upload, message } from "antd";
import { formTeam } from "./formTeams";
import { formIsValid } from "../../lib/validateFormTeams";
import { uploadButton, getBase64 } from "../../lib/imageUploader";

import axios, { formHeaderHandler } from "../../lib/axios"
import * as actions from "../../store/actions";
import _ from "lodash";
import swal from "sweetalert";
import cx from "classnames";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";

import PreviewImage from "../PreviewImage";
const PreviewImageMemo = React.memo(PreviewImage);

const AddTeams = () => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState(formTeam);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState({ image: "", title: "" });

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("image", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios.post("/team/create", formData, formHeaderHandler())
      .then(() => { resolve(file); setLoading(false); })
      .catch(err => {
        const { image } = err.response.data;
        const status = err.response.status;
        if((status == 401 || status == 422) && (file.size / 1024 / 1024 > 4)){
          message.error("Image cannot grater than 4 Mb")
          reject(file)
          setLoading(false)
        }
        if(image) {
          message.error(image);
          reject(file);
          setLoading(false);
        } else {
          resolve(file);
          setLoading(false);
        }
      });
    });
    return promise;
  };

  // Function for show image preview
  const showPreviewHandler = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const data = {
      ...previewImage,
      image: file.url || file.preview,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    };
    setShowPreview(true);
    setPreviewImage(data);
  };

  // Function for image changing
  const imageChangeHandler = ({ fileList: newFileList }) => {
    setTeam({
      ...team,
      image: { value: newFileList, message: null, isValid: true }
    });
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    const data = {
      ...team,
      [name]: { ...team[name], value: value, message: null, isValid: true }
    };
    setTeam(data);
  };

  // Function for submitting value
  const submitHandler = e => {
    e.preventDefault();
    if(formIsValid(team, setTeam)){
      const {image, name, title, phone} = team
      const formData = new FormData();
      _.forEach(image.value, (file) => {
        formData.append('image', file.originFileObj)
      })
      formData.append("name", name.value);
      formData.append("title", title.value);
      formData.append("phone", phone.value);

      axios.post("/team/create", formData, formHeaderHandler())
        .then(res => {
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setTeam(formTeam);
          dispatch(actions.getTeam())
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(team));
          if(err.response && err.response.data) {
            const { image, name, title, phone } = err.response.data;
            if(image){
              state.image.isValid = false;
              state.image.value = [];
              message.error(image);
            }
            if(name){
              state.name.isValid = false;
              state.name.message = name;
            }
            if(title){
              state.title.isValid = false;
              state.title.message = title;
            }
            if(phone){
              state.phone.isValid = false;
              state.phone.message = phone;
            }
          }
          setTeam(state);
        });
    }
  };

  const { image, name, phone, title } = team;
  const invalidName = cx({ "is-invalid": !name.isValid });
  const invalidPhone = cx({ "is-invalid": !phone.isValid });
  const invalidTitle = cx({ "is-invalid": !title.isValid });

  return(
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h3 className="mb-0">
                  Add Teams <small> (366 × 457 px)</small>
                </h3>
                <small className="text-muted fs-12">
                  Image format .jpg. jpeg .png and maximum image size is 4 MB
                </small>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-2">
                    <Upload
                      accept="image/*"
                      listType="picture-card"
                      fileList={image.value}
                      onPreview={showPreviewHandler}
                      onChange={imageChangeHandler}
                      beforeUpload={validateImage}
                    >
                      {image.value.length >= 1 ? null : uploadButton(loading)}
                    </Upload>
                  </Form.Group>
                  <Form.Group>
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
                  <Button variant="danger" onClick={submitHandler}>
                    Save Team
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {showPreview && (
        <PreviewImageMemo
          show={showPreview}
          hide={() => setShowPreview(false)}
          title={previewImage.title}
          image={previewImage.image}
        />
      )}
    </>
  )
}

export default AddTeams;
