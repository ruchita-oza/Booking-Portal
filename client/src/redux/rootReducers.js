import { combineReducers } from "redux";
import { busReducer, busScheduleByIdReducer } from "./buses/reducer";
import {
  trainScheduleReducer,
  trainScheduleByIdReducer,
} from "./trains/reducer";
import {
  flightScheduleReducer,
  flightScheduleByIdReducer,
} from "./flights/reducer";
import { authReducer } from "./users/reducer";
export const rootReducer = combineReducers({
  user: authReducer,
  busesAvailable: busReducer,
  trainsAvailable: trainScheduleReducer,
  flightsAvailable: flightScheduleReducer,
  flight: flightScheduleByIdReducer,
  bus: busScheduleByIdReducer,
  train: trainScheduleByIdReducer,
});
