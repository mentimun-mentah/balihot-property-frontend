import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import Router from "next/router";
import cx from "classnames";
import swal from "sweetalert";
import validator from "validator";
import axios from "../../store/axios-instance";
import * as actions from "../../store/actions";

const PROFILE = "/static/images/teams/Asthi Smith.jpg";
const formUpdatePassword = {
  old_password: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
  confirm_password: { value: "", isValid: true, message: "" }
};
const formAddPassword = {
  password: { value: "", isValid: true, message: "" },
  confirm_password: { value: "", isValid: true, message: "" }
};

const Account = () => {
  const dispatch = useDispatch();
  const [changePassword, setChangePassword] = useState(formUpdatePassword);
  const [addPassword, setAddPassword] = useState(formAddPassword);
  const access_token = useSelector(state => state.auth.access_token);

  const onLogout = () => dispatch(actions.logout());
  const logouthandler = () => {
    onLogout();
    Router.replace("/");
  };

  let headerCfg;
  if (access_token)
    headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };

  const saveChangePasswordHandler = event => {
    event.preventDefault();
    resetValidationChangePassword();
    if (changePasswordIsValid()) {
      const { old_password, password, confirm_password } = changePassword;
      const data = {
        old_password: old_password.value,
        password: password.value,
        confirm_password: confirm_password.value
      };
      axios
        .put("/account/update-password", data, headerCfg)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.data.msg === "Fresh token required") {
            swal({
              title: "Upssss!",
              text: "You need to re-login first.",
              icon: "error",
              buttons: ["Cancel", "Logout"],
              dangerMode: true
            }).then(willDelete => {
              if (willDelete) {
                logouthandler();
              } else {
                return false;
              }
            });
          }
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
        });
      console.table(data);
    }
  };

  const changePasswordHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...changePassword,
      [name]: {
        ...changePassword[name],
        value: value,
        isValid: true,
        message: ""
      }
    };
    setChangePassword(data);
  };

  const resetValidationChangePassword = () => {
    const state = JSON.parse(JSON.stringify(changePassword));
    for (let key in state) {
      if (state[key].hasOwnProperty("isValid")) {
        state[key].isValid = true;
        state[key].message = "";
      }
    }
    setChangePassword(state);
  };

  const changePasswordIsValid = () => {
    const old_password = { ...changePassword.old_password };
    const password = { ...changePassword.password };
    const confirm_password = { ...changePassword.confirm_password };
    let isGood = true;

    if (!validator.isLength(old_password.value, { min: 6, max: undefined })) {
      old_password.isValid = false;
      old_password.message = "Password at least 6 characters";
      isGood = false;
    }
    if (!validator.isLength(password.value, { min: 6, max: undefined })) {
      password.isValid = false;
      password.message = "New Password at least 6 characters";
      isGood = false;
    }
    if (
      !validator.isLength(confirm_password.value, { min: 6, max: undefined })
    ) {
      confirm_password.isValid = false;
      confirm_password.message = "Confirm Password at least 6 characters";
      isGood = false;
    }
    if (!validator.equals(confirm_password.value, password.value)) {
      confirm_password.isValid = false;
      confirm_password.message = "Password isn't matches";
      isGood = false;
    }
    if (!isGood) {
      setChangePassword({ old_password, password, confirm_password });
    }
    return isGood;
  };

  const { old_password, password, confirm_password } = changePassword;
  const oldPwdInvalid = cx({ "is-invalid border-grey": !old_password.isValid });
  const pwdInvalid = cx({ "is-invalid border-grey": !password.isValid });
  const cPwdInvalid = cx({
    "is-invalid border-grey": !confirm_password.isValid
  });

  return (
    <>
      <Col md={9} lg={10} className="ml-sm-auto pl-0">
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
                <Col md={8} className="pr-0">
                  <Card className="hov_none rounded-0 shadow-none">
                    <Card.Header className="bg-transparent">
                      <span>Account Details</span>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Username</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-transparent pr-0">
                                  <i className="fal fa-user-alt mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="text"
                                placeholder="Username"
                                className="border-left-0 custom-place pl-1"
                              />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                                <InputGroup.Text className="pr-0">
                                  <i className="fal fa-envelope mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="email"
                                placeholder="email@asd.com"
                                className="border-left-0 custom-place pl-1"
                                disabled
                              />
                            </InputGroup>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>New Password</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-transparent pr-0">
                                  <i className="fal fa-lock-alt mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="password"
                                placeholder="New Password"
                                className="border-left-0 custom-place pl-1"
                              />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-transparent pr-0">
                                  <i className="fal fa-lock-alt mr-2" />
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                className="border-left-0 custom-place pl-1"
                              />
                            </InputGroup>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Old Password</Form.Label>
                            <InputGroup className="mb-0">
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
                                onChange={changePasswordHandler}
                              />
                            </InputGroup>
                            {!old_password.isValid && (
                              <small className="form-text text-muted mt-0 mb-n2">
                                {old_password.message}
                              </small>
                            )}
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>New Password</Form.Label>
                            <InputGroup className="mb-0">
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
                                onChange={changePasswordHandler}
                              />
                            </InputGroup>
                            {!password.isValid && (
                              <small className="form-text text-muted mt-0 mb-n2">
                                {password.message}
                              </small>
                            )}
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup className="mb-0">
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
                                onChange={changePasswordHandler}
                              />
                            </InputGroup>
                            {!confirm_password.isValid && (
                              <small className="form-text text-muted mt-0 mb-n2">
                                {confirm_password.message}
                              </small>
                            )}
                          </Form.Group>
                        </Form.Row>
                        <Button
                          variant="primary"
                          onClick={saveChangePasswordHandler}
                        >
                          Update Profile
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4} className="pl-0">
                  <Card className="border-left-0 rounded-0 text-center shadow-none hov_none">
                    <img
                      src={PROFILE}
                      width="120"
                      height="120"
                      className="avatar mx-auto mt-5"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-center">
                        <span className="file-input btn border btn-file btn-sm bg-upload">
                          <i className="fal fa-file-image mr-2" />
                          <span>Choose image</span>
                          <input type="file" multiple />
                        </span>
                      </div>
                      <p className="fs-14 mt-4 mb-0 text-secondary">
                        Image size: maks. 4 MB
                      </p>
                      <p className="fs-14 text-secondary">
                        Image format: .JPEG, .JPG, .PNG
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default Account;
