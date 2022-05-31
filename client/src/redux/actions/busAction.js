import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
} from "../constants/busConstants";

import axios from "axios";
//get BUSSchedules
export const getBusSchedules =
  (source, destination, minPrice, maxPrice) => async (dispatch) => {
    try {
      dispatch({ type: ALL_BUSSCHEDULE_REQUEST });
      let link = `/bus/Schedule`;
      if (source && destination && !minPrice && !maxPrice) {
        link += `/bus/schedule?source=${source}&destination=${destination}`;
      }
      if (source && destination && minPrice && maxPrice) {
        link += `/bus/schedule?source=${source}&destination=${destination}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      const { data } = await axios.get(link);
      if (data) {
        dispatch({ type: ALL_BUSSCHEDULE_SUCESS, payload: data });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch({ type: ALL_BUSSCHEDULE_FAIL, payload: error.message });
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
