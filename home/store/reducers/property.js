import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  property: null,
  loading: false,
  error: null,
  slug: null,
  location: [],
}

export const getPropertyStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getPropertySuccess = (state, action) => {
  return updateObject(state, {
    property: action.property, 
    loading: false, 
    error: null
  })
}
export const getPropertyFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

export const slugPropertyStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const slugPropertySuccess = (state, action) => {
  return updateObject(state, {
    slug: action.slug, 
    loading: false, 
    error: null
  })
}
export const slugPropertyFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

export const getWishlistStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getWishlistSuccess = (state, action) => {
  return updateObject(state, {
    property: action.property, 
    loading: false, 
    error: null
  })
}
export const getWishlistFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

export const getLocationStart = (state, action) => {
  return updateObject(state, {loading: true, error: null})
}
export const getLocationSuccess = (state, action) => {
  return updateObject(state, {
    location: action.location, 
    loading: false, 
    error: null
  })
}
export const getLocationFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PROPERTY_START:
      return getPropertyStart(state, action)
    case actionType.GET_PROPERTY_SUCCESS:
      return getPropertySuccess(state, action)
    case actionType.GET_PROPERTY_FAIL:
      return getPropertyFail(state, action)

    case actionType.SLUG_PROPERTY_START:
      return slugPropertyStart(state, action)
    case actionType.SLUG_PROPERTY_SUCCESS:
      return slugPropertySuccess(state, action)
    case actionType.SLUG_PROPERTY_FAIL:
      return slugPropertyFail(state, action)

    case actionType.GET_WISHLIST_START:
      return getWishlistStart(state, action)
    case actionType.GET_WISHLIST_SUCCESS:
      return getWishlistSuccess(state, action)
    case actionType.GET_WISHLIST_FAIL:
      return getWishlistFail(state, action)

    case actionType.GET_LOCATION_START:
      return getLocationStart(state, action)
    case actionType.GET_LOCATION_SUCCESS:
      return getLocationSuccess(state, action)
    case actionType.GET_LOCATION_FAIL:
      return getLocationFail(state, action)

    default: 
      return state
  }
}

export default reducer
