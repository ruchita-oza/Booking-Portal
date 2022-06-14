import toast from "react-hot-toast";
import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";

const initialState = {
  isLoading: false,
  error: null,
  buses: [],
  filteredPerCount: null,
  resultPerPage:null,
};
export const busReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_BUSSCHEDULE_REQUEST:
      return { ...state, isLoading: true, buses: [], filteredPerCount: null };
    case ALL_BUSSCHEDULE_SUCESS:
      return {
        ...state,
        isLoading: false,
        buses: action.payload.busScheduleWithBuses,
        filteredPerCount: action.payload.filteredPerCount,
        resultPerPage:action.payload.resultPerPage,
        error: null,

      };
    case ALL_BUSSCHEDULE_FAIL:
      // toast.error(action.payload.message);
      console.log(action.payload.message);
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
