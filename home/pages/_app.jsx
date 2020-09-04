import { useEffect } from "react";
import { Provider } from "react-redux";
import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import * as actions from "../store/actions";
import withReduxStore from "../lib/with-redux-store";
import axios from "axios";

import "antd/dist/antd.css";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "render-smooth-image-react/build/style.css";
import "react-responsive-carousel/lib/styles/carousel.css";

const App = ({ Component, pageProps, store }) => {

  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "dd114cf0-49f1-481d-af2b-033c5fea4c53";
    (function () {
      let d = document;
      let s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <title>BaliHotProperty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/static/images/balihot-property.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.css" />
        <link rel="stylesheet" href="/static/css/utility.css" />
        <link rel="stylesheet" href="/static/css/placeholder-loading.css" />
        <link rel="stylesheet" href="/static/css/image-galery.css" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <style global jsx>{`
        blockquote {
          border-left: 5px solid #ebebeb;
          margin: 1.5em 0px;
          padding: 0.5em 20px;
        }
        blockquote p::before {
          content: open-quote;
        }

        blockquote p::after {
          content: close-quote;
        }
        blockquote p {
          display: inline;
          font-size: 100%;
        }
        .truncate-2 {
          -webkit-line-clamp: 2;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .truncate-3 {
          -webkit-line-clamp: 3;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .ant-upload-list-picture .ant-upload-list-item-error, .ant-upload-list-picture-card .ant-upload-list-item-error{
          border: 1px solid #d9d9d9;
        }
        .ant-tooltip-placement-top{
          display: none;
        }
        .ant-upload-list-picture-card .ant-upload-list-item-info::before {
          left: 0;
        }
        .anticon {
          vertical-align: 0.1em;
        }
        .h-40 {
          height: 40px !important;
        }
        .h-45 {
          height: 45px !important;
        }
        .h-47 {
          height: 47px !important;
        }
        .h-50 {
          height: 50px !important;
        }
        .mt-6 {
          margin-top: 6rem!important;
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

        /*### EMPTY CARD ###*/
        :global(.img-size) {
          width: auto;
          height: 100px;
          opacity: 0.5;
        }
        @media (max-width: 991px) {
          :global(.crisp-client .crisp-1rjpbb7){
            z-index: 1030 !important;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  await ctx.store.dispatch(actions.authCheckState(ctx))
  const resText = await axios.get(process.env.TEXT_URL);
  await ctx.store.dispatch(actions.getTextSuccess(resText.data)); 
  return { pageProps };
};

export default withReduxStore(App);
