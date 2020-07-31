import { useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { formResetIsValid } from "../lib/validateFormReset";

import Router from "next/router";
import axios from "../lib/axios";
import cx from "classnames";
import swal from "sweetalert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const formReset = {
  email: { value: "", isValid: true, message: null },
  password: { value: "", isValid: true, message: null },
  confirm_password: { value: "", isValid: true, message: null },
};

const ResetPassword = () => {
  const [reset, setReset] = useState(formReset)
  const { email, password, confirm_password } = reset;

  const inputChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const data = {
      ...reset,
      [name]: {
        ...reset[name],
        value: value, isValid: true, message: null,
      },
    };
    setReset(data);
  };

  const submitHandler = event => {
    event.preventDefault();
    if(formResetIsValid(reset, setReset)){
      const { reset: resetToken } = parseCookies()
      const data = {
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
      }
      axios.put(`/password/reset/${resetToken}`, data)
        .then(res => {
          swal({ title: "Awesome!", text: res.data.message, icon: "success", });
          destroyCookie(null, 'reset');
          setReset(formReset);
          Router.replace("/")
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(reset));
          if (err.response && err.response.data) {
            const message = err.response.data.message;
            for (let key in err.response.data) {
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = err.response.data[key];
              }
            }
            if(message){
              swal({ title: "Uppss!", text: message, icon: "error", });
              destroyCookie(null, 'reset');
              Router.replace("/")
            }
          }
          setReset(state);
        })
    }
  } 

  const emailInvalid = cx({ "is-invalid": !email.isValid });
  const passwordInvalid = cx({ "is-invalid": !password.isValid });
  const confirmInvalid = cx({ "is-invalid": !confirm_password.isValid });

  return (
    <>
      <Container className="mt-4k2rem">
        <Row className="m-t-100 justify-content-center mb-5">
          <Col md={8} sm={12}>
            <Card.Title>
              <h4>Reset Password</h4>
            </Card.Title>
            <Card className="pt-4 shadow-none">
              <Card.Body className="pt-0">
                <Container className="pl-5 pr-5">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email" name="email"
                      placeholder="Email"
                      className={emailInvalid}
                      value={email.value}
                      onChange={inputChangeHandler}

                    />
                    {!email.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{email.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="New password"
                      className={passwordInvalid}
                      value={password.value}
                      onChange={inputChangeHandler}
                    />
                    {!password.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{password.message}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-type your new password"
                      name="confirm_password"
                      className={confirmInvalid}
                      value={confirm_password.value}
                      onChange={inputChangeHandler}
                    />
                    {!confirm_password.isValid && (
                      <Form.Text className="text-muted fs-12 mb-n2 mt-0">{confirm_password.message}</Form.Text>
                    )}
                  </Form.Group>
                </Container>
              </Card.Body>
            </Card>
            <Button variant="danger" className="mt-3" onClick={submitHandler} block>Submit</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

ResetPassword.getInitialProps = ctx => {
  const { reset, access_token } = parseCookies(ctx);
  if(!reset || access_token){
    destroyCookie(ctx, 'reset')
    process.browser
      ? Router.replace("/", "/") //Redirec from Client Side
      : ctx.res.writeHead(302, { Location: "/" }).end(); //Redirec from Server Side
  }
}

export default ResetPassword;
