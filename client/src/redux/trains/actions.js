import { toast } from "react-hot-toast";
import {
  ALL_TRAINSCHEDULE_REQUEST,
  ALL_TRAINSCHEDULE_SUCCESS,
  ALL_TRAINSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";

import {
  getAllTrainsApi,
  getTrainsWithLocationPriceTimeApi,
  getTrainsWithLocationPriceApi,
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

//get trainSchedules
export const getTrainSchedules =
  (
    { source, destination, minPrice, maxPrice, fromDate, toDate, personCount },
    setResult
  ) =>
  async (dispatch) => {
    try {
      // console.log(source, destination, minPrice, maxPrice, fromDate, toDate);
      dispatch(fetchAllTrainScheduleRequest());
      // console.log(setResult);
      setResult(true);
      minPrice = minPrice ? minPrice : 0;
      maxPrice = maxPrice ? maxPrice : 1000000;
      personCount = personCount ? personCount : 1;
      // console.log(fromDate);
      // console.log(toDate);
      if (source && destination) {
        console.log("at source dest");
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
          let { data } = await getTrainsWithLocationPriceApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            minPrice,
            maxPrice,
            personCount
          );
          if (data) {
            if (data.data.count === 0) setResult(false);
            dispatch(fetchAllTrainScheduleSuccess(data.data));
            return;
          } else {
            throw new Error();
          }
        } else if (fromDate) {
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
            dispatch(fetchAllTrainScheduleSuccess(data.data));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        let { data } = await getAllTrainsApi(minPrice, maxPrice, personCount);
        console.log(data);
        if (data) {
          console.log(data);
          if (data.data.count === 0) setResult(false);
          dispatch(fetchAllTrainScheduleSuccess(data.data));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setResult(false);
      dispatch(fetchAllTrainScheduleFail(error));
      // setResult(false);
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
