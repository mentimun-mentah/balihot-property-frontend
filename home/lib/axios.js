import axios from "axios";
import {parseCookies, setCookie} from "nookies";

const instance = axios.create({
  baseURL: process.env.API_URL,
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
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const headerRefresh = {
      headers: { Authorization: `Bearer ${refresh_token}` }
    }

    if(error.response.data.msg === "Token has expired"){
      instance.post('/refresh', null, headerRefresh)
        .then(res => {
          setCookie(null, "access_token", res.data.access_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          return Promise.resolve()
        })
    }
    return Promise.reject(error);
  });

export default instance;
