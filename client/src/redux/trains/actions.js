import { toast } from "react-hot-toast";
import {
  ALL_TRAINSCHEDULE_REQUEST,
  ALL_TRAINSCHEDULE_SUCCESS,
  ALL_TRAINSCHEDULE_FAIL,
  CLEAR_ERR,
  GET_TRAINSCHEDULE_REQUEST,
  GET_TRAINSCHEDULE_SUCCESS,
  GET_TRAINSCHEDULE_FAIL,
} from "./types";

import {
  getAllTrainsApi,
  getTrainsWithLocationPriceTimeApi,
  getTrainsWithLocationPriceApi,
  getTrainsWithSourcePriceApi,
  getTrainsWithSourcePriceTimeApi,
  getTrainWithId,
} from "../../services/TrainServices";

import { getCityApi } from "../../services/CityServices";

export const fetchAllTrainScheduleRequest = () => {
  return { type: ALL_TRAINSCHEDULE_REQUEST };
};
export const fetchAllTrainScheduleSuccess = (trainSchedules) => {
  return { type: ALL_TRAINSCHEDULE_SUCCESS, payload: trainSchedules };
};
export const fetchAllTrainScheduleFail = (error) => {
  return { type: ALL_TRAINSCHEDULE_FAIL, payload: error };
};

export const getTrainSchedules =
  (
    { source, destination, minPrice, maxPrice, fromDate, toDate, personCount },
    setResult
  ) =>
  async (dispatch) => {
    try {
      dispatch(fetchAllTrainScheduleRequest());
      setResult(true);
      minPrice = minPrice ? minPrice : 0;
      maxPrice = maxPrice ? maxPrice : 1000000;
      personCount = personCount ? personCount : 1;
      const today = new Date();
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
            `train on Schedule ${source} and ${destination} is not available`
          );
        }
        if (!toDate) {
          let { data } = await getTrainsWithLocationPriceApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            fromDate
          );
          if (data) {
            if (data.data.count === 0) setResult(false);
            dispatch(fetchAllTrainScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (toDate) {
          let { data } = await getTrainsWithLocationPriceTimeApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            fromDate,
            toDate,
            personCount
          );
          if (data) {
            if (data.data.count === 0) setResult(false);
            dispatch(fetchAllTrainScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        }
      } else if (source) {
        var sourceCity = await getCityApi(source);
        if (sourceCity === undefined || sourceCity.data.cities.count === 0) {
          throw new Error(`train on Schedule ${source} is not available`);
        }
        if (!toDate) {
          let { data } = await getTrainsWithSourcePriceApi(
            sourceCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount,
            fromDate
          );
          if (data) {
            if (data.data.count === 0) setResult(false);
            dispatch(fetchAllTrainScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (toDate) {
          let { data } = await getTrainsWithSourcePriceTimeApi(
            sourceCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            fromDate,
            toDate,
            personCount
          );
          if (data) {
            if (data.data.count === 0) setResult(false);
            dispatch(fetchAllTrainScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        let { data } = await getAllTrainsApi(
          minPrice,
          maxPrice,
          personCount,
          fromDate
        );
        if (data) {
          if (data.data.count === 0) setResult(false);
          dispatch(fetchAllTrainScheduleSuccess(data));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      toast.error(error.message);
      setResult(false);
      dispatch(fetchAllTrainScheduleFail(error));
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};

export const getTrainScheduleById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TRAINSCHEDULE_REQUEST });
    const data = await getTrainWithId(id);
    if (data) {
      dispatch({ type: GET_TRAINSCHEDULE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: GET_TRAINSCHEDULE_FAIL, payload: error });
  }
};

export const getAllTrainSchedule = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TRAINSCHEDULE_REQUEST });
    const data = await getAllTrainSchedule();
    if (data) {
      dispatch({ type: ALL_TRAINSCHEDULE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ALL_TRAINSCHEDULE_FAIL, payload: error });
  }
};
