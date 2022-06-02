import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";

const initialState = {
  isLoading: false,
  error: null,
  flights: [],
};

export const flightScheduleReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_FLIGHTSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case ALL_FLIGHTSCHEDULE_SUCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        flights: action.payload,
        error: null,
      };
    case ALL_FLIGHTSCHEDULE_FAIL:
      return { ...state, isLoading: false, flights: [], error: action.payload };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
