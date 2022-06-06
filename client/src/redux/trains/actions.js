import { 
    ALL_TRAINSCHEDULE_REQUEST,
    ALL_TRAINSCHEDULE_SUCCESS,
    ALL_TRAINSCHEDULE_FAIL,
    CLEAR_ERR,
} from "./types";

import { 
    getAllTrainsApi,
    getTrainsWithLocationApi,
    getTrainsWithLocationAndPriceApi,
} from "../../services/TrainServices";

import { getCityApi } from "../../services/CityServices";

export const fetchAllTrainScheduleRequst = () => {
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
  ({source, destination, minPrice, maxPrice}) => async (dispatch) => {
    try {
      console.log("at train actions");
      dispatch(fetchAllTrainScheduleRequst());
      if (source & destination) {
        console.log("at source nd dest");
        var sourceCity = await getCityApi(source);
        var destCity = await getCityApi(destination);
        if (
          sourceCity.data.cities.length === 0 ||
          destCity.data.cities.length === 0
        )
          throw new Error("Trains are not available");
        console.log(source, destination);
        if (!minPrice && !maxPrice) {
          let { data } = await getTrainsWithLocationApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id
          );
          if (data) {
            console.log(data);
            dispatch(fetchAllTrainScheduleSuccess(data));
            return;
          } else {
            throw new Error();
          }
        } else {
          let { data } = await getTrainsWithLocationAndPriceApi(
            sourceCity.data.cities[0].id,
            destCity.data.cities[0].id,
            minPrice,
            maxPrice
          );
          if (data) {
            dispatch(fetchAllTrainScheduleSuccess(data.trainSchedules));
            return;
          } else {
            throw new Error();
          }
        }
      } else {
        console.log("at else part");
        let { data } = await getAllTrainsApi();
        console.log(data.data);
        if (data) {
          dispatch(fetchAllTrainScheduleSuccess(data.data));
          return;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error.message);
      dispatch(fetchAllTrainScheduleFail(error));
    }
  };

//clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERR });
};
