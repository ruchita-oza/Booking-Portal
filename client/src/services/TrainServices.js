// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllTrainsApi = (minPrice, maxPrice, personCount) =>
  axios.get(
    `/train/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}`
  );

export const getTrainsWithLocationApi = (sourceId, destId, personCount) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&personCount=${personCount}`
  );

export const getTrainsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}`
  );
export const getTrainsWithLocationPriceTimeApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  fromDate,
  toDate,
  personCount
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}`
  );
export const getTrainsWithLocationTimeApi = (
  sourceId,
  destId,
  fromDate,
  toDate,
  personCount
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}`
  );
