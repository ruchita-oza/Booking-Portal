import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
} from "../constants/flightConstants";

import axios from "axios";
//get flightSchedules
export const getFlightSchedules =
  (source, destination, minPrice, maxPrice) => async (dispatch) => {
    try {
      dispatch({ type: ALL_FLIGHTSCHEDULE_REQUEST });
      let link = `/flight/Schedule`;
      if (source && destination && !minPrice && !maxPrice) {
        link += `/flights/schedule?source=${source}&destination=${destination}`;
      }
      if (source && destination && minPrice && maxPrice) {
        link += `/flights/schedule?source=${source}&destination=${destination}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      const { data } = await axios.get(link);
      if (data) {
        dispatch({ type: ALL_FLIGHTSCHEDULE_SUCESS, payload: data });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch({ type: ALL_FLIGHTSCHEDULE_FAIL, payload: error.message });
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
