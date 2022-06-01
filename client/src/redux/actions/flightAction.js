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

      let link = `/flight/schedule/`;
      // console.log(source, destination);
      if (source) {
        var sourceCity = await axios.get(`/city/?city_name=${source}`);
      }
      if (destination) {
        var destCity = await axios.get(`/city/?city_name=${destination}`);
        // console.log(destCity);
      }
      console.log(sourceCity);
      if (
        sourceCity.data.cities.length === 0 ||
        destCity.data.cities.length === 0
      )
        throw new Error("Flight not available");
      if (source && destination && !minPrice && !maxPrice) {
        // console.log(sourceCity.data.cities[0].id);
        // console.log(destCity.data.cities[0].id);
        link = `/flight/schedule?source=${sourceCity.data.cities[0].id}&destination=${destCity.data.cities[0].id}`;
      }
      if (source && destination && minPrice && maxPrice) {
        link += `/flight/schedule?source=${sourceCity.data.cities[0].id}&destination=${destCity.data.cities[0].id}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      const { data } = await axios.get(link);
      // console.log(data.flightSchedules[0].id);
      const flightLink = `/flight/details/${data.flightSchedules[0].id}`;
      var { flight } = await axios.get(flightLink);
      if (data) {
        dispatch({
          type: ALL_FLIGHTSCHEDULE_SUCESS,
          payload: { data, source, destination, flight },
        });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: ALL_FLIGHTSCHEDULE_FAIL, payload: error.message });
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
