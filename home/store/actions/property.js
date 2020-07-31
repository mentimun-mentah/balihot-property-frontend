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

export const getPropertySaleSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_SALE,
    property: property
  }
}

export const getPropertyRentSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_RENT,
    property: property
  }
}

export const getPropertyLandSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_LAND,
    property: property
  }
}

export const getProperty = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const getPropertySale = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?property_for=Sale&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const getPropertyRent = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?property_for=Rent&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const getPropertyLand = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?type_id=2&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}
