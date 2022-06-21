import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
  GET_BUSSCHEDULE_REQUEST,
  GET_BUSSCHEDULE_SUCCESS,
  GET_BUSSCHEDULE_FAIL,
} from "./types";
import {
  getAllBusesApi,
  getBusesWithLocationPriceApi,
  getBusesWithLocationPriceTimeApi,
  getBusWithId,
} from "../../services/BusServices";

import { getCityApi } from "../../services/CityServices";
import toast from "react-hot-toast";

export const fetchAllBusScheduleRequest = () => {
  return { type: ALL_BUSSCHEDULE_REQUEST };
};
export const fetchAllBusScheduleSuccess = (busScheduleWithBuses) => {
  return { type: ALL_BUSSCHEDULE_SUCESS, payload: busScheduleWithBuses };
};
export const fetchAllBusScheduleFail = (error) => {
  return { type: ALL_BUSSCHEDULE_FAIL, payload: error };
};
//get BusSchedules
export const getBusSchedules =
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
      dispatch(fetchAllBusScheduleRequest());
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
          let { data } = await getBusesWithLocationPriceApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            currentPage
          );
          if (data) {
            if (data.busScheduleWithBuses.count === 0) setResult(false);
            dispatch(fetchAllBusScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (fromDate) {
          let { data } = await getBusesWithLocationPriceTimeApi(
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
            if (data.busScheduleWithBuses.count === 0) setResult(false);
            dispatch(fetchAllBusScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        let { data } = await getAllBusesApi(
          minPrice,
          maxPrice,
          personCount,
          currentPage
        );
        if (data) {
          // console.log(data);
          if (data.busScheduleWithBuses.count === 0) setResult(false);
          dispatch(fetchAllBusScheduleSuccess(data));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
      setResult(false);
      dispatch(fetchAllBusScheduleFail(error));
      // setResult(false);
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};

export const getBusScheduleById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BUSSCHEDULE_REQUEST });
    const data = await getBusWithId(id);
    if (data) {
      // console.log(data);
      dispatch({ type: GET_BUSSCHEDULE_SUCCESS, payload: data });
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: GET_BUSSCHEDULE_FAIL, payload: error });
  }
};

export const getAllBusSchedule = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BUSSCHEDULE_REQUEST });
    const data = await getAllBusSchedule();
    if (data) {
      // console.log(data);
      dispatch({ type: ALL_BUSSCHEDULE_SUCESS, payload: data });
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: ALL_BUSSCHEDULE_FAIL, payload: error });
  }
};

