import { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Form, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import { formIsValid } from "../../lib/validateFormEnquiry";
import cx from "classnames";
import axios from "../../lib/axios";
import { notification } from 'antd';

const formEnquiry = {
  name: { value: "", isValid: true, message: null },
  phone: { value: "", isValid: true, message: null },
  sender_email: { value: "", isValid: true, message: null },
  description: { value: "", isValid: true, message: null },
};

const SendEnquiry = ({closed}) => {
  const [enquiry, setEnquiry] = useState(formEnquiry);
  const [loading, setLoading] = useState(false);

  const inputHandler = event => {
    const { name, value } = event.target;
    const data = {
      ...enquiry,
      [name]: {
        ...enquiry[name],
        value: value, isValid: true, message: null,
      },
    };
    setEnquiry(data);
  };

  const submitHandler = e => {
    e.preventDefault();
    if(formIsValid(enquiry, setEnquiry)){
      setLoading(true);
      const data = {
        name: enquiry.name.value,
        sender_email: enquiry.sender_email.value,
        phone: enquiry.phone.value,
        description: enquiry.description.value,
      };
      axios.post("/send-email-enquiry", data)
        .then(res => {
          notification['success']({
            message: 'Success',
            description: res.data.message,
            placement: 'bottomRight',
            duration: 2,
          });
          setLoading(false);
          closed();
          setEnquiry(formEnquiry);
        })
        .catch(err => {
          setLoading(false);
          const state = JSON.parse(JSON.stringify(enquiry));
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              if (state[key]) {
                state[key].isValid = false;
                state[key].value = state[key].value;
                state[key].message = err.response.data[key];
              }
            }
          }
          setEnquiry(state);
        })
    }
  }

  const { name, phone, sender_email, description } = enquiry;
  const nameInvalid = cx({ "is-invalid border-grey": !name.isValid });
  const phoneInvalid = cx({ "is-invalid border-grey": !phone.isValid });
  const emailInvalid = cx({ "is-invalid border-grey": !sender_email.isValid });
  const descriptionInvalid = cx({ "is-invalid border-grey": !description.isValid });

  return (
    <>
      <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
        <Container>
          <h2 className="text-center">Send us an enquiry</h2>
          <p className="text-center text-muted">
            <small>Please contact us for more information about property.</small>
          </p>

          <Row>
            <Col>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text className="input-group-login pr-0">
                          <i className="fal fa-user mr-2"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={inputHandler}
                        className={`${nameInvalid} border-left-0 form-input-login pl-1`}
                      />
                    </InputGroup>
                    {name.message && (
                      <Form.Text className="text-muted fs-12 mb-0 mt-0">{name.message}</Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend className="input-group-login pr-0">
                        <InputGroup.Text className="input-group-login pr-0">
                          <i className="fal fa-phone mr-2"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        name="phone"
                        type="number"
                        placeholder="Phone Number"
                        onChange={inputHandler}
                        className={`${phoneInvalid} border-left-0 form-input-login pl-1`}
                      />
                    </InputGroup>
                    {phone.message && (
                      <Form.Text className="text-muted fs-12 mb-0 mt-0">{phone.message}</Form.Text>
                    )}
                  </Form.Group>
                </Form.Row>

                <Form.Group className="mb-2">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="input-group-login pr-0">
                        <i className="fal fa-envelope mr-2"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="sender_email"
                      type="email"
                      placeholder="Email"
                      onChange={inputHandler}
                      className={`${emailInvalid} border-left-0 form-input-login pl-1`}
                    />
                  </InputGroup>
                  {sender_email.message && (
                    <Form.Text className="text-muted fs-12 mb-0 mt-0">{sender_email.message}</Form.Text>
                  )}
                </Form.Group>


                <Form.Group>
                  <Form.Control 
                    name="description"
                    as="textarea" 
                    rows="3" 
                    placeholder="Write your message here" 
                    onChange={inputHandler}
                    className={descriptionInvalid}
                  />
                  {description.message && (
                    <Form.Text className="text-muted fs-12 mb-0 mt-0">{description.message}</Form.Text>
                  )}
                </Form.Group>

                <Button className="mt-2 mb-4 btn-red-hot" type="submit" block onClick={submitHandler}>
                  Send message
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

export default SendEnquiry;
