import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { flightScheduleReducer } from "./reducers/flightReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { busScheduleReducer } from "./reducers/busReducer";
const reducer = combineReducers({
  flightsAvailable: flightScheduleReducer,
  busesAvailable: busScheduleReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
