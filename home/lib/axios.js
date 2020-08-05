import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
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

const refreshAuthLogic = async (failedRequest) => {

  const headerRefresh = {
    headers: { Authorization: `Bearer ${refresh_token}` }
  }

  return instance
    .post('/refresh', null, headerRefresh)
    .then((res) => {
      setCookie(null, "access_token", res.data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      failedRequest.response.config.headers.Authorization = `Bearer ${res.data.access_token}`;
        return Promise.resolve();
    });
};

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;
