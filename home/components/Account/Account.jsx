import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { notification, Upload, message } from 'antd';
import { uploadButton } from "../../lib/imageUploader";
import { Fade } from "../Transition";
import { formUpdatePassword, formAddPassword } from "./accountData";
import { updateAccountIsValid, changePasswordIsValid, addPasswordIsValid } from "../../lib/validateFormAccount";
import cx from "classnames";
import swal from "sweetalert";
import axios, { headerCfg, headerCfgFormData } from "../../lib/axios";
import * as actions from "../../store/actions";

const formUsername = { username: { value: "", isValid: true, message: null }, };

const Account = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);

  const [changePassword, setChangePassword] = useState(formUpdatePassword);
  const [addPassword, setAddPassword] = useState(formAddPassword);
  const [changeUsername, setChangeUsername] = useState(formUsername);
  const [loading, setLoading] = useState(false);
  const { username } = changeUsername;

  const [fileList, setFileList] = useState([]);

  // Function for validating image to the backend
  const validateImage = file => {
    const formData = new FormData();
    formData.append("avatar", file);

    let promise = new Promise((resolve, reject) => {
      setLoading(true);

      axios.put("/account/update-avatar", formData, headerCfgFormData)
        .then((res) => { 
          resolve(file); 
          setLoading(false); 
          dispatch(actions.getUser())
          notification['success']({
            message: 'Yuhuu!!!',
            description: res.data.message,
            placement: 'bottomRight',
          });
        })
        .catch(err => {
          if (err.response && err.response.data) {
            const { avatar } = err.response.data;
            if(avatar) {
              message.error({ 
                content: avatar, 
                style: { marginTop: '10vh' },
              });
              reject(file);
              setLoading(false);
            } else {
              resolve(file);
              setLoading(false);
            }
          }
        });
    });
    return promise;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  useEffect(() => {
    if(userData !== null){
      const data = {
        ...formUsername,
        username: { value: userData.username, isValid: true, message: null }
      };
      setChangeUsername(data)
      const fetchedImage = {
        uid: -Math.random(),
        url: `${process.env.API_URL}/static/avatars/${userData.avatar}`
      }
      setFileList([fetchedImage])
    }
  },[userData.avatar])

  const updateProfileHandler = event => {
    event.preventDefault();
    if(userData.username !== username.value){
      if(updateAccountIsValid(changeUsername, setChangeUsername)){
        const data = { username: username.value }
        setLoading(true)
        axios.put("/account/update-account", data, headerCfg)
          .then(res => {
            setLoading(false)
            dispatch(actions.getUser())
            notification['success']({
              message: 'Yuhuu!!!',
              description: res.data.message,
              placement: 'bottomRight',
            });
          })
          .catch(err => {
            setLoading(false)
            const state = JSON.parse(JSON.stringify(changeUsername));
            if (err.response && err.response.data) {
              for (let key in err.response.data) {
                if (state[key]) {
                  state[key].isValid = false;
                  state[key].value = state[key].value;
                  state[key].message = err.response.data[key];
                }
              }
            }
            setChangeUsername(state);
          })
      }
    } //USERNAME CHANGE

    if(changePassword.old_password.value !== "" ||
       changePassword.password.value !== "" ||
       changePassword.confirm_password.value !== "" ){
      if(changePasswordIsValid(changePassword, setChangePassword)){
        const { old_password, password, confirm_password } = changePassword;
        const data = {
          old_password: old_password.value,
          password: password.value,
          confirm_password: confirm_password.value
        };
        setLoading(true)
        axios.put("/account/update-password", data, headerCfg)
          .then(res => {
            setLoading(false)
            dispatch(actions.getUser())
            notification['success']({
              message: 'Yuhuu!!!',
              description: res.data.message,
              placement: 'bottomRight',
            });
            setChangePassword(formUpdatePassword)
          })
          .catch(err => {
            setLoading(false)
            const state = JSON.parse(JSON.stringify(changePassword));
            if (err.response && err.response.data) {
              for (let key in err.response.data) {
                if (state[key]) {
                  state[key].isValid = false;
                  state[key].value = state[key].value;
                  state[key].message = err.response.data[key];
                }
              }
            }
            setChangePassword(state);
            if (err.response.data.msg === "Fresh token required") {
              swal({
                title: "Upssss!",
                text: "You need to re-login first.",
                icon: "error",
                buttons: ["Cancel", "Logout"],
                dangerMode: true
              }).then(willDelete => {
                if (willDelete) dispatch(actions.logout())
                else return false;
              });
            }
          })
      }
    } //OLD PASSWORD CHANGE

    if(addPassword.password.value !== "" || addPassword.confirm_password.value !== ""){
      if(addPasswordIsValid(addPassword, setAddPassword)){
        const { password, confirm_password } = addPassword;
        const data = {
          password: password.value,
          confirm_password: confirm_password.value
        };
        setLoading(true)
        axios.post("/account/add-password", data, headerCfg)
          .then(res => {
            setLoading(false)
            dispatch(actions.getUser())
            notification['success']({
              message: 'Yuhuu!!!',
              description: res.data.message,
              placement: 'bottomRight',
            });
            setAddPassword(formAddPassword)
          })
          .catch(err => {
            setLoading(false)
            const state = JSON.parse(JSON.stringify(addPassword));
            if (err.response && err.response.data) {
              for (let key in err.response.data) {
                if (state[key]) {
                  state[key].isValid = false;
                  state[key].value = state[key].value;
                  state[key].message = err.response.data[key];
                }
              }
            }
            setAddPassword(state);
            if (err.response.data.message) {
              dispatch(actions.getUser())
              notification['error']({
                message: 'Oppps...',
                description: err.response.data.message,
                placement: 'bottomRight',
              });
              setAddPassword(formAddPassword)
            }
            if (err.response.data.msg === "Fresh token required") {
              swal({
                title: "Upssss!",
                text: "You need to re-login first.",
                icon: "error",
                buttons: ["Cancel", "Logout"],
                dangerMode: true
              }).then(willDelete => {
                if (willDelete) dispatch(actions.logout())
                else return false;
              });
            }
          })
      }
    }
  }

  const addPasswordHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...addPassword,
      [name]: {
        ...addPassword[name],
        value: value,
        isValid: true,
        message: null
      }
    };
    setAddPassword(data);
  };

  const changePasswordHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...changePassword,
      [name]: {
        ...changePassword[name],
        value: value,
        isValid: true,
        message: null
      }
    };
    setChangePassword(data);
  };

  const changeUsernameHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...changeUsername,
      [name]: {
        ...changeUsername[name],
        value: value,
        isValid: true,
        message: null
      }
    };
    setChangeUsername(data);
  };

  const usernameInvalid = cx({ "is-invalid border-grey": !username.isValid });

  const oldPwdInvalid = cx({ "is-invalid border-grey": !changePassword.old_password.isValid });
  const pwdInvalid = cx({ "is-invalid border-grey": !changePassword.password.isValid });
  const cPwdInvalid = cx({ "is-invalid border-grey": !changePassword.confirm_password.isValid });

  const addPwdInvalid = cx({ "is-invalid border-grey": !addPassword.password.isValid });
  const addcPwdInvalid = cx({ "is-invalid border-grey": !addPassword.confirm_password.isValid });

  return (
    <>
      <Col md={12} lg={10} className="ml-sm-auto pl-0 p-r-0-s">
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <Card className="border-0 mt-5 hov_none shadow-none mb-5">
            <Card.Header className="bg-transparent">
              <h1 className="fs-16 mt-1 mb-0">My Profile</h1>
              <small>
                Manage your profile information to control, protect and control
                accounts
              </small>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  md={8}
                  className="pr-0 p-l-0-s order-lg-1 order-md-1 order-12"
                >
                  <Card className="hov_none rounded-0 shadow-none">
                    <Card.Header className="bg-transparent">
                      <span>Account Details</span>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        {/* FORM USERNAME & EMAIL */}
                        <Form.Row>
                          <Form.Group as={Col} md={6}>
                            <Form.Label>Username</Form.Label>
                            <InputGroup className={usernameInvalid ? "mb-0" : "mb-3"}>
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-transparent pr-0">
                                  <i className="fal fa-user-alt mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="text"
                                name="username"
                                value={username.value}
                                onChange={changeUsernameHandler}
                                placeholder="Username"
                                className={`${usernameInvalid} border-left-0 custom-place pl-1`}
                              />
                            </InputGroup>
                            {!username.isValid && (
                              <small className="form-text text-muted mt-0 mb-n2">
                                {username.message}
                              </small>
                            )}
                          </Form.Group>
                          <Form.Group as={Col} md={6}>
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                                <InputGroup.Text className="pr-0">
                                  <i className="fal fa-envelope mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="email"
                                placeholder={userData.email}
                                className="border-left-0 custom-place pl-1"
                                disabled
                              />
                            </InputGroup>
                          </Form.Group>
                        </Form.Row>
                        {/* FORM USERNAME & EMAIL */}

                        {userData.old_password ? (
                          // FORM OLD PASSWORD
                          <Form.Row>
                            <Form.Group as={Col} md={6} lg={4}>
                              <Form.Label>Old Password</Form.Label>
                              <InputGroup className={oldPwdInvalid ? "mb-0" : "mb-3"}>
                                <InputGroup.Prepend>
                                  <InputGroup.Text className="bg-transparent pr-0">
                                    <i className="fal fa-lock-alt mr-2" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="password"
                                  name="old_password"
                                  placeholder="Old Password"
                                  className={`${oldPwdInvalid} border-left-0 custom-place pl-1`}
                                  value={changePassword.old_password.value}
                                  onChange={changePasswordHandler}
                                />
                              </InputGroup>
                              {!changePassword.old_password.isValid && (
                                <small className="form-text text-muted mt-0 mb-n2">
                                  {changePassword.old_password.message}
                                </small>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md={6} lg={4}>
                              <Form.Label>New Password</Form.Label>
                              <InputGroup className={pwdInvalid ? "mb-0" : "mb-3"}>
                                <InputGroup.Prepend>
                                  <InputGroup.Text className="bg-transparent pr-0">
                                    <i className="fal fa-lock-alt mr-2" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="New Password"
                                  className={`${pwdInvalid} border-left-0 custom-place pl-1`}
                                  value={changePassword.password.value}
                                  onChange={changePasswordHandler}
                                />
                              </InputGroup>
                              {!changePassword.password.isValid && (
                                <small className="form-text text-muted mt-0 mb-n2">
                                  {changePassword.password.message}
                                </small>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md={12} lg={4}>
                              <Form.Label>Confirm Password</Form.Label>
                              <InputGroup className={cPwdInvalid ? "mb-0" : "mb-3"}>
                                <InputGroup.Prepend>
                                  <InputGroup.Text className="bg-transparent pr-0">
                                    <i className="fal fa-lock-alt mr-2" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="password"
                                  name="confirm_password"
                                  placeholder="Confirm Password"
                                  className={`${cPwdInvalid} border-left-0 custom-place pl-1`}
                                  value={changePassword.confirm_password.value}
                                  onChange={changePasswordHandler}
                                />
                              </InputGroup>
                              {!changePassword.confirm_password.isValid && (
                                <small className="form-text text-muted mt-0 mb-n2">
                                  {changePassword.confirm_password.message}
                                </small>
                              )}
                            </Form.Group>
                          </Form.Row>
                          // FORM OLD PASSWORD
                        ) : (
                          // FORM NEW PASSWORD
                          <Form.Row>
                            <Form.Group as={Col} md={6}>
                              <Form.Label>New Password</Form.Label>
                              <InputGroup className={addPwdInvalid ? "mb-0" : "mb-3"}>
                                <InputGroup.Prepend>
                                  <InputGroup.Text className="bg-transparent pr-0">
                                    <i className="fal fa-lock-alt mr-2" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="New Password"
                                  className="border-left-0 custom-place pl-1"
                                  className={`${addPwdInvalid} border-left-0 custom-place pl-1`}
                                  value={addPassword.password.value}
                                  onChange={addPasswordHandler}
                                />
                              </InputGroup>
                              {!addPassword.password.isValid && (
                                <small className="form-text text-muted mt-0 mb-n2">
                                  {addPassword.password.message}
                                </small>
                              )}
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                              <Form.Label>Confirm Password</Form.Label>
                              <InputGroup className={addcPwdInvalid ? "mb-0" : "mb-3"}>
                                <InputGroup.Prepend>
                                  <InputGroup.Text className="bg-transparent pr-0">
                                    <i className="fal fa-lock-alt mr-2" />
                                  </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                  type="password"
                                  name="confirm_password"
                                  placeholder="Confirm Password"
                                  className={`${addcPwdInvalid} border-left-0 custom-place pl-1`}
                                  value={addPassword.confirm_password.value}
                                  onChange={addPasswordHandler}
                                />
                              </InputGroup>
                              {!addPassword.confirm_password.isValid && (
                                <small className="form-text text-muted mt-0 mb-n2">
                                  {addPassword.confirm_password.message}
                                </small>
                              )}
                            </Form.Group>
                          </Form.Row>
                          // FORM NEW PASSWORD
                        )}

                        <Button variant="primary" className="m-btn-block" onClick={updateProfileHandler} >
                          Update Profile 
                          {loading && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              aria-hidden="true"
                              className="ml-2 m-b-3"
                            />
                          )}
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4} className="pl-0 p-r-0-s order-lg-12 order-md-12 order-1">
                  <Card className="border-left-0 rounded-0 text-center shadow-none hov_none m-border-0">
                    <p className="h6 fs-14 mt-4 mb-0 d-lg-none">
                      Albert Davis
                    </p>
                    <Upload
                      accept="image/*"
                      listType="picture-card"
                      className="avatar-uploader mt-4"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      beforeUpload={validateImage}
                    >
                      {fileList.length >= 1 ? null : uploadButton(loading)}
                    </Upload>

                    <Card.Body className="pb-33 pb-12-pro">
                      <p className="fs-14 mb-0 text-secondary">
                        Image size: maks. 4 MB
                      </p>
                      <p className="fs-14 text-secondary">
                        Image format: .JPEG, .JPG, .PNG
                      </p>

                      <small className="fs-10 text-secondary font-italic">
                        click the image to change your avatar.
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <style jsx>{`
        :global(.avatar-uploader > .ant-upload) {
          width: 142px;
          height: 142px;
          vertical-align: middle;
          border-radius: 50%;
          margin-left: auto !important;
          margin-right: auto !important;
          float: none;
        }
        :global(.ant-upload-list-picture-card-container,
        .ant-upload-list-picture-card .ant-upload-list-item) {
          width: 142px;
          height: 142px;
          vertical-align: middle;
          border-radius: 50%;
          margin-left: auto !important;
          margin-right: auto !important;
          float: none;
        }
        :global(.ant-upload-list-picture-card .ant-upload-list-item) {
          padding: 5px;
        }
        :global(.ant-upload-list-picture-card .ant-upload-list-item-info){
          border-radius: 50%;
        }
        .avatar {
          vertical-align: middle;
          border-radius: 50%;
          border: 2px solid white;
          object-fit: cover;
          object-position: 0px 0px;
        }
        .btn-file {
          position: relative;
          overflow: hidden;
          font-size: 12px !important;
        }
        .btn-file:hover {
          cursor: pointer;
        }
        .btn-file input[type="file"] {
          left: 0;
          opacity: 0;
          outline: none;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: inherit;
          display: block;
        }
        .bg-upload {
          background-color: whitesmoke;
          color: #4a4a4a;
        }
        // Extra small devices (portrait phones, less than 576px)
        @media (max-width: 575.98px) {
          :global(.m-btn-block) {
            display: block;
            width: 100%;
          }
        }
        // Large devices (ipad pro)
        @media (max-width: 1200px) {
          :global(.pb-12-pro) {
            padding-bottom: 12px !important;
          }
        }
        :global(.pb-33) {
          padding-bottom: 33px;
        }
      `}</style>
    </>
  );
};

export default Account;
