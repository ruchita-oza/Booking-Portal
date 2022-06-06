import { combineReducers } from "redux";
import { busReducer } from "./buses/reducer";
import { trainScheduleReducer } from "./trains/reducer";
import { flightScheduleReducer } from "./flights/reducer";
import { authReducer } from "./users/reducer";
export const rootReducer = combineReducers({
  busesAvailable: busReducer,
  trainsAvailable: trainScheduleReducer,
  flightsAvailable: flightScheduleReducer,
  user: authReducer,
});
