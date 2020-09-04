import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../lib/utility";

const initialState = {
  access_token: null,
  refresh_token: null,
  user: null,
  data: null,
  message: null,
  loading: false,
  modal: true,
  text: null, 
  subscribe: null,
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, modal: true, error: null, message: null });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    access_token: action.access_token,
    refresh_token: action.refresh_token,
    user: action.user,
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    access_token: null,
    refresh_token: null,
    user: null,
    data: null,
    loading: false,
    modal: true,
    error: action.error,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {
    access_token: null,
    refresh_token: null,
    user: null,
    data: null,
  });
};
const getUserStart = (state, action) => {
  return updateObject(state, { error: null });
};
const getUserSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
  });
};
const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const getSubscribeStart = (state, action) => {
  return updateObject(state, { error: null })
}
const getSubscribeSuccess = (state, action) => {
  return updateObject(state, {
    subscribe: action.subscribe,
  })
}
const getSubscribeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}

const refreshTokenSuccess = (state, action) => {
  return updateObject(state, { access_token: action.access_token });
};
const getTextSuccess = (state, action) => {
  return updateObject(state, { text: action.text })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.AUTH_FAIL:
      return authFail(state, action);
    case actionType.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionType.GET_USER_START:
      return getUserStart(state, action);
    case actionType.GET_USER:
      return getUserSuccess(state, action);
    case actionType.GET_USER_FAIL:
      return getUserFail(state, action);
    case actionType.GET_SUBSCRIBE_START:
      return getSubscribeStart(state, action);
    case actionType.GET_SUBSCRIBE:
      return getSubscribeSuccess(state, action);
    case actionType.GET_SUBSCRIBE_FAIL:
      return getSubscribeFail(state, action);
    case actionType.REFRESH_TOKEN:
      return refreshTokenSuccess(state, action);
    case actionType.GET_TEXT:
      return getTextSuccess(state, action)
    default:
      return state;
  }
};

export default reducer;
