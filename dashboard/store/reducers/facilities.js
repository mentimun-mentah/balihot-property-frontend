import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  facility: null,
  loading: false,
  error: null
}

export const getFacilityStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getFacilitySucces = (state, action) => {
  return updateObject(state, {
    facility: action.facility, 
    loading: false, 
    error: null
  })
}
export const getFacilityFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FACILITY_START:
      return getFacilityStart(state, action)

    case actionType.GET_FACILITY_SUCCESS:
      return getFacilitySucces(state, action)
      
    case actionType.GET_FACILITY_FAIL:
      return getFacilityFail(state, action)

    default: 
      return state
  }
}

export default reducer
