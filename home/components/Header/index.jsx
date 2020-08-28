import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Navbar, Nav, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Select } from 'antd';
import { BackdropModal } from "../Transition";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Link from "next/link";
import Router from "next/router";
import * as actions from "../../store/actions";
import Login from "./login";
import Register from "./register";
import Reset from "./reset";
import ResendEmail from "./resendEmail";

const IMAGE = "/static/images/";
const { Option } = Select;

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isTop, setIsTop] = useState(true);
  const [changeView, setChangeView] = useState(false);
  const [resetView, setResetView] = useState(false);
  const [resendView, setResendView] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currency, setCurrency] = useState();
  const user = useSelector((state) => state.auth.data);
  const { pathname } = router;

  useEffect(() => {
    let isSubscribed = true;
    document.addEventListener("scroll", () => {
      if(isSubscribed){
        const inTop = window.scrollY < 50;
        if (inTop !== isTop) {
          setIsTop(inTop);
        }
      }
    });

    return () => isSubscribed = false;
  }, [isTop]);

  const showModalHandler = (e) => {
    const { name } = e.target;
    if (name === "register") {
      setChangeView(false);
      setModalShow(true);
    }
    if (name === "login") {
      setChangeView(true);
      setModalShow(true);
    }
    setVisible(false);
    document.body.classList.add("modal-open");
  };

  const closeModalHandler = () => {
    document.body.classList.remove("modal-open");
    setModalShow(false);
    setResetView(false);
    setResendView(false);
  };

  const resetViewHandler = () => {
    setResetView(true);
  };

  const resendViewHandler = () => {
    setResendView(true);
  };

  const changeViewHandler = () => {
    setChangeView(!changeView);
    setResetView(false);
    setResendView(false);
  };

  const onLogout = () => dispatch(actions.logout());
  const logouthandler = () => {
    destroyCookie(null, "access_token", { domain: process.env.DOMAIN })
    destroyCookie(null, "refresh_token", { domain: process.env.DOMAIN })
    destroyCookie(null, "username", { domain: process.env.DOMAIN })
    setVisible(false);
    onLogout();
    Router.replace("/")
  };

  const showDrawer = () => { setVisible(true); };
  const onClose = () => { setVisible(false); };

  const changeCurrencyHandler = e => {
    setCurrency(e)
    setVisible(false);
  }

  useEffect(() => {
    if(currency){
      dispatch(actions.getCurrency(currency))
    }
  },[currency])

  useEffect(() => {
    const cookie = parseCookies()
    if(!cookie.currency){
      setCookie(null, 'currency', 'USD', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      setCurrency("USD")
    } else {
      setCurrency(cookie.currency)
    }
  },[])

  let btnAccount = "btn-account dropdown-text-turncate";
  let currencyNavbar = "text-white";
  if (isTop && pathname === "/")
    btnAccount = "btn-account text-white dropdown-text-turncate bg-white";
    currencyNavbar = "text-white";

  let btnNavbar = "btn-navbar-top";
  if (!isTop) btnNavbar = "btn-navbar";
  if (!isTop) currencyNavbar = "text-black";

  let navCss = isTop ? "navbar-default" : "navbar-scrolled";
  if (pathname !== "/") {
    navCss = "navbar-scrolled";
    currencyNavbar = "text-black";
  }

  let navLogo = isTop
    ? `${IMAGE}balihot-property-logo-white.png`
    : `${IMAGE}balihot-property-logo-red.png`;
  if (pathname !== "/") navLogo = `${IMAGE}balihot-property-logo-red.png`;

  let navSignup = isTop
    ? "text-white rounded-pill ml-n2 btn-navbar-top border h-42 fs-14 fw-500"
    : "signup-button ml-n2";
  if (pathname !== "/") navSignup = "signup-button ml-n2";

  let auth = (
    <>
      <Nav.Link id="btn-login-navbar" className={btnNavbar} name="login" onClick={showModalHandler}>
        Login
      </Nav.Link>
      <Nav.Link>
        <Button variant="white" className={navSignup} name="register" onClick={showModalHandler}>
          Sign up
        </Button>
      </Nav.Link>
    </>
  );

  let authMobile = (
    <>
      <Nav.Link as="a" className="border-bottom nav-mobile" name="login" onClick={showModalHandler}>
        Login 
      </Nav.Link>
      <Nav.Link as="a" className="border-bottom nav-mobile" name="register" onClick={showModalHandler}>
        Sign up
      </Nav.Link>
    </>
  )

  let headerMobile

  if (user !== null) {
    auth = (
      <Form inline>
        <Dropdown alignRight>
          <Dropdown.Toggle variant="white" className={btnAccount}>
            <span className="text text-capitalize">{user.username}</span>
            <img
              className="img-profile"
              src={`${process.env.API_URL}/static/avatars/${user.avatar}`}
              alt="profile"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user.admin && (
              <Link href="/admin" as="/admin">
                <Dropdown.Item as="a" className="hov_pointer">
                  Admin
                </Dropdown.Item>
              </Link>
            )}
            <Link href="/account" as="/account">
              <Dropdown.Item as="a" className="hov_pointer">
                Account
              </Dropdown.Item>
            </Link>
            <Dropdown.Item as="a" className="hov_pointer" onClick={logouthandler}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    );

    authMobile = (
      <>
        <Link href="/account" as="/account">
          <Nav.Link as="a" className="border-bottom nav-mobile" onClick={onClose}>
            Account
          </Nav.Link>
        </Link>
        {user.admin && (
          <Link href="/admin" as="/admin">
            <Nav.Link as="a" className="border-bottom nav-mobile" onClick={onClose}>
              Admin
            </Nav.Link>
          </Link>
        )}
        <Nav.Link as="a" onClick={logouthandler} className="border-bottom nav-mobile">
          Logout
        </Nav.Link>
      </>
    )

    headerMobile = (
      <div className="text-truncate mr-2">
        <img
          className="img-profile mr-2"
          src={`${process.env.API_URL}/static/avatars/${user.avatar}`}
          alt="profile"
        /> 
        <span className="text-capitalize text-truncate">
          {user.username}
        </span>
      </div>
    )
  }

  return (
    <>
      <Navbar expand="lg" fixed="top" className={navCss} expanded={false}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={navLogo}
              width="210"
              className="d-inline-block align-top"
              alt="bali hot property logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={showDrawer}>
            <i className={isTop ? "text-secondary far fa-bars" : "far fa-bars"} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto align-items-center">
              <Select 
                value={currency}
                className={`currencyNavbar ${currencyNavbar}`}
                bordered={false} 
                onChange={changeCurrencyHandler}
                suffixIcon={<i className={"far fa-angle-down " + currencyNavbar} />}
              >
                <Option value="USD">USD</Option>
                <Option value="IDR">IDR</Option>
              </Select>

              {/*
                <Nav.Link>
                  <img src={`${IMAGE}indonesia.png`} width="28" 
                    className="hov_pointer mr-2" 
                    onClick={() => changeCurrencyHandler("IDR")} 
                  />
                  {"/"}
                  <img src={`${IMAGE}australia.png`} width="28" 
                    className="hov_pointer ml-2" 
                    onClick={() => changeCurrencyHandler("USD")} 
                  />
                </Nav.Link>
              */}

              <Link href="/#home" as="/#home">
                <Nav.Link as="a" className={btnNavbar + " hov_pointer"}>
                  Home
                </Nav.Link>
              </Link>
              <Link href="/#property" as="/#property">
                <Nav.Link as="a" className={btnNavbar + " hov_pointer"}>
                  Property
                </Nav.Link>
              </Link>
              <Link href="#contact" as="#contact">
                <Nav.Link as="a" className={btnNavbar + " hov_pointer"}>
                  Contact
                </Nav.Link>
              </Link>
              {auth}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AnimatePresence exitBeforeEnter>
        {modalShow ? (
          <motion.div
            className="modal"
            style={{ display: "block" }}
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "650px" }}>
              <div className="modal-content">
                <div className="bar top"></div>
                <div className="bar right delay1"></div>
                <div className="bar bottom delay2"></div>
                <div className="bar left"></div>
                <Modal.Header
                  className="border-0 pb-0 ml-auto"
                  closeButton
                  onClick={closeModalHandler}
                ></Modal.Header>
                <div className="col-md-10 mx-auto">
                  <Modal.Body>
                    {!resetView && !resendView && (
                      <AnimatePresence exitBeforeEnter key={changeView}>
                        {changeView ? (
                          <Login
                            viewed={changeViewHandler}
                            closed={closeModalHandler}
                            reset={resetViewHandler}
                            resend={resendViewHandler}
                          />
                        ) : (
                          <Register viewed={changeViewHandler} closed={closeModalHandler} />
                        )}
                      </AnimatePresence>
                    )}
                    {resetView && (
                      <AnimatePresence exitBeforeEnter key={resetView}>
                        {resetView && (
                          <Reset viewed={changeViewHandler} closed={closeModalHandler} />
                        )}
                      </AnimatePresence>
                    )}
                    {resendView && (
                      <AnimatePresence exitBeforeEnter key={resendView}>
                        {resendView && (
                          <ResendEmail viewed={changeViewHandler} closed={closeModalHandler} />
                        )}
                      </AnimatePresence>
                    )}
                  </Modal.Body>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalShow ? (
          <motion.div
            className="modal-backdrop fade show"
            initial="initial"
            animate="in"
            exit="out"
            transition={{
              duration: 0.2,
            }}
            variants={BackdropModal}
          ></motion.div>
        ) : null}
      </AnimatePresence>
      <Drawer
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        placement="right"
        closeIcon={ <i className="fas fa-times" /> }
        onClose={onClose}
        visible={visible}
        zIndex="1030"
        headerStyle={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
        title={headerMobile}
      >
        <Nav defaultActiveKey="/home" className="flex-column">
          <Link href="/#home" as="/#home">
            <Nav.Link as="a" className="border-bottom nav-mobile" onClick={onClose}>
              Home
            </Nav.Link>
          </Link>
          <Link href="/#property" as="/#property">
            <Nav.Link as="a" className="border-bottom nav-mobile" onClick={onClose}>
              Property
            </Nav.Link>
          </Link>
          <Link href="#contact" as="#contact">
            <Nav.Link as="a" className="border-bottom nav-mobile" onClick={onClose}>
              Contact
            </Nav.Link>
          </Link>
          {authMobile}
          <Select 
            value={currency}
            className="pl-1 text-dark"
            bordered={false} 
            onChange={changeCurrencyHandler}
            suffixIcon={<i className={"far fa-angle-down"} />}
          >
            <Option value="USD">USD</Option>
            <Option value="IDR">IDR</Option>
          </Select>
        </Nav>
      </Drawer>
      <style global jsx>{`
        .navbar {
          padding: 0.3rem 1rem;
        }
        .navbar-border-bottom {
          box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 2px !important;
        }
        :global(.navbar-default) {
          transition: 500ms ease;
          background: transparent;
        }
        :global(.navbar-default .nav-link) {
          color: white !important;
        }
        :global(.navbar-scrolled) {
          transition: 500ms ease;
          background: white;
          box-shadow: rgb(76, 76, 76) 0px 1px 2px;
        }
        :global(.navbar-scrolled .nav-link) {
          color: black !important;
        }
        :global(.navbar-light .navbar-toggler) {
          border-color: #6c757d;
        }
        :global(.text-black){
          color: black !important;
        }
        :global(.text-white){
          color: white !important;
        }
    :global(.currencyNavbar > .ant-select-selector, .currencyNavbar > .ant-select-selector > .ant-select-selection-item){
      transition: unset !important;
    }

        .signup-button {
          border: 1px solid transparent !important;
          border-color: #ebebeb !important;
          border-radius: 21px !important;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18) !important;
          height: 42px !important;
          background: transparent !important;
          cursor: pointer !important;
          font-size: 14px;
          align-items: center !important;
          vertical-align: middle !important;
          height: 42px !important;
          font-weight: 500;
          transition: box-shadow 0.2s ease !important;
        }
        .signup-button:hover,
        .account-button:hover {
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12) !important;
        }
        .navbar-expand-lg .navbar-nav .nav-link {
          padding-right: 1rem !important;
          padding-left: 1rem !important;
        }
        .navbar-link-color {
          color: #222222 !important;
        }
        .btn-navbar {
          color: #222222 !important;
        }
        .btn-navbar:hover {
          background: #f7f7f7 !important;
          border-radius: 22px !important;
          bottom: 0px !important;
          top: 0px !important;
          z-index: 0 !important;
        }
        .btn-navbar-top:hover {
          background: rgba(31, 43, 50, 0.4) !important;
          border-radius: 22px !important;
          bottom: 0px !important;
          top: 0px !important;
          z-index: 0 !important;
        }
        .modal-content {
          border: none !important;
          border-radius: 0px !important;
          overflow: hidden !important;
        }
        :global(.btn-account) {
          display: flex;
          align-items: center;
          border: 1px solid transparent !important;
          border-color: #ebebeb !important;
          border-radius: 21px !important;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18) !important;
          height: 42px !important;
          width: 110px;
          background: transparent !important;
          cursor: pointer !important;
          font-size: 14px;
          align-items: center !important;
          vertical-align: middle !important;
          font-weight: 500;
          transition: box-shadow 0.2s ease !important;
          padding-right: 6px !important;
        }
        :global(.btn-account > .img-profile) {
          width: 30px;
          border-radius: 50%;
          margin-left: 6px;
        }
        :global(.btn-account::after) {
          display: none !important;
        }
        :global(.nav-mobile:hover){
          color: #212529;
          background-color: rgba(0,0,0,.075);
        }
        .img-profile {
          width: 30px;
          border-radius: 50%;
          margin-left: 6px;
        }

        .bar {
          position: absolute;
          width: 50px;
          height: 5px;
          background: #1778f2;
          transition: all 2s linear;
          -webkit-animation-duration: 2s;
          animation-duration: 2s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
        }
        .bar.delay1 {
          animation-delay: 1.4s;
          -webkit-animation-delay: 1.4s;
        }
        .bar.delay2 {
          animation-delay: 1.1s;
          -webkit-animation-delay: 1.1s;
        }
        .top {
          top: 0px;
          left: -5px;
        }
        .right {
          top: 18px;
          right: -23px;
          transform: rotate(90deg);
        }
        .bottom {
          bottom: 0px;
          left: -5px;
        }
        .left {
          top: 180px;
          left: -23px;
          transform: rotate(90deg);
        }
        @-webkit-keyframes h-move {
          0% {
            left: -50px;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes h-move {
          0% {
            left: -50px;
          }
          100% {
            left: 100%;
          }
        }
        .top,
        .bottom {
          -webkit-animation-name: h-move;
          animation-name: h-move;
        }
        @-webkit-keyframes v-move {
          0% {
            top: -30px;
          }
          100% {
            top: 110%;
          }
        }
        @keyframes v-move {
          0% {
            top: -30px;
          }
          100% {
            top: 110%;
          }
        }
        .right,
        .left {
          -webkit-animation-name: v-move;
          animation-name: v-move;
        }
      `}</style>
    </>
  );
};

export default Header;
