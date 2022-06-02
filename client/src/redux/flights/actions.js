import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";

import {
  getAllFlightsApi,
  getFlightsWithLocationApi,
  getFlightsWithLocationAndPriceApi,
} from "../../services/FlightServices";

import { getCityApi } from "../../services/CityServices";

export const fetchAllFlightScheduleRequst = () => {
  return { type: ALL_FLIGHTSCHEDULE_REQUEST };
};
export const fetchAllFlightScheduleSuccess = (flightSchedules) => {
  return { type: ALL_FLIGHTSCHEDULE_SUCESS, payload: flightSchedules };
};
export const fetchAllFlightScheduleFail = (error) => {
  return { type: ALL_FLIGHTSCHEDULE_FAIL, payload: error };
};
//get flightSchedules
export const getFlightSchedules =
  (source, destination, minPrice, maxPrice) => async (dispatch) => {
    try {
      console.log("at fligth actions");
      dispatch(fetchAllFlightScheduleRequst());
      if (source & destination) {
        console.log("at source nd dest");
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        if (
          sourceCity.data.cities.length === 0 ||
          destCity.data.cities.length === 0
        )
          throw new Error("Flight not available");
        console.log(source, destination);
        if (!minPrice && !maxPrice) {
          let { data } = await getFlightsWithLocationApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id
          );
          if (data) {
            console.log(data);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else {
          let { data } = await getFlightsWithLocationAndPriceApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id,
            minPrice,
            maxPrice
          );
          if (data) {
            dispatch(fetchAllFlightScheduleSuccess(data.flightSchedules));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        console.log("at else part");
        let { data } = await getAllFlightsApi();
        console.log(data);
        if (data) {
          dispatch(fetchAllFlightScheduleSuccess(data.flightSchedules));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error.message);
      dispatch(fetchAllFlightScheduleFail(error));
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
