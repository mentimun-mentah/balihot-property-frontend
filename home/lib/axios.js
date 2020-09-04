import getConfig from 'next/config';
import axios from "axios";
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

export const formHeaderHandler = () => {
  let headerCfg;                                                                          
  const cookies = parseCookies()                                                          
  const { access_token } = cookies;
  headerCfg = { 
    headers: { 
      Authorization: `Bearer ${access_token}`, 
      "content-type": "multipart/form-data",
    },
    crossDomain: true,
  }
  return headerCfg
}

export const jsonHeaderHandler = () => {
  let headerCfg;                                                                          
  const cookies = parseCookies()                                                          
  const { access_token } = cookies;
  headerCfg = {
    headers: { 
      Authorization: `Bearer ${access_token}` 
    },
    crossDomain: true,
  }
  return headerCfg
}

export const cookieOptions = {
  domain : process.env.DOMAIN,
  path : '/'
}

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
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
    if(error.response && error.response.status == 401 && error.response.data.msg === "Token has expired"){
      if(refresh_token){
        await instance.post('/refresh', null, headerRefresh)
          .then(res => {
            setCookie(null, "access_token", res.data.access_token, {
              domain: process.env.DOMAIN,
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            })
            return Promise.resolve(error.config)
          })
          .catch(() => {
            destroyCookie(null, "access_token", cookieOptions)
            destroyCookie(null, "refresh_token", cookieOptions)
            destroyCookie(null, "username", cookieOptions)
            process.browser && Router.reload()
          })
          .then(() => {
            return Promise.resolve(error.config)
          })
      } else {
        destroyCookie(null, "access_token", cookieOptions)
        destroyCookie(null, "refresh_token", cookieOptions)
        destroyCookie(null, "username", cookieOptions)
        process.browser && Router.reload()
      }
    }
    if(error.response && error.response.status == 401 && error.response.data.msg === "Token has been revoked"){
      destroyCookie(null, "access_token", cookieOptions)
      destroyCookie(null, "refresh_token", cookieOptions)
      destroyCookie(null, "username", cookieOptions)
      process.browser && Router.reload()
    }
    if(error.response && error.response.status == 422 && error.response.data.msg === "Not enough segments"){
      destroyCookie(null, "access_token", cookieOptions)
      destroyCookie(null, "refresh_token", cookieOptions)
      destroyCookie(null, "username", cookieOptions)
      process.browser && Router.reload()
    }

    return Promise.reject(error);
  });

export default instance;
