import { useState } from "react";
import { Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { formRegion, formDescription } from "./regionData";
import { formIsValid, formDescIsValid } from "../../lib/validateFormRegion";
import { uploadButton, getBase64 } from "../../lib/imageUploader";

import dynamic from 'next/dynamic'
import _ from "lodash"
import cx from "classnames";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as actions from "../../store/actions";
import Container from "react-bootstrap/Container";
import axios, { formHeaderHandler } from "../../lib/axios"

const Editor = dynamic(import('../Editor'), { ssr: false })

import PreviewImage from "../PreviewImage";
const PreviewImageMemo = React.memo(PreviewImage)

const AddRegion = () => {
  const dispatch = useDispatch();
  const [region, setRegion] = useState(formRegion);
  const [previewImage, setPreviewImage] = useState({ image: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState(formDescription)

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("image", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios.post("/region/create", formData, formHeaderHandler())
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
    setRegion({
      ...region,
      image: { value: newFileList, message: null, isValid: true }
    });
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    const data = {
      ...region,
      [name]: { ...region[name], value: value, message: null, isValid: true }
    };
    setRegion(data);
  };

  const descriptionHandler = content => {
    setContent({
      description: { value: content, message: null, isValid: true }
    });
  }

  const submitHandler = e => {
    e.preventDefault();
    if (formIsValid(region, setRegion) && formDescIsValid(content, setContent)) {
      const {name, image} = region;
      const {description} = content;
      const formData = new FormData();
      _.forEach(image.value, (file) => {
        formData.append('image', file.originFileObj)
      })
      formData.append("name", name.value);
      formData.append("description", description.value);

      axios.post("/region/create", formData, formHeaderHandler())
        .then(res => {
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setRegion(formRegion);
          setContent(formDescription);
          dispatch(actions.getRegion())
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(region));
          const contentState = JSON.parse(JSON.stringify(content));
          if (err.response && err.response.data) {
            const { image, name, description } = err.response.data;
            state.image.value = [];
            if(name) {
              state.name.isValid = false;
              state.name.message = name;
            }
            if(image) {
              state.image.isValid = false;
              state.image.value = [];
              message.error(image);
            }
            if(description) {
              contentState.description.isValid = false;
              contentState.description.message = description;
            }
          }
          setRegion(state);
          setContent(contentState)
        });
    }
  };

  const { name, image } = region;
  const { description } = content;
  const invalidName = cx({ "is-invalid": !name.isValid });

  return(
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h3 className="mb-0">
                  Add Region <small> (2000 × 3000 px)</small>
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
                    <Form.Label>Region Name</Form.Label>
                    <Form.Control type="text" name="name"
                      className={invalidName}
                      onChange={inputChangeHandler}
                      value={name.value}
                      placeholder="Enter region"
                    />
                    {!name.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{name.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Editor 
                      initialValue={content.description.value}
                      setContent={descriptionHandler} 
                      height="200"
                    />
                    {!description.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{description.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="danger" onClick={submitHandler}>
                    Save Region
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

export default AddRegion
