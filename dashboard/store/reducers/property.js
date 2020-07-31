import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  property: null,
  loading: false,
  error: null
}

export const getPropertyStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getPropertySuccess = (state, action) => {
  return updateObject(state, {
    property: action.property, 
    loading: false, 
    error: null
  })
}
export const getPropertyFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PROPERTY_START:
      return getPropertyStart(state, action)

    case actionType.GET_PROPERTY_SUCCESS:
      return getPropertySuccess(state, action)
      
    case actionType.GET_PROPERTY_FAIL:
      return getPropertyFail(state, action)

    default: 
      return state
  }
}

export default reducer

