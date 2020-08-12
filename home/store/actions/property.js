import { notification } from 'antd';
import cookies from "nookies";
import * as actionType from "./actionTypes";
import * as actions from "./index";
import axios from "../../lib/axios";
import Router from "next/router"

export const getPropertyStart = () => {
  return { type: actionType.GET_PROPERTY_START}
}
export const getPropertySuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_SUCCESS,
    property: property
  }
}
export const getPropertyFail = (error) => {
  return {
    type: actionType.GET_PROPERTY_FAIL,
    error: error
  }
}

/* SLUG PROPERTY */
export const slugPropertyStart = () => {
  return { type: actionType.SLUG_PROPERTY_START}
}
export const slugPropertySuccess = (slug) => {
  return {
    type: actionType.SLUG_PROPERTY_SUCCESS,
    slug: slug 
  }
}
export const slugPropertyFail = (error) => {
  return {
    type: actionType.SLUG_PROPERTY_FAIL,
    error: error
  }
}
/* SLUG PROPERTY */

/* LOVE */
export const lovePropertyStart = () => {
  return { type: actionType.LOVE_PROPERTY_START }
}
export const lovePropertySuccess = () => {
  return { type: actionType.LOVE_PROPERTY_SUCCESS }
}
export const lovePropertyFail = (error) => {
  return { type: actionType.LOVE_PROPERTY_FAIL, error: error }
}
/* LOVE */

/* UNLOVE */
export const unLovePropertyStart = () => {
  return { type: actionType.UNLOVE_PROPERTY_START }
}
export const unLovePropertySuccess = () => {
  return { type: actionType.UNLOVE_PROPERTY_SUCCESS }
}
export const unLovePropertyFail = (error) => {
  return { type: actionType.UNLOVE_PROPERTY_FAIL, error: error }
}
/* UNLOVE */

/* WISHLIST */
export const getWishlistStart = () => {
  return { type: actionType.GET_WISHLIST_START}
}
export const getWishlistSuccess = (property) => {
  return {
    type: actionType.GET_WISHLIST_SUCCESS,
    property: property
  }
}
export const getWishlistFail = (error) => {
  return {
    type: actionType.GET_WISHLIST_FAIL,
    error: error
  }
}
/* WISHLIST */

/* GET LOCATION */
export const getLocationStart = () => {
  return { type: actionType.GET_LOCATION_START }
}
export const getLocationSuccess = (location) => {
  return { type: actionType.GET_LOCATION_SUCCESS, location: location }
}
export const getLocationFail = (error) => {
  return { type: actionType.GET_LOCATION_FAIL, error: error }
}
/* GET LOCATION */

export const getPropertyBy = (home, query, per_page, ctx) => {
  return dispatch => {
    let searchQuery = "";
    if(home){
      if(query === "Sale" || query === "Rent") searchQuery = `property_for=${query}&per_page=${per_page}`;
      if(query === "Land") searchQuery = `type_id=2&per_page=${per_page}`;
    } else {
      searchQuery = query
    }

    const { access_token, refresh_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    if(access_token, refresh_token){
      dispatch(getPropertyStart())
      axios.get(`/properties?${searchQuery}`, headerCfg)
        .then(res => {
          dispatch(getPropertySuccess(res.data))
        })
        .catch(err => {
          console.log("ACTION PROPERTY ######## === > ", err.response)
          dispatch(getPropertyFail(err.response))
          axios.get(`/properties?${searchQuery}`)
            .then(res => {
              dispatch(getPropertySuccess(res.data))
            })
            .catch(err => {
              dispatch(getPropertyFail(err.response))
              console.log("BAWAH ACTION PROPERTY ######## === > ", err.response)
            })
        })
    } else {
      dispatch(getPropertyStart())
      axios.get(`/properties?${searchQuery}`)
        .then(res => {
          dispatch(getPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(getPropertyFail(err.response))
        })
    }
  }
}

export const getProperty = (ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(getPropertyStart())
    if(!access_token || access_token === undefined){
      axios.get('/properties')
        .then(res => {
          dispatch(getPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(getPropertyFail(err.response))
        })
    }   
    if(access_token){
      axios.get(`/properties`, headerCfg)
        .then(res => {
          dispatch(getPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(getPropertyFail(err.response))
        })
    }
  }
}

export const slugProperty = (slug, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(slugPropertyStart())
    if(!access_token || access_token === undefined){
      axios.get(`/property/${slug}`)
        .then(res => {
          dispatch(slugPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(slugPropertyFail(err.response))
        })
    }
    if(access_token){
      axios.get(`/property/${slug}`, headerCfg)
        .then(res => {
          dispatch(slugPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(slugPropertyFail(err.response))
        })
    }
  }
}

export const loveProperty = (id, slug, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(lovePropertyStart())
    axios.post(`/wishlist/love/${id}`, null, headerCfg)
      .then(res => {
        dispatch(lovePropertySuccess())
        notification['success']({
          message: 'Yuhuu!!!',
          description: res.data.message,
          placement: 'bottomRight',
        });
        if(Router.router.pathname === "/property/[slug]"){
          if(slug === Router.router.query.slug){
            axios.get(`/property/${slug}`, headerCfg)
              .then(res => {
                dispatch(slugPropertySuccess(res.data))
              })
          }
        }
      })
      .catch(err => {
        dispatch(lovePropertyFail(err.response))
        notification['error']({
          message: 'Opps...',
          description: err.response.data.message,
          placement: 'bottomRight',
        });
      })
  }
}

export const unLoveProperty = (id, slug, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(unLovePropertyStart())
    axios.delete(`/wishlist/unlove/${id}`, headerCfg)
      .then(res => {
        dispatch(unLovePropertySuccess(ctx))
        notification['success']({
          message: 'Yuhuu!!!',
          description: res.data.message,
          placement: 'bottomRight',
        });
        if(Router.pathname === "/account"){
          dispatch(getWishlist(_, ctx))
        }
        if(Router.router.pathname === "/property/[slug]"){
          if(slug === Router.router.query.slug){
            axios.get(`/property/${slug}`, headerCfg)
              .then(res => {
                dispatch(slugPropertySuccess(res.data))
              })
          }
        }
      })
      .catch(err => {
        dispatch(unLovePropertyFail(err.response))
        notification['error']({
          message: 'Opps...',
          description: err.response.data.message,
          placement: 'bottomRight',
        });
      })
  }
}

export const getWishlist = (query, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(getWishlistStart())
    axios.get(`/wishlist/user${query}`, headerCfg)
      .then(res => {
        const fetchedData = [];
        for(let key in res.data.data){
          fetchedData.push({
            ...res.data.data[key],
            love: true
          })
        }
        const data = {
          data: fetchedData, 
          iter_pages: res.data.iter_pages, 
          next_num: res.data.next_num, 
          page: res.data.page, 
          prev_num: res.data.prev_num
        }
        dispatch(getWishlistSuccess(data))
      })
      .catch(err => {
        dispatch(getWishlistFail(err.response))
      })
  }
}

export const getLocation = (query) => {
  return dispatch => {
    dispatch(getLocationStart())
    axios.get(`/property/search-by-location${query}`)
      .then(res => {
        let loct = res.data.map(obj => {
          obj['value'] = obj['location']
          delete obj['location']
          return obj 
        })
        dispatch(getLocationSuccess(loct))
      })
      .catch(err => {
        dispatch(getLocationFail(err.response))
      })
  }
}
