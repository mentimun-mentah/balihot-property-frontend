import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  newsletter: null,
  loading: false,
  error: null
};

export const getNewsletterStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
export const getNewsletterSuccess = (state, action) => {
  return updateObject(state, {
    newsletter: action.newsletter,
    loading: false,
    error: null
  });
};
export const getNewsletterFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_NEWSLETTER_START:
      return getNewsletterStart(state, action);

    case actionType.GET_NEWSLETTER_SUCCESS:
      return getNewsletterSuccess(state, action);

    case actionType.GET_NEWSLETTER_FAIL:
      return getNewsletterFail(state, action);

    default:
      return state;
  }
};

export default reducer;
