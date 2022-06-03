import { combineReducers } from "redux";
import { busReducer } from "./buses/reducer";
import { flightScheduleReducer } from "./flights/reducer";
import { authReducer } from "./users/reducer";
export const rootReducer = combineReducers({
  busesAvailable: busReducer,
  flightsAvailable: flightScheduleReducer,
  user: authReducer,
});
