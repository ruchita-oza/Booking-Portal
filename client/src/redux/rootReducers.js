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
import { authReducer, passengerReducer } from "./users/reducer";
export const rootReducer = combineReducers({
  user: authReducer,
  passenger: passengerReducer,
  busesAvailable: busReducer,
  trainsAvailable: trainScheduleReducer,
  flightsAvailable: flightScheduleReducer,
  flight: flightScheduleByIdReducer,
  bus: busScheduleByIdReducer,
  train: trainScheduleByIdReducer,
});
