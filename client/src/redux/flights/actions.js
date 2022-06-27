import {
  ALL_FLIGHTSCHEDULE_REQUEST,
  ALL_FLIGHTSCHEDULE_SUCESS,
  ALL_FLIGHTSCHEDULE_FAIL,
  CLEAR_ERR,
  GET_FLIGHTSCHEDULE_REQUEST,
  GET_FLIGHTSCHEDULE_SUCCESS,
  GET_FLIGHTSCHEDULE_FAIL,
} from "./types";
import toast from "react-hot-toast";
import {
  getAllFlightsApi,
  getFlightsWithLocationPriceApi,
  getFlightsWithLocationPriceTimeApi,
  getFlightWithId,
  getFlightsWithSourcePriceApi,
  getFlightsWithSourcePriceTimeApi,
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
      const today = new Date();
      currentPage = currentPage ? currentPage : 1;
      const currentDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");
      fromDate = fromDate ? fromDate : currentDate;
      if (toDate === currentDate) {
        toDate = null;
      }

      // console.log(fromDate);
      if (source && destination) {
        // console.log("at source dest");
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        if (
          (sourceCity === undefined && destCity === undefined) ||
          sourceCity.data.cities.count === 0 ||
          destCity.data.cities.count === 0
        ) {
          throw new Error(
            `flight on Schedule ${source} and ${destination} is not available`
          );
        }
        if (!toDate) {
          console.log("not fromDate");
          let { data } = await getFlightsWithLocationPriceApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            currentPage,
            fromDate
          );
          if (data) {
            if (data.flightScheduleWithflights.count === 0) setResult(false);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (toDate) {
          console.log("in fromDate");
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
          console.log(data);
          if (data) {
            if (data.flightScheduleWithflights.count === 0) setResult(false);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        }
      } else if (source) {
        console.log("at only source");
        // est");
        var sourceCity = await getCityApi(source);
        if (sourceCity === undefined || sourceCity.data.cities.count === 0) {
          throw new Error(`flight on Schedule ${source} is not available`);
        }
        if (!toDate) {
          console.log("not fromDate");
          let { data } = await getFlightsWithSourcePriceApi(
            sourceCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            currentPage,
            fromDate
          );
          if (data) {
            if (data.flightScheduleWithflights.count === 0) setResult(false);
            dispatch(fetchAllFlightScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (toDate) {
          console.log("in fromDate", sourceCity.data.cities.rows[0].id);
          let { data } = await getFlightsWithSourcePriceTimeApi(
            sourceCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            fromDate,
            toDate,
            personCount,
            currentPage
          );
          console.log(data);
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
          currentPage,
          fromDate
        );
        console.log("in else");
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

export const getFlightScheduleById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FLIGHTSCHEDULE_REQUEST });
    const data = await getFlightWithId(id);
    if (data) {
      // console.log(data);
      dispatch({ type: GET_FLIGHTSCHEDULE_SUCCESS, payload: data });
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: GET_FLIGHTSCHEDULE_FAIL, payload: error });
  }
};

export const getAllFlightSchedule = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FLIGHTSCHEDULE_REQUEST });
    const data = await getAllFlightSchedule();
    if (data) {
      // console.log(data);
      dispatch({ type: ALL_FLIGHTSCHEDULE_SUCESS, payload: data });
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: ALL_FLIGHTSCHEDULE_FAIL, payload: error });
  }
};
