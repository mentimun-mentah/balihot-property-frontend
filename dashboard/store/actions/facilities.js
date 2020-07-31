import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getFacilityStart = () => {
  return { type: actionType.GET_FACILITY_START }
}

export const getFacilitySuccess = (facility) => {
  return {
    type: actionType.GET_FACILITY_SUCCESS,
    facility: facility
  }
}

export const getFacilityfail = (error) => {
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
        dispatch(getFacilityfail(err.response))
      })
  }
}

