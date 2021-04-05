import * as actionType from "./actionTypes";
import axios from "axios";
import cookies from "nookies";

export const getCurrencySuccess = currency => {
  return {
    type: actionType.GET_CURRENCY,
    currency: currency 
  }
}

export const getCurrency = (e) => {
  return dispatch => {
    axios.get(`https://api.exchangerate.host/latest?base=USD&symbols=${e}`)
      .then(res => {
        cookies.set(null, "currency", e, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        dispatch(getCurrencySuccess(res.data))
      })
      .catch(() => {})
  }
}
