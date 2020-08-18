import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  currency: null,
}

export const getCurrency = (state, action) => {
  return updateObject(state, {
    currency: action.currency, 
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENCY:
      return getCurrency(state, action)
      
    default: 
      return state
  }
}

export default reducer
