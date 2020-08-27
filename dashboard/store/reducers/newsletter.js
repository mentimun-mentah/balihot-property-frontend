import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  newsletter: null,
  title: [],
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

export const getTitleStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
}
export const getTitleSuccess = (state, action) => {
  return updateObject(state, {
    title: action.title, 
    loading: false, 
    error: null
  })
}
export const getTitleFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_NEWSLETTER_START:
      return getNewsletterStart(state, action);
    case actionType.GET_NEWSLETTER_SUCCESS:
      return getNewsletterSuccess(state, action);
    case actionType.GET_NEWSLETTER_FAIL:
      return getNewsletterFail(state, action);

    case actionType.GET_TITLE_START:
      return getTitleStart(state, action);
    case actionType.GET_TITLE_SUCCESS:
      return getTitleSuccess(state, action);
    case actionType.GET_TITLE_FAIL:
      return getTitleFail(state, action);

    default:
      return state;
  }
};

export default reducer;
