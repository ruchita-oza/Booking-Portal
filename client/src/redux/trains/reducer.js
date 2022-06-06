import { 
    ALL_TRAINSCHEDULE_REQUEST,
    ALL_TRAINSCHEDULE_SUCCESS,
    ALL_TRAINSCHEDULE_FAIL,
    CLEAR_ERR,
} from "./types";

const initialState = {
    isLoading: false,
    error: null,
    trains: [],
};

export const trainScheduleReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
      case ALL_TRAINSCHEDULE_REQUEST:
        return { ...state, isLoading: true };
      case ALL_TRAINSCHEDULE_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          isLoading: false,
          trains: action.payload,
          error: null,
        };
      case ALL_TRAINSCHEDULE_FAIL:
        return { ...state, isLoading: false, trains: [], error: action.payload };
      case CLEAR_ERR:
        return { ...state, error: null };
      default:
        return state;
    }
  };