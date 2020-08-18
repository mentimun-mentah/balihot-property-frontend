import cookies from "nookies";
import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getTotalVisitorSuccess = visitor => {
  return {
    type: actionType.GET_TOTAL_VISITOR,
    visitor: visitor 
  }
}

export const getPropertyVisitorSuccess = propertyVisitor => {
  return {
    type: actionType.GET_VISITOR_PROPERTIES,
    propertyVisitor: propertyVisitor
  }
}

export const getPropertyVisitor = (ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    axios.get('/dashboard/visitor-properties', headerCfg)
      .then(res => {
        dispatch(getPropertyVisitorSuccess(res.data))
      })
      .catch(() => {})
  }
}

export const getTotalVisitor = (ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    axios.get('/dashboard/total-visitor', headerCfg)
      .then(res => {
        dispatch(getTotalVisitorSuccess(res.data))
      })
      .catch(() => {})
  }
}

