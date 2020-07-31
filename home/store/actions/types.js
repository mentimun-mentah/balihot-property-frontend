import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getTypeStart = () => {
  return { type: actionType.GET_TYPE_START }
}

export const getTypeSuccess = (types) => {
  return {
    type: actionType.GET_TYPE_SUCCESS,
    types: types 
  }
}

export const getTypeFail = (error) => {
  return {
    type: actionType.GET_TYPE_FAIL,
    error: error
  }
}

export const getType = () => {
  return dispatch => {
    dispatch(getTypeStart())
    axios.get('/types')
      .then(res => {
        dispatch(getTypeSuccess(res.data))
      })
      .catch(err => {
        dispatch(getTypeFail(err.response))
      })
  }
}
