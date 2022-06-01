import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
} from "../constants/busConstants";

export const busScheduleReducer = (
  state = { buses: [], loading: false, error: "" },
  action
) => {
  console.log(action.type);
  switch (action.type) {
    case ALL_BUSSCHEDULE_REQUEST:
      return { loading: true, buses: [] };
    case ALL_BUSSCHEDULE_SUCESS:
      return { loading: false, buses: action.payload };
    case ALL_BUSSCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERR:
      return { ...state, error: null };
    default:
      return state;
  }
};
