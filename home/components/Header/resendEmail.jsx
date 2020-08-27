import { useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { formIsValid } from "../../lib/validateFormReset";

import cx from "classnames";
import swal from "sweetalert";
import axios from "../../lib/axios";

const formResend = {
  email: { value: "", isValid: true, message: "" },
};

const ResendVerification = ({ viewed, closed }) => {
  const [resend, setResend] = useState(formResend);
  const [loading, setLoading] = useState(false);
  const switchToRegister = () => viewed();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid(resend, setResend)) {
      setLoading(true);
      const data = { email: resend.email.value };
      axios
        .post("/resend-email", data)
        .then((res) => {
          setLoading(false);
          closed();
          const { message } = res.data;
          swal({ icon: "success", title: "Awesome!", text: `${message}`, timer: 3000 });
        })
        .catch((err) => {
          setLoading(false);
          const state = JSON.parse(JSON.stringify(resend));
          if (err.response && err.response.data) {
            state.email.isValid = false;
            state.email.value = state.email.value;
            state.email.message = err.response.data.email;
          }
          if (err.response && err.response.data.message) {
            state.email.isValid = false;
            state.email.value = state.email.value;
            state.email.message = err.response.data.message;
          }
          setResend(state);
        });
    }
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    const data = {
      ...resend,
      [name]: {
        ...resend[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setResend(data);
  };

  const { email } = resend;
  const emailInvalid = cx({ "is-invalid border-grey": !email.isValid });

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Container>
          <img
            src="/static/images/balihot-property.png"
            width="80"
            height="80"
            className="mx-auto d-block"
          />
          <h5 className="text-center mt-3">Resend Email Verification</h5>
          <p className="text-center">
            Please enter your registered email address and we will send you a new verification link.
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

              <Button className="btn-danger" block onClick={submitHandler}>
                <i className="fal fa-paper-plane mr-2" />
                Send email{" "}
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
        :global(.border-grey) {
          border-color: #ced4da !important;
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

export default ResendVerification;
