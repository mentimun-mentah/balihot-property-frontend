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

/* TITLE NEWSLETTER */
export const getTitleStart = () => {
  return { type: actionType.GET_TITLE_START }
}
export const getTitleSuccess = title => {
  return { type: actionType.GET_TITLE_SUCCESS, title: title }
}
export const getTitleFail = error => {
  return { type: actionType.GET_TITLE_FAIL, error: error }
}
/* TITLE NEWSLETTER */

export const getNewsletter = query => {
  return dispatch => {
    dispatch(getNewsletterStart())
    axios.get(`/newsletters${query}`)
      .then(res => {
        dispatch(getNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(getNewsletterFail(err.response))
      })
  }
}

export const getTitle = query => {
  return dispatch => {
    dispatch(getTitleStart())
    axios.get(`/newsletter/search-by-title${query}`)
      .then(res => {
        let title = res.data.map(obj => {
          obj['value'] = obj['title']
          delete obj['title']
          return obj 
        })
        dispatch(getTitleSuccess(title))
      })
      .catch(err => {
        dispatch(getTitleFail(err.response))
      })
  }
}
