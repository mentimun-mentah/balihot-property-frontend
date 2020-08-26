import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

export const getNewsletterStart = () => {
  return { type: actionType.GET_NEWSLETTER_START }
}

export const getNewsletterSuccess = newsletter => {
  return {
    type: actionType.GET_NEWSLETTER_SUCCESS,
    newsletter: newsletter
  }
}

export const getNewsletterFail = error => {
  return {
    type: actionType.GET_NEWSLETTER_FAIL,
    error: error
  }
}

export const getNewsletter = () => {
  return dispatch => {
    dispatch(getNewsletterStart())
    axios.get('/newsletters')
      .then(res => {
        dispatch(getNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(getNewsletterFail(err.response))
      })
  }
}
