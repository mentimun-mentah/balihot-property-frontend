import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  types: null,
  loading: false,
  error: null
}

export const getTypeStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getTypeSuccess = (state, action) => {
  return updateObject(state, {
    types: action.types, 
    loading: false, 
    error: null
  })
}
export const getTypeFail  = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_TYPE_START:
      return getTypeStart(state, action)

    case actionType.GET_TYPE_SUCCESS:
      return getTypeSuccess(state, action)
      
    case actionType.GET_TYPE_FAIL:
      return getTypeFail(state, action)

    default: 
      return state
  }
}

export default reducer
