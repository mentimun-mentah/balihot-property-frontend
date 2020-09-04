import { useState, useEffect } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { Upload, message } from "antd";
import { uploadButton, getBase64 } from "../../../lib/imageUploader";
import { formNews, formImage, formDescription } from "../../../components/Newsletter/newsData";
import { formIsValid, formDescIsValid, formImageIsValid } from "../../../lib/validateFormNews.js";

import _ from "lodash";
import cx from "classnames";
import cookie from "nookies";
import Router from "next/router";
import dynamic from 'next/dynamic'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PreviewImage from "../../../components/PreviewImage";
import axios, { formHeaderHandler } from "../../../lib/axios"

const PreviewImageMemo = React.memo(PreviewImage)
const Editor = dynamic(import('../../../components/Editor'), { ssr: false })

const EditNewsLetter = ({ dataNewsletter }) => {
  const [news, setNews] = useState(formNews);
  const [imageList, setImageList] = useState(formImage);
  const [content, setContent] = useState(formDescription);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState({ image: "", title: "" });

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("image", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios.put(`/newsletter/crud/${dataNewsletter.id}`, formData, formHeaderHandler())
      .then(() => { resolve(file); setLoading(false); })
      .catch(err => {
        const { image } = err.response.data;
        const status = err.response.status;
        if((status == 401 || status == 422) && (file.size / 1024 / 1024 > 6)){
          message.error("Image cannot grater than 6 Mb")
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
    const data = {
      ...imageList,
      image: {value: newFileList, isValid: true, message: null}
    }
    setImageList(data)
  };

  const inputChangeHandler = e => {
    const { name, value } = e.target;
    const data = {
      ...news,
      [name]: { ...news[name], value: value, message: null, isValid: true }
    };
    setNews(data);
  };

  const descriptionHandler = content => {
    setContent({
      description: { value: content, message: null, isValid: true }
    });
  }

  const submitHandler = e => {
    e.preventDefault();
    if (formIsValid(news, setNews) && 
        formDescIsValid(content, setContent) && 
        formImageIsValid(imageList, setImageList)){
      const { image } = imageList;
      const { title } = news;
      const { description } = content;
      const formData = new FormData();
      _.forEach(image.value, (file) => {
        if(!file.hasOwnProperty('url')){
          formData.append('image', file.originFileObj)
        }
      })
      formData.append('title', title.value.charAt(0).toUpperCase() + title.value.slice(1));
      formData.append('description', description.value)

      axios.put(`/newsletter/crud/${dataNewsletter.id}`, formData, formHeaderHandler())
        .then(res => {
          Router.replace("/admin/manage-newsletter", "/admin/manage-newsletter")
          swal({ title: "Success", text: res.data.message, icon: "success", timer: 3000 });
          setNews(formNews)
          setImageList(formImage)
          setContent(formDescription);
        }) 
        .catch(err => {
          const state = JSON.parse(JSON.stringify(news));
          const contentState = JSON.parse(JSON.stringify(content));
          if (err.response && err.response.data) {
            const { image, title, description } = err.response.data;
            if(image){
              const data = {
                ...imageList, 
                image: {...imageList.image, isValid: false, message: null}
              }
              message.error(image);
              setImageList(data)
            }
            if(title) {
              state.title.isValid = false;
              state.title.message = title;
            }
            if(description) {
              contentState.description.isValid = false;
              contentState.description.message = description;
            }
          }
          setNews(state);
          setContent(contentState)
        });
    }
  }
  
  //========= SET DATA FROM SERVER ==========//
  useEffect(() => {
    if(dataNewsletter){
      const { id, slug, title, description, image } = dataNewsletter;

      const imageData = {
        image: { 
          value: [{
            uid: -Math.abs(id),
            url: `${process.env.API_URL}/static/newsletters/${slug}/${image}`
          }], 
          isValid: true, 
          message: null 
        },
      }
      const data = {
        id: id,
        title: { value: title, isValid: true, message: null }
      }
      const dataDesc = {
        description: { value: description, isValid: true, message: null }
      }
      setNews(data);
      setImageList(imageData);
      setContent(dataDesc);
    }
  },[])
  //========= SET DATA FROM SERVER ==========//

  const { image } = imageList;
  const { title } = news;
  const { description } = content;
  const invalidTitle = cx({ "is-invalid": !title.isValid });

  return(
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
              <Card.Header>
                <h3 className="mb-0">
                  Edit Newsletter <small> (3003 × 1287 px)</small>
                </h3>
                <small className="text-muted fs-12">
                  Image format .jpg. jpeg .png and maximum image size is 6 MB
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
                    <Form.Label>News Title</Form.Label>
                    <Form.Control type="text" name="title"
                      placeholder="News Title"
                      className={invalidTitle}
                      value={title.value}
                      onChange={inputChangeHandler}
                    />
                    {!title.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{title.message}</Form.Text>
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
                    Save Newsletter
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

EditNewsLetter.getInitialProps = async ctx => {
  const { id } = ctx.query;
  try{
    const { access_token } = cookie.get(ctx);
    const headerCfgServer = { headers: { Authorization: `Bearer ${access_token}` } };
    let res = await axios.get(`/newsletter/crud/${id}`, headerCfgServer)
    return{
      dataNewsletter: res.data,
    }
  }
  catch {}
}

export default withAuth(EditNewsLetter)
