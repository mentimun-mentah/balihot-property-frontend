import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getFacilityStart = () => {
  return { type: actionType.GET_FACILITY_START }
}

export const getFacilitySuccess = (facilities) => {
  return {
    type: actionType.GET_FACILITY_SUCCESS,
    facilities: facilities 
  }
}

export const getFacilityFail = (error) => {
  return {
    type: actionType.GET_FACILITY_FAIL,
    error: error
  }
}

export const getFacility = () => {
  return dispatch => {
    dispatch(getFacilityStart())
    axios.get('/facilities')
      .then(res => {
        dispatch(getFacilitySuccess(res.data))
      })
      .catch(err => {
        dispatch(getFacilityFail(err.response))
      })
  }
}
