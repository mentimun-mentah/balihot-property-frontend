import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  region: null,
  loading: false,
  error: null
}

export const getRegionStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getRegionSuccess = (state, action) => {
  return updateObject(state, {
    region: action.region, 
    loading: false, 
    error: null
  })
}
export const getRegionFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_REGION_START:
      return getRegionStart(state, action)

    case actionType.GET_REGION_SUCCESS:
      return getRegionSuccess(state, action)
      
    case actionType.GET_REGION_FAIL:
      return getRegionFail(state, action)

    default: 
      return state
  }
}

export default reducer
