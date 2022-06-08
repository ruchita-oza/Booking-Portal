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
};
export const busReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_BUSSCHEDULE_REQUEST:
      return { ...state, isLoading: true, buses: [] };
    case ALL_BUSSCHEDULE_SUCESS:
      return { ...state, isLoading: false, buses: action.payload, error: null };
    case ALL_BUSSCHEDULE_FAIL:
      // toast.error(action.payload.message);
      console.log(action.payload.message);
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        buses: [],
      };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
