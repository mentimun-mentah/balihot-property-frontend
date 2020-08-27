import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getPropertyStart = () => {
  return { type: actionType.GET_PROPERTY_START}
}

export const getPropertySuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_SUCCESS,
    property: property
  }
}

export const getPropertyFail = (error) => {
  return {
    type: actionType.GET_PROPERTY_FAIL,
    error: error
  }
}

export const getProperty = query => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get(`/properties${query}`)
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

