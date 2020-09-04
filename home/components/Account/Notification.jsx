import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import axios from '../../lib/axios'

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radio, notification } from 'antd';
import { motion } from "framer-motion";
import { Fade } from "../Transition";
import * as actions from "../../store/actions";

const Notifications = () => {
  const dispatch = useDispatch();
  const [notifProperty, setNotifProperty] = useState(false)
  const [notifNewsletter, setNotifNewsletter] = useState(false)
  const [dataProperty, setDataProperty] = useState()
  const [dataNewsletter, setDataNewsletter] = useState()

  const subscribe = useSelector(state => state.auth.subscribe);
  const userData = useSelector(state => state.auth.data);

  const resServer = res => {
    return notification['success']({
          message: 'Success',
          description: res.data.message,
          placement: 'bottomRight',
          duration: 2,
        });
  }

  const errServer = err => {
    return notification['error']({
          message: 'Opps...',
          description: err.response.data.message ? err.response.data.message : 'Something went wrong',
          placement: 'bottomRight',
          duration: 2,
        });
  }

  useEffect(() => {
    if(subscribe.length == 0){
      setNotifProperty(false)
      setNotifNewsletter(false)
    }else{
      for(let key in subscribe){
        if(subscribe[key].subscribe_type === "newsletter"){
          setNotifNewsletter(true)
          setDataNewsletter(subscribe[key])
        }
        if(subscribe[key].subscribe_type === "property"){
          setNotifProperty(true)
          setDataProperty(subscribe[key])
        }
      }
    }
  },[subscribe])

  const notifPropertyHandler = () => {
    if(notifProperty){
      axios.delete(`/unsubscribe/${dataProperty.id}`)
      .then(res => {
      setNotifProperty(false)
        dispatch(actions.getSubscribe())
        resServer(res)
      })
      .catch(err => {
        dispatch(actions.getSubscribe())
        errServer(err)
      })
    }
    if(!notifProperty){
      const data = {
        email: userData.email,
        subscribe_from: 'login',
        subscribe_type: 'property'
      }
      axios.post('/subscribe', data)
      .then(res => {
        dispatch(actions.getSubscribe())
        resServer(res)
      })
      .catch(err => {
        dispatch(actions.getSubscribe())
        errServer(err)
      })
      setNotifProperty(true)
    }
  }

  const notifNewsletterHandler = () => {
    if(notifNewsletter){
      axios.delete(`/unsubscribe/${dataNewsletter.id}`)
      .then(res => {
      setNotifNewsletter(false)
        dispatch(actions.getSubscribe())
        resServer(res)
      })
      .catch(err => {
        dispatch(actions.getSubscribe())
        errServer(err)
      })
    }
    if(!notifNewsletter){
      const data = {
        email: userData.email,
        subscribe_from: 'login',
        subscribe_type: 'newsletter'
      }
      axios.post('/subscribe', data)
      .then(res => {
        dispatch(actions.getSubscribe())
        resServer(res)
      })
      .catch(err => {
        dispatch(actions.getSubscribe())
        errServer(err)
      })
      setNotifNewsletter(true)
    }
  }

  return (
    <>
      <Col md={12} lg={10} className="ml-sm-auto pl-0 p-r-0-s">
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <Card className="border-0 mt-5 hov_none shadow-none mb-5">
            <Card.Header className="bg-transparent">
              <h1 className="fs-16 mt-1 mb-0">Email Notifications</h1>
              <small>Control whether to receive email from BaliHotProperty.</small>
            </Card.Header>

            <Card.Body className="px-lg-5 px-md-5 px-sm-5 mb-4">
              <Row className="mt-3 align-items-center">
                <Col className="col-auto mr-auto">
                  <h6>Property BaliHotProperty</h6>
                  <p className="text-secondary fs-14 mb-lg-0">
                    Receive new property from publications
                  </p>
                </Col>
                <Col className="col-auto">
                  <Radio.Group value={notifProperty} onChange={notifPropertyHandler} buttonStyle="solid">
                    <Radio.Button value={true}>On</Radio.Button>
                    <Radio.Button value={false}>Off</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
              <div className="border-bot mt-3"></div>

              <Row className="mt-3 align-items-center">
                <Col className="col-auto mr-auto">
                  <h6>Newsletter BaliHotProperty</h6>
                  <p className="text-secondary fs-14 mb-lg-0">
                    Receive newsletter from publications
                  </p>
                </Col>
                <Col className="col-auto">
                  <Radio.Group value={notifNewsletter} onChange={notifNewsletterHandler} buttonStyle="solid">
                    <Radio.Button value={true}>On</Radio.Button>
                    <Radio.Button value={false}>Off</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
              <div className="border-bot mt-3"></div>

            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      <style jsx>{`
        :global(.border-bot) {
          border-bottom: 1px solid rgba(0,0,0,.125);
        }
      `}</style>
    </>
  );
};

export default Notifications;
