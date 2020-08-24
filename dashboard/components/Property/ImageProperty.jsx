import { useState, useCallback } from "react";
import { Upload, message } from "antd";
import { getBase64, uploadButton } from "../../lib/imageUploader";

import _ from 'lodash'
import axios, {headerCfgFormData} from "../../lib/axios"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import PreviewImage from "../PreviewImage";

const PreviewImageMemo = React.memo(PreviewImage)

const ImageProperty = ({imageList, setImageList, onRemove}) => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState({ image: "", title: "" });
  const {image} = imageList

  //========= IMAGE HANDLER ==========//
  // Function for validating image to the backend
  const validateImage = (file) => {
    const formData = new FormData();
   
    image.value.forEach(file => {
      formData.append('images', file.originFileObj)
    })

    let promise = new Promise((resolve, reject) => {
      setLoading(true);
      axios.post('/property/create', formData, headerCfgFormData)
      .then(() => { resolve(file); setLoading(false); })
      .catch(err => {
        const { images } = err.response.data;
        if(images){
          message.config({ duration: 5, maxCount: 1 });
          message.error(images)
          reject(file)
          setLoading(false)
          return
        }
        else{
          resolve(file)
          setLoading(false)
          return
        }
      });
    });
    return promise;
  };
  
  // Function for show image preview
  const showPreviewHandler = useCallback(async file => {
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
  },[]);

  // Function for image changing
  const imageChangeHandler = ({ fileList: newFileList, file: file }) => {
    const data = {
      ...imageList,
      image: {value: newFileList, isValid: true, message: null}
    }
    setImageList(data)
    if(file.status === "done" && imageList.image.value.length > 0) validateImage()
  };
  //========= IMAGE HANDLER ==========//

  return (
    <>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} mb={12}>
            <Card className="hov_none">
                <Card.Header>
                  <h3 className="mb-0">
                    Add Image Properties <small> (min. 5 photos & size 1200 × 800 pixels)</small>
                  </h3>
                  <small className="text-muted fs-12">
                    Image format .jpg. Jpeg .png and maximum image file size are 4 MB
                  </small>
                </Card.Header>
              <Card.Body>
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  fileList={image.value}
                  onPreview={showPreviewHandler}
                  onChange={imageChangeHandler}
                  onRemove={onRemove}
                  beforeUpload={image.value.length > 1 && validateImage}
                  disabled={loading}
                >
                  {image.value.length >= 50 ? null : uploadButton(loading)}
                </Upload>
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
  );
};

export default ImageProperty;
