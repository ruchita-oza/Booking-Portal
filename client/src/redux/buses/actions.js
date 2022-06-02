import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";

import {
  getAllBusesApi,
  getBusesWithLocationApi,
  getBusesWithLocationAndPriceApi,
} from "../../services/BusServices";

import { getCityApi } from "../../services/CityServices";

export const fetchAllBusScheduleRequst = () => {
  return { type: ALL_BUSSCHEDULE_REQUEST };
};
export const fetchAllBusScheduleSuccess = (busSchedules) => {
  return { type: ALL_BUSSCHEDULE_SUCESS, payload: busSchedules };
};
export const fetchAllBusScheduleFail = (error) => {
  return { type: ALL_BUSSCHEDULE_FAIL, payload: error };
};
//get BusSchedules
export const getBusSchedules =
  (source, destination, minPrice, maxPrice) => async (dispatch) => {
    try {
      dispatch(fetchAllBusScheduleRequst());
      if (source & destination) {
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        if (
          sourceCity.data.cities.length === 0 ||
          destCity.data.cities.length === 0
        )
          throw new Error("Bus not available");
        if (!minPrice && !maxPrice) {
          let { data } = await getBusesWithLocationApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id
          );
          if (data) {
            dispatch(fetchAllBusScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else {
          let { data } = await getBusesWithLocationAndPriceApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id,
            minPrice,
            maxPrice
          );
          if (data) {
            dispatch(fetchAllBusScheduleSuccess(data.busSchedules));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        let { data } = await getAllBusesApi();
        if (data) {
          dispatch(fetchAllBusScheduleSuccess(data.busSchedules));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      dispatch(fetchAllBusScheduleFail(error));
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
