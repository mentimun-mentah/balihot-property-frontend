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

/* SLUG NEWSLETTER */
export const slugNewsletterStart = () => {
  return { type: actionType.SLUG_NEWSLETTER_START }
}
export const slugNewsletterSuccess = slug => {
  return {
    type: actionType.SLUG_NEWSLETTER_SUCCESS,
    slug: slug 
  }
}
export const slugNewsletterFail = error => {
  return {
    type: actionType.SLUG_NEWSLETTER_FAIL,
    error: error
  }
}
/* SLUG NEWSLETTER */

/* POPULAR NEWSLETTER */
export const popularNewsletterStart = () => {
  return { type: actionType.POPULAR_NEWSLETTER_START }
}
export const popularNewsletterSuccess = popular => {
  return {
    type: actionType.POPULAR_NEWSLETTER_SUCCESS,
    popular: popular
  }
}
export const popularNewsletterFail = error => {
  return {
    type: actionType.POPULAR_NEWSLETTER_FAIL,
    error: error
  }
}
/* POPULAR NEWSLETTER */

/* OLD NEWSLETTER */
export const oldNewsletterStart = () => {
  return { type: actionType.OLD_NEWSLETTER_START }
}
export const oldNewsletterSuccess = oldnews => {
  return {
    type: actionType.OLD_NEWSLETTER_SUCCESS,
    oldnews: oldnews
  }
}
export const oldNewsletterFail = error => {
  return {
    type: actionType.OLD_NEWSLETTER_FAIL,
    error: error
  }
}
/* OLD NEWSLETTER */

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

export const getNewsletterBy = query => {
  return dispatch => {
    dispatch(oldNewsletterStart())
    axios.get(`/newsletters${query}`)
      .then(res => {
        dispatch(oldNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(oldNewsletterFail(err.response))
      })
  }
}

export const slugNewsletter = (slug) => {
  return dispatch => {
    dispatch(slugNewsletterStart())
    axios.get(`/newsletter/${slug}`)
      .then(res => {
        dispatch(slugNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(slugNewsletterFail(err.response))
      })
  }
}

export const popularNewsletter = () => {
  return dispatch => {
    dispatch(popularNewsletterStart())
    axios.get(`/newsletter/most-popular`)
      .then(res => {
        dispatch(popularNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(popularNewsletterFail(err.response))
      })
  }
}

export const oldNewsletter = () => {
  return dispatch => {
    dispatch(oldNewsletterStart())
    axios.get('/newsletters?order_by=asc')
      .then(res => {
        dispatch(oldNewsletterSuccess(res.data))
      })
      .catch(err => {
        dispatch(oldNewsletterFail(err.response))
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
