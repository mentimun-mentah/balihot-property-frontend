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
