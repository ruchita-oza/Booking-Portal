import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";
import toast from "react-hot-toast";
import {
  getAllFlightsApi,
  getFlightsWithLocationApi,
  getFlightsWithLocationPriceApi,
  getFlightsWithLocationPriceTimeApi,
} from "../../services/FlightServices";

import { getCityApi } from "../../services/CityServices";

export const fetchAllFlightScheduleRequest = () => {
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
  (
    {
      source,
      destination,
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      personCount,
      currentPage,
    },
    setResult
  ) =>
  async (dispatch) => {
    try {
      // console.log(source, destination, minPrice, maxPrice, fromDate, toDate);
      dispatch(fetchAllFlightScheduleRequest());
      // console.log(setResult);
      setResult(true);
      minPrice = minPrice ? minPrice : 0;
      maxPrice = maxPrice ? maxPrice : 1000000;
      personCount = personCount ? personCount : 1;
      currentPage = currentPage ? currentPage : 1;
      // console.log(fromDate);
      // console.log(toDate);
      if (source && destination) {
        // console.log("at source dest");
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        // console.log(sourceCity);
        if (
          (sourceCity === undefined && destCity === undefined) ||
          sourceCity.data.cities.count === 0 ||
          destCity.data.cities.count === 0
        ) {
          throw new Error(
            `bus on Schedule ${source} and ${destination} is not available`
          );
        }
        if (!fromDate) {
          let { data } = await getFlightsWithLocationPriceApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            currentPage
          );
          if (data) {
            if (data.flightScheduleWithflights.count === 0) setResult(false);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (fromDate) {
          let { data } = await getFlightsWithLocationPriceTimeApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            fromDate,
            toDate,
            personCount,
            currentPage
          );
          if (data) {
            if (data.flightScheduleWithflights.count === 0) setResult(false);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        let { data } = await getAllFlightsApi(
          minPrice,
          maxPrice,
          personCount,
          currentPage
        );
        if (data) {
          // console.log(data);
          if (data.flightScheduleWithflights.count === 0) setResult(false);
          dispatch(fetchAllFlightScheduleSuccess(data));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
      setResult(false);
      dispatch(fetchAllFlightScheduleFail(error));
      // setResult(false);
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
