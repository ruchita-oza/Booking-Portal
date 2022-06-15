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
  resultPerPage: null,
  filteredPerCount: null,
};

export const flightScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_FLIGHTSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case ALL_FLIGHTSCHEDULE_SUCESS:
      return {
        ...state,
        isLoading: false,
        flights: action.payload.flightScheduleWithflights,
        resultPerPage: action.payload.resultPerPage,
        error: null,
        filteredPerCount: action.payload.filteredPerCount,
      };
    case ALL_FLIGHTSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        flights: [],
        filteredPerCount: null,
        resultPerPage: null,
        error: action.payload,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
