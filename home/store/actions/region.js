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

/* SLUG REGION */
export const slugRegionStart = () => {
  return { type: actionType.SLUG_REGION_START }
}
export const slugRegionSuccess = slug => {
  return {
    type: actionType.SLUG_REGION_SUCCESS,
    slug: slug 
  }
}
export const slugRegionFail = error => {
  return {
    type: actionType.SLUG_REGION_FAIL,
    error: error
  }
}
/* SLUG REGION*/

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

export const slugRegion = (slug) => {
  return dispatch => {
    dispatch(slugRegionStart())
    axios.get(`/region/${slug}`)
      .then(res => {
        dispatch(slugRegionSuccess(res.data))
      })
      .catch(err => {
        dispatch(slugRegionFail(err.response))
      })
  }
}
