import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  newsletter: null,
  slug: null,
  popular: null,
  oldnews: null,
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

export const slugNewsletterStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
export const slugNewsletterSuccess = (state, action) => {
  return updateObject(state, {
    slug: action.slug,
    loading: false,
    error: null
  });
};
export const slugNewsletterFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

export const popularNewsletterStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
export const popularNewsletterSuccess = (state, action) => {
  return updateObject(state, {
    popular: action.popular,
    loading: false,
    error: null
  });
};
export const popularNewsletterFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

export const oldNewsletterStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
export const oldNewsletterSuccess = (state, action) => {
  return updateObject(state, {
    oldnews: action.oldnews,
    loading: false,
    error: null
  });
};
export const oldNewsletterFail = (state, action) => {
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

    case actionType.SLUG_NEWSLETTER_START:
      return slugNewsletterStart(state, action);
    case actionType.SLUG_NEWSLETTER_SUCCESS:
      return slugNewsletterSuccess(state, action);
    case actionType.SLUG_NEWSLETTER_FAIL:
      return slugNewsletterFail(state, action);

    case actionType.POPULAR_NEWSLETTER_START:
      return popularNewsletterStart(state, action);
    case actionType.POPULAR_NEWSLETTER_SUCCESS:
      return popularNewsletterSuccess(state, action);
    case actionType.POPULAR_NEWSLETTER_FAIL:
      return popularNewsletterFail(state, action);

    case actionType.OLD_NEWSLETTER_START:
      return oldNewsletterStart(state, action);
    case actionType.OLD_NEWSLETTER_SUCCESS:
      return oldNewsletterSuccess(state, action);
    case actionType.OLD_NEWSLETTER_FAIL:
      return oldNewsletterFail(state, action);

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
