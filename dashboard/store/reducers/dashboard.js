import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  visitor: null,
  propertyVisitor: null,
  propertyLoved: null
}

export const getTotalVisitor = (state, action) => {
  return updateObject(state, {visitor: action.visitor})
}

export const getPropertyVisitor = (state, action) => {
  return updateObject(state, {propertyVisitor: action.propertyVisitor})
}

export const getPropertyLoved = (state, action) => {
  return updateObject(state, {propertyLoved: action.propertyLoved})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_TOTAL_VISITOR:
      return getTotalVisitor(state, action)

    case actionType.GET_VISITOR_PROPERTIES:
      return getPropertyVisitor(state, action)

    case actionType.GET_LOVED_PROPERTIES:
      return getPropertyLoved(state, action)

    default: 
      return state
  }
}

export default reducer
