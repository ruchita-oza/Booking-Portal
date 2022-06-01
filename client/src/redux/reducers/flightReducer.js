import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
} from "../constants/flightConstants";

export const flightScheduleReducer = (
  state = { flights: [], loading: false, error: "" },
  action
) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_FLIGHTSCHEDULE_REQUEST:
      return { loading: true, flights: [] };
    case ALL_FLIGHTSCHEDULE_SUCESS:
      return { loading: false, flights: action.payload };
    case ALL_FLIGHTSCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
