import { Provider } from "react-redux";

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Head from "next/head";
import cookie from "nookies";
import axios from "../lib/axios";
import Layout from "../components/Layout";
import * as actions from "../store/actions";
import withReduxStore from "../lib/with-redux-store";

import "../public/static/css/index.css";
import "antd/dist/antd.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import 'suneditor/dist/css/suneditor.min.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps, store }) => {

  console.error = (function(_error) {
    return function(message) {
      if (
        typeof message !== "string" ||
        message.indexOf("component is `contentEditable`") === -1
      ) {
        _error.apply(console, arguments);
      }
    };
  })(console.error);

  return (
    <>
      <Head>
        <title>BaliHotProperty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/static/images/balihot-property.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.css" />
        <link rel="stylesheet" href="/static/css/utility.css" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <style global jsx>{`
        #nprogress .bar {
          background: #ff385c;
          height: 3px;
        }

        #nprogress .spinner-icon {
          border-top-color: #ff385c;
          border-left-color: #ff385c;
        }

        .bor-rad-10 {
          border-radius: 10px !important;
        }
        .bor-rad-top-10 {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .bor-rad-btm-10 {
          border-bottom-left-radius: 10px !important;
          border-bottom-right-radius: 10px !important;
        }
        .bor-rad-right-0 {
          border-top-right-radius: 0px !important;
          border-bottom-right-radius: 0px !important;
        }
        .bor-rad-left-10 {
          border-top-left-radius: 10px !important;
          border-bottom-left-radius: 10px !important;
        }
        .bor-rad-btm-left-10 {
          border-bottom-left-radius: 10px !important;
        }
        .ant-upload-list-picture .ant-upload-list-item-error, .ant-upload-list-picture-card .ant-upload-list-item-error{
          border: 1px solid #d9d9d9;
        }
        .ant-tooltip-placement-bottom, .ant-tooltip-placement-top{
          display: none;
        }

        .ant-upload.ant-upload-select-picture-card {
          width: 150px !important;
          height: 150px !important;
        }
        .invalid-upload > .ant-upload.ant-upload-select-picture-card {
          border-color: #fb6340;
        }
        .ant-upload-list-picture-card-container,
        .ant-upload-list-picture-card .ant-upload-list-item {
          width: 150px;
          height: 150px;
        }
        .ant-upload-list-picture-card .ant-upload-list-item-info::before {
          left: 0;
        }
        .anticon {
          vertical-align: 0.1em;
        }
        .border-invalid {
          border-color: #fb6340;
        }

        /*GOOGLE MAPS*/
        :global(.gm-ui-hover-effect) {
          display: none !important;
        }
        :global(.gm-style-iw-d) {
          overflow: hidden !important;
        }
        :global(.gm-style .gm-style-iw-c) {
          padding: 0px;
          top: 40px;
        }
        :global(.gm-style .gm-style-iw-t::after) {
          top: 38px;
        }
        :global(.gmnoprint > div) {
          border-radius: 8px !important;
        }
        :global(.gm-control-active.gm-fullscreen-control) {
          border-radius: 8px !important;
        }
        :global(.img-size) {
          width: auto;
          height: 100px;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  await ctx.store.dispatch(actions.authCheckState(ctx))
  const { access_token } = cookie.get(ctx);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  try{
    if(access_token && access_token !== undefined){
      const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
      const resUser = await axios.get('/user', headerCfg)
      await ctx.store.dispatch(actions.getUserSuccess(resUser.data))
      if(!resUser.data.admin){
        process.browser
          ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
          : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
      }
    }
    if(!access_token || access_token === undefined) {
      process.browser
        ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
    }
  }
  catch (err) {
    process.browser
      ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
      : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
  }

  return { pageProps };
};

export default withReduxStore(App);
