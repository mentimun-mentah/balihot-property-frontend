import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getRegionStart = () => {
  return { type: actionType.GET_REGION_START }
}

export const getRegionSuccess = (region) => {
  return {
    type: actionType.GET_REGION_SUCCESS,
    region: region
  }
}

export const getRegionFail = (error) => {
  return {
    type: actionType.GET_REGION_FAIL,
    error: error
  }
}

/* GET DATA REGION */
export const getDataRegionStart = () => {
  return { type: actionType.GET_DATA_REGION_START }
}
export const getDataRegionSuccess = data => {
  return {
    type: actionType.GET_DATA_REGION_SUCCESS,
    data: data
  }
}
export const getDataRegionFail = error => {
  return {
    type: actionType.GET_DATA_REGION_FAIL,
    error: error
  }
}
/* SLUG PROPERTY */

export const getRegion = () => {
  return dispatch => {
    dispatch(getRegionStart())
    axios.get('/regions')
      .then(res => {
        dispatch(getRegionSuccess(res.data))
      })
      .catch(err => {
        dispatch(getRegionFail(err.response))
      })
  }
}

export const getDataRegion = (id, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(getDataRegionStart())
    if(access_token){
      axios.get(`/region/crud/${id}`, headerCfg)
        .then(res => {
          dispatch(getDataRegionSuccess(res.data))
        })
        .catch(err => {
          dispatch(getDataRegionFail(err.response))
        })
    }
  }
}
