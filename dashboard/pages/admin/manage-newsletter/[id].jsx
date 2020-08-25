import { useState } from "react";
import { withAuth } from "../../../hoc/withAuth"
import { Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { uploadButton, getBase64 } from "../../../lib/imageUploader";
import { formNews, formDescription } from "../../../components/Newsletter/newsData";
import { formIsValid, formDescIsValid } from "../../../lib/validateFormNews.js";

import cx from "classnames";
import dynamic from 'next/dynamic'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PreviewImage from "../../../components/PreviewImage";

const PreviewImageMemo = React.memo(PreviewImage)
const Editor = dynamic(import('../../../components/Editor'), { ssr: false })

const EditNewsLetter = () => {
  const [news, setNews] = useState(formNews);
  const [content, setContent] = useState(formDescription);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState({ image: "", title: "" });

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
    setNews({
      ...news,
      image: { value: newFileList, message: null, isValid: true }
    });
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
    if(formIsValid(news, setNews) && formDescIsValid(content, setContent)){
      const { image, title, short_description } = news;
      const { description } = content;
      const data = {
        image: image.value,
        title: title.value,
        short_description: short_description.value,
        description: description.value
      }
      console.log(data)
    }
  }

  const { image, title, short_description } = news;
  const { description } = content;
  const invalidTitle = cx({ "is-invalid": !title.isValid });
  const invalidShortDesc  = cx({ "is-invalid": !short_description.isValid });

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
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control as="textarea"
                      rows="2" name="short_description"
                      placeholder="Short description"
                      className={invalidShortDesc}
                      value={short_description.value}
                      onChange={inputChangeHandler}
                    />
                    {!short_description.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{short_description.message}</Form.Text>
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

export default withAuth(EditNewsLetter)
