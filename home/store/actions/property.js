import { notification } from 'antd';
import cookies from "nookies";
import * as actionType from "./actionTypes";
import axios from "../../lib/axios";

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

export const getPropertySaleSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_SALE,
    property: property
  }
}

export const getPropertyRentSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_RENT,
    property: property
  }
}

export const getPropertyLandSuccess = (property) => {
  return {
    type: actionType.GET_PROPERTY_LAND,
    property: property
  }
}

export const slugPropertyStart = () => {
  return { type: actionType.SLUG_PROPERTY_START}
}

export const slugPropertySuccess = (slug) => {
  return {
    type: actionType.SLUG_PROPERTY_SUCCESS,
    slug:slug 
  }
}

export const slugPropertyFail = (error) => {
  return {
    type: actionType.SLUG_PROPERTY_FAIL,
    error: error
  }
}

export const lovePropertyStart = () => {
  return { type: actionType.LOVE_PROPERTY_START }
}

export const lovePropertySuccess = () => {
  return { type: actionType.LOVE_PROPERTY_SUCCESS }
}

export const lovePropertyFail = (error) => {
  return { type: actionType.LOVE_PROPERTY_FAIL, error: error }
}

export const unLovePropertyStart = () => {
  return { type: actionType.UNLOVE_PROPERTY_START }
}

export const unLovePropertySuccess = () => {
  return { type: actionType.UNLOVE_PROPERTY_SUCCESS }
}

export const unLovePropertyFail = (error) => {
  return { type: actionType.UNLOVE_PROPERTY_FAIL, error: error }
}

export const getPropertyBy = (home, query, per_page, ctx) => {
  return dispatch => {
    let searchQuery = "";
    if(home){
      if(query === "Sale" || query === "Rent") searchQuery = `property_for=${query}&per_page=${per_page}`;
      if(query === "Land") searchQuery = `type_id=2&per_page=${per_page}`;
    } else {
      searchQuery = query
    }

    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    if(access_token){
      dispatch(getPropertyStart())
      axios.get(`/properties?${searchQuery}`, headerCfg)
        .then(res => {
          dispatch(getPropertySuccess(res.data))
        })
        .catch(err => {
          dispatch(getPropertyFail(err.response))
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

export const getPropertySale = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?property_for=Sale&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const getPropertyRent = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?property_for=Rent&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const getPropertyLand = () => {
  return dispatch => {
    dispatch(getPropertyStart())
    axios.get('/properties?type_id=2&per_page=3')
      .then(res => {
        dispatch(getPropertySuccess(res.data))
      })
      .catch(err => {
        dispatch(getPropertyFail(err.response))
      })
  }
}

export const loveProperty = (id, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(lovePropertyStart())
    axios.post(`/wishlist/love/${id}`, null, headerCfg)
      .then(res => {
        dispatch(lovePropertySuccess())
        // dispatch(getProperty(ctx))
        notification['success']({
          message: 'Yuhuu!!!',
          description: res.data.message,
          placement: 'bottomRight',
        });
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

export const unLoveProperty = (id, ctx) => {
  return dispatch => {
    const { access_token } = cookies.get(ctx);
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    dispatch(unLovePropertyStart())
    axios.delete(`/wishlist/unlove/${id}`, null, headerCfg)
      .then(res => {
        dispatch(unLovePropertySuccess(ctx))
        // dispatch(getProperty(ctx))
        notification['success']({
          message: 'Yuhuu!!!',
          description: res.data.message,
          placement: 'bottomRight',
        });
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
