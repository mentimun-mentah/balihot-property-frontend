import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  team: null,
  loading: false,
  error: null
}

export const getTeamStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getTeamSuccess = (state, action) => {
  return updateObject(state, {
    team: action.team, 
    loading: false, 
    error: null
  })
}
export const getTeamFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_TEAM_START:
      return getTeamStart(state, action)

    case actionType.GET_TEAM_SUCCESS:
      return getTeamSuccess(state, action)
      
    case actionType.GET_TEAM_FAIL:
      return getTeamFail(state, action)

    default: 
      return state
  }
}

export default reducer
