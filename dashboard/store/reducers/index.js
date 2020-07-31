import { combineReducers } from "redux";
import authReducer from "./auth";
import teamReducer from "./teams";
import typeReducer from "./types";
import regionReducer from "./region";
import facilityReducer from "./facilities";
import propertyReducer from "./property";

const reducers = {
  auth: authReducer,
  team: teamReducer,
  types: typeReducer,
  region: regionReducer,
  facility: facilityReducer,
  property: propertyReducer,
};

export default combineReducers(reducers);
