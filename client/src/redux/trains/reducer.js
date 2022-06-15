import {
  ALL_TRAINSCHEDULE_REQUEST,
  ALL_TRAINSCHEDULE_SUCCESS,
  ALL_TRAINSCHEDULE_FAIL,
  CLEAR_ERR,
  GET_TRAINSCHEDULE_REQUEST,
  GET_TRAINSCHEDULE_SUCCESS,
  GET_TRAINSCHEDULE_FAIL,
} from "./types";

const initialState = {
  isLoading: false,
  error: null,
  trains: [],
  filteredPerCount: null,
  resultPerPage: null,
};
const initialTrainState = { isLoading: false, train: [], error: null };

export const trainScheduleReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_TRAINSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case ALL_TRAINSCHEDULE_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        trains: action.payload.data,
        filteredPerCount: action.payload.filteredPerCount,
        resultPerPage: action.payload.resultPerPage,
        error: null,
      };
    case ALL_TRAINSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        resultPerPage: null,
        trains: [],
        filteredPerCount: null,
        error: action.payload,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
export const trainScheduleByIdReducer = (state = initialTrainState, action) => {
  switch (action.type) {
    case GET_TRAINSCHEDULE_REQUEST:
      return { ...state, isLoading: true };
    case GET_TRAINSCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        train: action.payload.data,
        error: null,
      };
    case GET_TRAINSCHEDULE_FAIL:
      return {
        ...state,
        isLoading: false,
        train: [],
        error: action.payload,
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
