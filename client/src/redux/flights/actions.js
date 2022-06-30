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
      dispatch(fetchAllFlightScheduleRequest());
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

      if (source && destination) {
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
      } else if (source) {
        var sourceCity = await getCityApi(source);
        if (sourceCity === undefined || sourceCity.data.cities.count === 0) {
          throw new Error(`flight on Schedule ${source} is not available`);
        }
        if (!toDate) {
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
          let { data } = await getFlightsWithSourcePriceTimeApi(
            sourceCity.data.cities.rows[0].id,
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
      }
    } catch (error) {
      toast.error(error.message);
      setResult(false);
      dispatch(fetchAllFlightScheduleFail(error));
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};

export const getFlightScheduleById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FLIGHTSCHEDULE_REQUEST });
    const data = await getFlightWithId(id);
    if (data) {
      dispatch({ type: GET_FLIGHTSCHEDULE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_FLIGHTSCHEDULE_FAIL, payload: error });
  }
};

export const getAllFlightSchedule = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FLIGHTSCHEDULE_REQUEST });
    const data = await getAllFlightSchedule();
    if (data) {
      dispatch({ type: ALL_FLIGHTSCHEDULE_SUCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ALL_FLIGHTSCHEDULE_FAIL, payload: error });
  }
};
