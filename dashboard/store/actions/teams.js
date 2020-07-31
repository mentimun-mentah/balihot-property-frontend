import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getTeamStart = () => {
  return { type: actionType.GET_TEAM_START}
}

export const getTeamSuccess = (team) => {
  return {
    type: actionType.GET_TEAM_SUCCESS,
    team: team
  }
}

export const getTeamFail = (error) => {
  return {
    type: actionType.GET_TEAM_FAIL,
    error: error
  }
}

export const getTeam = () => {
  return dispatch => {
    dispatch(getTeamStart())
    axios.get('/teams')
      .then(res => {
        dispatch(getTeamSuccess(res.data))
      })
      .catch(err => {
        dispatch(getTeamFail(err.response))
      })
  }
}
