import { useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { LogoGoogle, LogoFacebook } from "./logo";
import { formIsValid } from "../../lib/validateFormRegister";

import cx from "classnames";
import swal from "sweetalert";
import axios from "../../lib/axios";

const formSignup = {
  username: { value: "", isValid: true, message: "" },
  email: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
  confirm_password: { value: "", isValid: true, message: "" },
};

const Register = ({ viewed, closed }) => {
  const [signup, setSignup] = useState(formSignup);
  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    resetValidation();
    if (formIsValid(signup, setSignup)) {
      setLoading(true);
      const data = {
        username: signup.username.value,
        email: signup.email.value,
        password: signup.password.value,
        confirm_password: signup.confirm_password.value,
      };
      axios
        .post("/register", data)
        .then((res) => {
          closed();
          swal({
            title: "Awesome!", text: res.data.message, icon: "success",
          });
        })
        .catch((err) => {
          setLoading(false);
          const state = JSON.parse(JSON.stringify(signup));
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = err.response.data[key];
              }
            }
          }
          setSignup(state);
        });
    }
  };

  const swithToLogin = () => {
    viewed();
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    const data = {
      ...signup,
      [name]: {
        ...signup[name],
        value: value, isValid: true, message: null,
      },
    };
    setSignup(data);
  };

  const resetValidation = () => {
    const state = JSON.parse(JSON.stringify(signup));
    for (let key in state) {
      if (state[key].hasOwnProperty("isValid")) {
        state[key].isValid = true;
        state[key].message = null;
      }
    }
    setSignup(state);
  };

  const { username, email, password, confirm_password } = signup;
  const usernameInvalid = cx({ "is-invalid border-grey": !username.isValid });
  const emailInvalid = cx({ "is-invalid border-grey": !email.isValid });
  const passwordInvalid = cx({ "is-invalid border-grey": !password.isValid });
  const confirmInvalid = cx({ "is-invalid border-grey": !confirm_password.isValid });

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Container>
          <Row className="justify-content-md-center">
            <h2 className="text-center">Join Balihot Property.</h2>
            <p className="text-center text-muted">
              <small>Sign up to get more feature from us.</small>
            </p>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-user mr-2" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="border-left-0 form-input-login pl-1"
                    className={`${usernameInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {username.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">{username.message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-envelope mr-2" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`${emailInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {email.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">{email.message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-lock-alt mr-2" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`${passwordInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {password.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">{password.message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-lock-alt mr-2" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className={`${confirmInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {confirm_password.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">
                    {confirm_password.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Button variant="primary" block onClick={submitHandler}>
                Sign up{" "}
                {loading && (
                  <Spinner as="span" animation="border" size="sm" aria-hidden="true" className="m-b-3" />
                )}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="hr-sect mb-3 mt-3">or</div>
            </Col>
            <Col md={12} lg={6}>
              <button className="btn-login btn mb-2">
                <div className="btn-login-icon">
                  <LogoGoogle />
                </div>
                <span>Sign up with Google</span>
              </button>
            </Col>

            <Col md={12} lg={6}>
              <button className="btn-login">
                <div className="btn-login-icon">
                  <LogoFacebook />
                </div>
                <span>Sign up with Facebook</span>
              </button>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              <p className="text-center text-muted lh-15 mt-3">
                <small>Already have an account?</small>
                <strong>
                  <small className="text-info hov_pointer" onClick={swithToLogin}>
                    {" "}
                    Sign in
                  </small>
                </strong>
              </p>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <style jsx>{`
        :global(.border-grey) {
          border-color: #ced4da !important;
        }
        .btn-login {
          background-color: rgb(255, 255, 255);
          display: inline-flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.54);
          box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
          padding: 0px;
          border-radius: 2px;
          border: 1px solid transparent;
          font-size: 14px;
          font-weight: 500;
          font-family: Roboto, sans-serif;
          width: 100%;
        }
        .btn-login-icon {
          margin-right: 10px;
          background: rgb(255, 255, 255);
          border-radius: 2px;
          padding: 8px;
        }
        :global(.input-group-login) {
          background-color: transparent;
          border-radius: 2px;
        }
        :global(.form-input-login) {
          border-radius: 2px;
        }
        :global(.form-input-login:focus) {
          box-shadow: none;
          border-color: #ced4da;
          border-radius: 2px;
        }
        .hr-sect {
          display: flex;
          flex-basis: 100%;
          align-items: center;
          color: rgba(0, 0, 0, 0.35);
          margin: 8px 0px;
        }
        .hr-sect::before,
        .hr-sect::after {
          content: "";
          flex-grow: 1;
          background: rgba(0, 0, 0, 0.35);
          height: 1px;
          font-size: 0px;
          line-height: 0px;
          margin: 0px 8px;
        }
      `}</style>
    </>
  );
};

export default Register;
