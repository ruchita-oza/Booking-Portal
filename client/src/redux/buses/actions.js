import {
  ALL_BUSSCHEDULE_REQUEST,
  ALL_BUSSCHEDULE_SUCESS,
  ALL_BUSSCHEDULE_FAIL,
  CLEAR_ERR,
} from "./types";
import axios from "axios";
import {
  getAllBusesApi,
  getBusesWithLocationApi,
  getBusesWithLocationTimeApi,
  getBusesWithLocationPriceApi,
  getBusesWithLocationPriceTimeApi,
} from "../../services/BusServices";

import { getCityApi } from "../../services/CityServices";
import toast from "react-hot-toast";

export const fetchAllBusScheduleRequest = () => {
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
  ({ source, destination, minPrice, maxPrice, fromDate, toDate }) =>
  async (dispatch) => {
    try {
      dispatch(fetchAllBusScheduleRequest());
      // console.log(fromDate);
      // console.log(toDate);
      if (source && destination) {
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        if (
          (!sourceCity && !destCity) ||
          sourceCity.data.cities.length === 0 ||
          destCity.data.cities.length === 0
        ) {
          throw new Error(
            `bus on Schedule ${sourceCity} and ${destCity} is not available`
          );
        }

        if (!minPrice && !fromDate) {
          // console.log("at inner if");
          // console.log("source id : " + sourceCity.data.cities[0].id);
          let { data } = await getBusesWithLocationApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id
          );
          // console.log(data);
          if (data) {
            dispatch(fetchAllBusScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else if (minPrice && !fromDate) {
          let { data } = await getBusesWithLocationPriceApi(
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
        } else if (!minPrice && fromDate) {
          // console.log("at inner fromdata");
          // console.log(sourceCity.data);
          // console.log(destCity.data);
          let { data } = await getBusesWithLocationTimeApi(
            sourceCity.data.cities.rows[0].id,
            destCity.data.cities.rows[0].id,
            fromDate,
            toDate
          );
          // console.log(data);
          if (data) {
            dispatch(fetchAllBusScheduleSuccess(data.busSchedules));
            return;
          } else {
            throw new Error();
          }
        } else if (minPrice && fromDate) {
          let { data } = await getBusesWithLocationPriceTimeApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id,
            minPrice,
            maxPrice,
            fromDate,
            toDate
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
      toast.error(error.message);
      dispatch(fetchAllBusScheduleFail(error));
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
