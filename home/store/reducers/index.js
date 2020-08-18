import { combineReducers } from "redux";
import authReducer from "./auth";
import regionReducer from "./region";
import propertyReducer from "./property";
import teamReducer from "./teams";
import typeReducer from "./types";
import facilityReducer from "./facilities";
import currencyReducer from "./currency";

const reducers = {
  auth: authReducer,
  region: regionReducer,
  property: propertyReducer,
  team: teamReducer,
  types: typeReducer,
  facilities: facilityReducer,
  currency: currencyReducer,
};

export default combineReducers(reducers);
