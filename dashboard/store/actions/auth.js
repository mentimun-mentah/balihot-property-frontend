import * as actionType from "./actionTypes";
import cookies from "nookies";
import Router from "next/router";
import axios, { cookieOptions } from "../../lib/axios";

/*** AUTH ***/
export const authStart = () => {
  return { type: actionType.AUTH_START };
};
export const authSuccess = (access_token, refresh_token, user) => {
  return {
    type: actionType.AUTH_SUCCESS,
    access_token: access_token,
    refresh_token: refresh_token,
    user: user
  };
};
export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  return { type: actionType.AUTH_LOGOUT };
};

/*** GET_USER ***/
export const getUserSuccess = (data) => {
  return { type: actionType.GET_USER, data: data };
};

export const refreshTokenSuccess = (access_token) => {
  return { type: actionType.REFRESH_TOKEN, access_token: access_token };
};

export const authCheckState = (ctx) => {
  return (dispatch) => {
    dispatch(authStart());
    const { access_token } = cookies.get(ctx);
    if (access_token) {
      const { refresh_token, username } = cookies.get(ctx);
      if((access_token && !refresh_token) || (refresh_token && !access_token)){
        dispatch(authLogout())
        cookies.destroy(ctx, "access_token", cookieOptions);
        cookies.destroy(ctx, "refresh_token", cookieOptions);
        cookies.destroy(ctx, "username", cookieOptions);
      }
      if(!refresh_token || refresh_token === undefined || refresh_token === null){
        dispatch(authLogout())
        cookies.destroy(ctx, "access_token", cookieOptions);
        cookies.destroy(ctx, "refresh_token", cookieOptions);
        cookies.destroy(ctx, "username", cookieOptions);
      }
      if(!username){
        dispatch(authLogout())
        cookies.destroy(ctx, "access_token", cookieOptions);
        cookies.destroy(ctx, "refresh_token", cookieOptions);
        cookies.destroy(ctx, "username", cookieOptions);
      }
      else if(access_token && refresh_token && username) {
        dispatch(authSuccess(access_token, refresh_token, username));
      }
    } else {
      dispatch(authLogout())
      cookies.destroy(ctx, "access_token", cookieOptions);
      cookies.destroy(ctx, "refresh_token", cookieOptions);
      cookies.destroy(ctx, "username", cookieOptions);
    }
  };
};

export const getUser = (ctx) => {
  return (dispatch) => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    if (access_token && access_token !== undefined) {
      axios.get('/user', headerCfg)
        .then(res => {
          dispatch(getUserSuccess(res.data))
        })
        .catch(err => {
          if(err.response && err.response.data && err.response.data.msg === "Not enough segments" || 
             err.response && err.response.data && err.response.data.msg === "Token has been revoked"){
            Router.replace("/")
            cookies.destroy(ctx, "access_token", cookieOptions);
            cookies.destroy(ctx, "refresh_token", cookieOptions);
            cookies.destroy(ctx, "username", cookieOptions);
          } else {
            dispatch(authFail(err.response))
          }
        })
    }
  }
}

export const logout = (ctx) => {
  return (dispatch) => {
    dispatch(authLogout());
    Router.replace("/")
    const { access_token, refresh_token } = cookies.get(ctx);
    const access_revoke = { headers: { Authorization: `Bearer ${access_token}` } };
    const refresh_revoke = { headers: { Authorization: `Bearer ${refresh_token}` } };
    if(access_token){
      axios.delete("/access_revoke", access_revoke)
      .then(() => {
        cookies.destroy(ctx, "access_token", cookieOptions);
        cookies.destroy(ctx, "username", cookieOptions);
      })
      .catch(err => {
        if(err.response && err.response.data && err.response.data.msg === "Not enough segments" || 
           err.response && err.response.data && err.response.data.msg === "Token has been revoked"){
          Router.replace("/")
          cookies.destroy(ctx, "access_token", cookieOptions);
          cookies.destroy(ctx, "refresh_token", cookieOptions);
          cookies.destroy(ctx, "username", cookieOptions);
        }
      });
    }
    if(refresh_token){
      axios.delete("/refresh_revoke", refresh_revoke)
      .then(() => {
        cookies.destroy(ctx, "refresh_token", cookieOptions);
        cookies.destroy(ctx, "username", cookieOptions);
      })
      .catch(err => {
        if(err.response && err.response.data && err.response.data.msg === "Not enough segments" || 
           err.response && err.response.data && err.response.data.msg === "Token has been revoked"){
          Router.replace("/")
          cookies.destroy(ctx, "access_token", cookieOptions);
          cookies.destroy(ctx, "refresh_token", cookieOptions);
          cookies.destroy(ctx, "username", cookieOptions);
        }
      });
    }
    window.location.replace("/");
    window.location.reload(true);
  };
};

export const refreshToken = (ctx) => {
  return (dispatch) => {
    const { refresh_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${refresh_token}` } };
    if (refresh_token) {
      axios
        .post("/refresh", null, headerCfg)
        .then((res) => {
          cookies.set(ctx, "access_token", res.data.access_token, {
            domain: process.env.DOMAIN,
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          dispatch(refreshTokenSuccess(res.data.access_token));
        })
        .catch((err) => {
          if(err.response && err.response.status === 422){
            dispatch(authLogout())
            cookies.destroy(ctx, "access_token", cookieOptions);
            cookies.destroy(ctx, "refresh_token", cookieOptions);
            cookies.destroy(ctx, "username", cookieOptions);
          }
        });
    }
  };
};
