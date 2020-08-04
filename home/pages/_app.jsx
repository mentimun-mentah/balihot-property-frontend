import { Provider } from "react-redux";
import React from "react";
import Head from "next/head";
import axios from "../lib/axios";
import cookie from "nookies";
import Layout from "../components/Layout";
import * as actions from "../store/actions";
import withReduxStore from "../lib/with-redux-store";

import "antd/dist/antd.css";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-awesome-slider/dist/styles.css";
import "react-multi-carousel/lib/styles.css";
import "render-smooth-image-react/build/style.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-responsive-carousel/lib/styles/carousel.css";

const App = ({ Component, pageProps, store }) => {
  return (
    <React.Fragment>
      <Head>
        <title>BaliHotProperty</title>
        <link rel="icon" href="/static/images/balihot-property.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.css" />
        <link rel="stylesheet" href="/static/css/utility.css" />
        <link rel="stylesheet" href="/static/css/placeholder-loading.css" />
        <link rel="stylesheet" href="/static/css/image-galery.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <style global jsx>{`
        .h-47 {
          height: 47px !important;
        }
        .h-50 {
          height: 50px !important;
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

        .border-grey {
          border-color: #ced4da !important;
        }
        .shadow-card {
          box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px !important;
        }
        .text-bhp {
          color: #ff385c !important;
        }
        :focus, button:focus {
          outline: none;
        }
        .btn-red-hot {
          background-color: #ff385c;
          border-color: #ff385c;
          color: #fff;
        }
        .btn-red-hot:hover {
          background-color: #ff385c;
          border-color: #ff385c;
          color: #fff;
        }
        .btn-red-hot:focus {
          background-color: #ff385c;
          border-color: #ff385c;
          color: #fff;
          box-shadow: 0 0 0 0.2rem rgba(245, 57, 92, 0.53);
        }
        .btn-red-hot:not(:disabled):not(.disabled):active {
          background-color: #ff385c;
          border-color: #ff385c;
          color: #fff;
        }
        .btn-red-hot:not(:disabled):not(.disabled):active:focus {
          box-shadow: 0 0 0 0.2rem rgba(245, 57, 92, 0.53);
        }
        :global(.bd-right) {
          border-right: 1px solid #ddd;
          border-radius: 0px;
          margin-right: 0.4em;
        }
        :global(.bd-right:last-child) {
          border-right: 0px;
          border-radius: 0px;
          margin-right: 0.4em;
        }
        :global(.dropdown-text-turncate .text) {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100px;
          display: inline-block;
          vertical-align: middle;
        }
        :global(.dropdown-item-status > .check-mark) {
          display: none;
        }
        :global(.dropdown-item.active, .dropdown-item:active) {
          color: #484848;
          background-color: #efefef;
        }
        :global(.dropdown-item.active > .check-mark) {
          display: block;
        }
        :global(.dropdown-toggle::after) {
          display: inline-block;
          margin-right: 0px;
          margin-top: 10px !important;
          float: right;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-bottom: 0;
          border-left: 0.3em solid transparent;
        }
        :global(.dropdown-item:hover) {
          text-decoration: none;
          background-color: #efefef;
        }
        :global(.btn:focus) {
          outline: 0;
          box-shadow: unset;
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
        :global(.gm-style-pbc){
          opacity: 0 !important;
        }
        
        /*ANTD SLIDER*/
        :global(.ant-slider-handle){
          background-color: white;
          border: solid 2px #ff395b;
        }
        :global(.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)){
          border-color: #f72f32;
        }
        :global(.ant-slider-handle:focus, 
                .ant-slider-handle-dragging.ant-slider-handle-dragging.ant-slider-handle-dragging){
          border: solid 2px #ff395b;
          box-shadow: 0 0 0 5px #ff4d4f36;
        }
        :global(.ant-slider:hover .ant-slider-track) {
          background-color: #f9696be0;
        }
        :global(.ant-slider-track){
          background-color: #f9696be0;
        }
      `}</style>
    </React.Fragment>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  await ctx.store.dispatch(actions.authCheckState(ctx))
  const { access_token, refresh_token } = cookie.get(ctx);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  if(access_token && access_token !== undefined){
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    try{
      const resUser = await axios.get('/user', headerCfg)
      await ctx.store.dispatch(actions.getUserSuccess(resUser.data))
    }
    catch (err){
      if(refresh_token){
        await ctx.store.dispatch(actions.refreshToken());
      }
      if(!refresh_token){
        await ctx.store.dispatch(actions.logout(ctx));
      }
      // if(!err.response && !err.response.status) return;
      // if(err.response.status == 422) await ctx.store.dispatch(actions.logout(ctx));
      // if(err.response.status == 403) await ctx.store.dispatch(actions.logout(ctx));
    }
  }
  return { pageProps };
};

export default withReduxStore(App);
