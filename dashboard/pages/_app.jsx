import { Provider } from "react-redux";
import { useRouter } from "next/router";

import Head from "next/head";
import cookie from "nookies";
import axios from "../lib/axios";
import Layout from "../components/Layout";
import * as actions from "../store/actions";
import withReduxStore from "../lib/with-redux-store";

import "../public/static/css/index.css";
import "antd/dist/antd.css";
import "react-responsive-carousel/lib/styles/carousel.css";

const App = ({ Component, pageProps, store, admin }) => {
  const Router = useRouter();

  let ComponetToRender =
    admin && Router.pathname.startsWith("/") ? (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    ) : (
      <NotAdmin />
    );

  return (
    <>
      <Head>
        <title>BaliHotProperty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/images/balihot-property.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.css" />
        <link rel="stylesheet" href="/static/css/utility.css" />
      </Head>
      {ComponetToRender}
      <style global jsx>{`
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
      `}</style>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let admin = false;
  await ctx.store.dispatch(actions.authCheckState(ctx))
  const { access_token } = cookie.get(ctx);
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  console.log("ACCESS TOKEN DASHBOARD ======> ", access_token)

  if(!access_token || access_token === undefined) {
    admin = false;
    process.browser
      ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
      : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
  }
  try{
    if(access_token && access_token !== undefined){
      const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
      const resUser = await axios.get('/user', headerCfg)
      await ctx.store.dispatch(actions.getUserSuccess(resUser.data))
      admin = resUser.data.admin;
    }
  }
  catch (err) {
    process.browser
      ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
      : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
  }

  return { pageProps, admin };
};

export default withReduxStore(App);
