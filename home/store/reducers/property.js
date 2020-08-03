import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  property: null,
  loading: false,
  error: null,
  saleProperty: null,
  rentProperty: null,
  landProperty: null,
  slug: null,
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

export const getPropertySale = (state, action) => {
  return updateObject(state, {
    saleProperty: action.property,
    loading: false,
    error: null,
  })
}

export const getPropertyRent = (state, action) => {
  return updateObject(state, {
    rentProperty: action.property,
    loading: false,
    error: null,
  })
}

export const getPropertyLand = (state, action) => {
  return updateObject(state, {
    landProperty: action.property,
    loading: false,
    error: null,
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

    case actionType.GET_PROPERTY_SALE:
      return getPropertySale(state, action)

    case actionType.GET_PROPERTY_RENT:
      return getPropertyRent(state, action)

    case actionType.GET_PROPERTY_LAND:
      return getPropertyLand(state, action)

    default: 
      return state
  }
}

export default reducer
