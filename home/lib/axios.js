import getConfig from 'next/config';
import axios from "axios";
import * as actions from "../store/actions";
import Router from "next/router";
import {parseCookies, setCookie, destroyCookie} from "nookies";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const API_URL = serverRuntimeConfig.API_URL || publicRuntimeConfig.API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

const {access_token, refresh_token} = parseCookies()

export const headerCfg = {
  headers: { Authorization: `Bearer ${access_token}` }
}

export const headerCfgFormData = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    "content-type": "multipart/form-data"
  }
}

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    console.log("REQUEST AXIOS LIB ##### => ", error.response)
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const headerRefresh = { headers: { Authorization: `Bearer ${refresh_token}` } }
    console.log("AXIOS LIB ##### => ", error.response)
    if(error.response.status == 401 && error.response.data.msg === "Token has expired"){
      if(refresh_token){
        await instance.post('/refresh', null, headerRefresh)
          .then(res => {
            setCookie(null, "access_token", res.data.access_token, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            })
            return Promise.resolve()
          })
          .catch((err) => {
            console.log("ERROR REFRESH AXIOS LIB ##### +++> ", err.response.status, err.response.data)
            destroyCookie(null, "access_token", { path: "/" })
            destroyCookie(null, "refresh_token", { path: "/" })
            destroyCookie(null, "username", { path: "/" })
            process.browser && Router.reload()
          })
          .then(() => {
            return Promise.resolve()
          })
      } else {
        destroyCookie(null, "access_token", { path: "/" })
        destroyCookie(null, "refresh_token", { path: "/" })
        destroyCookie(null, "username", { path: "/" })
        process.browser && Router.reload()
      }
    }
    if(error.response.status == 401 && error.response.data.msg === "Token has been revoked"){
      destroyCookie(null, "access_token", { path: "/" })
      destroyCookie(null, "refresh_token", { path: "/" })
      destroyCookie(null, "username", { path: "/" })
      process.browser && Router.reload()
    }
    if(error.response.status == 422 && error.response.data.msg === "Not enough segments"){
      destroyCookie(null, "access_token", { path: "/" })
      destroyCookie(null, "refresh_token", { path: "/" })
      destroyCookie(null, "username", { path: "/" })
      process.browser && Router.reload()
    }

    return Promise.reject(error);
  });

export default instance;
