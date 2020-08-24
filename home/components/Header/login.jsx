import { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Fade } from "../Transition";
import { LogoGoogle, LogoFacebook } from "./logo";
import { formIsValid } from "../../lib/validateFormLogin";

import cx from "classnames";
import cookie from "nookies";
import Router from "next/router";
import axios from "../../lib/axios";
import * as actions from "../../store/actions";

const formSignin = {
  email: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
};

const Login = ({ viewed, reset, closed }) => {
  const dispatch = useDispatch();
  const [signin, setSigin] = useState(formSignin);
  const [loading, setLoading] = useState(false);
  const switchToRegister = () => viewed();
  const switchToReset = () => reset();

  const submitHandler = (event) => {
    event.preventDefault();
    resetValidation();
    if (formIsValid(signin, setSigin)) {
      setLoading(true);
      const data = {
        email: signin.email.value,
        password: signin.password.value,
      };
      axios
        .post("/login", data)
        .then((res) => {
          setLoading(false);
          closed();
          const { access_token, refresh_token, username } = res.data;
          cookie.set(null, "access_token", access_token, {
            maxAge: 30 * 24 * 60 * 60, path: "/",
          });
          cookie.set(null, "refresh_token", refresh_token, {
            maxAge: 30 * 24 * 60 * 60, path: "/",
          });
          cookie.set(null, "username", username, {
            maxAge: 30 * 24 * 60 * 60, path: "/",
          });
          dispatch(actions.getUser())
          dispatch(actions.authSuccess(access_token, refresh_token, username));
          Router.reload("/");
        })
        .catch((err) => {
          setLoading(false);
          const state = JSON.parse(JSON.stringify(signin));
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              if (state[key]) {
                state[key].isValid = false;
                state[key].value = state[key].value;
                state[key].message = err.response.data[key];
              }
            }
          }
          if (err.response && err.response.data.message) {
            state.email.isValid = true;
            state.email.value = state.email.value;
            state.password.isValid = false;
            state.password.value = state.password.value;
            state.password.message = err.response.data.message;
          }
          setSigin(state);
        });
    }
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    const data = {
      ...signin,
      [name]: {
        ...signin[name],
        value: value, isValid: true, message: null,
      },
    };
    setSigin(data);
  };

  const resetValidation = () => {
    const state = JSON.parse(JSON.stringify(signin));
    for (let key in state) {
      if (state[key].hasOwnProperty("isValid")) {
        (state[key].isValid = true), (state[key].message = null);
      }
    }
    setSigin(state);
  };

  const { email, password } = signin;
  const emailInvalid = cx({ "is-invalid border-grey": !email.isValid });
  const passwordInvalid = cx({ "is-invalid border-grey": !password.isValid });

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Container>
          <h2 className="text-center">Welcome back.</h2>
          <p className="text-center text-muted">
            <small>Sign in to get a better experience & find best property in here.</small>
          </p>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-envelope mr-2"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`${emailInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {email.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">{email.message}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
                <InputGroup>
                  <InputGroup.Prepend className="input-group-login pr-0">
                    <InputGroup.Text className="input-group-login pr-0">
                      <i className="fal fa-lock-alt mr-2"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`${passwordInvalid} border-left-0 form-input-login pl-1`}
                    onChange={inputHandler}
                  />
                </InputGroup>
                {password.message && (
                  <Form.Text className="text-muted fs-12 mb-n2 mt-0">{password.message}</Form.Text>
                )}
              </Form.Group>

              <span className="text-dark hov_pointer" onClick={switchToReset}>
                <a className="fs-12 text-reset text-muted">Forgot password ?</a>
              </span>
              <Button variant="primary" className="mt-2" block onClick={submitHandler}>
                Sign in{" "}
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                    className="m-b-3"
                  />
                )}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="hr-sect mb-3 mt-3">or</div>
            </Col>
            <Col md={12} lg={6}>
              <a href={`${process.env.API_URL}/login/google`} className="text-decoration-none">
                <button className="btn-login btn mb-2">
                    <div className="btn-login-icon">
                      <LogoGoogle />
                    </div>
                    <span>Sign in with Google</span>
                </button>
              </a>
            </Col>

            <Col md={12} lg={6}>
                <button className="btn-login" disabled>
                  <div className="btn-login-icon">
                    <LogoFacebook />
                  </div>
                  <span>Sign in with Facebook</span>
                </button>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              <p className="text-center text-muted lh-15 mt-3">
                <small>Don’t have an account?</small>
                <strong>
                  <small className="text-info hov_pointer" onClick={switchToRegister}>
                    {" "}
                    Sign Up
                  </small>
                </strong>
              </p>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <style jsx>{`
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
        :global(.custom-place::placeholder) {
          font-size: 14px !important;
        }
        :global(input:-internal-autofill-selected) {
          -webkit-appearance: menulist-button;
          background-color: #fff !important;
          background-image: none !important;
          color: -internal-light-dark-color(black, white) !important;
        }
      `}</style>
    </>
  );
};

export default Login;
