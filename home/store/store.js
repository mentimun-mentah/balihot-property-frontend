import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default (initialState) => {
  const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const createNextReducer = require("./reducers").default;
      store.replaceReducer(createNextReducer(initialState));
    });
  }

  return store;
};
