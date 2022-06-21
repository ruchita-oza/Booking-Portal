import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
  GET_BUSSCHEDULE_REQUEST,
  GET_BUSSCHEDULE_SUCCESS,
  GET_BUSSCHEDULE_FAIL,
} from "./types";

const initialState = {
  isLoading: false,
  error: null,
  buses: [],
  filteredPerCount: null,
  resultPerPage: null,
};
const initialBusState = { isLoading: false, bus: [], error: null };
export const busReducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case ALL_BUSSCHEDULE_REQUEST:
      return { ...state, isLoading: true, buses: [], filteredPerCount: null };
    case ALL_BUSSCHEDULE_SUCESS:
      return {
        ...state,
        isLoading: false,
        buses: action.payload.busScheduleWithBuses,
        filteredPerCount: action.payload.filteredPerCount,
        resultPerPage: action.payload.resultPerPage,
        error: null,

      };
    case ALL_BUSSCHEDULE_FAIL:
      // console.log(action.payload.message);
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        buses: [],
        filteredPerCount: null,
        resultPerPage: null,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
export const busScheduleByIdReducer = (state = initialBusState, action) => {
  switch (action.type) {
    case GET_BUSSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case GET_BUSSCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bus: action.payload.data,
        error: null,
      };
    case GET_BUSSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        bus: [],
        error: action.payload,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
export const busAllScheduleReducer = (state = initialBusState, action) => {
  switch (action.type) {
    case ALL_BUSSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case ALL_BUSSCHEDULE_SUCESS:
      return {
        ...state,
        isLoading: false,
        bus: action.payload.data,
        error: null,
      };
    case ALL_BUSSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        bus: [],
        error: action.payload,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};

