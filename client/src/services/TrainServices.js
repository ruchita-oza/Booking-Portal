// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllTrainsApi = (minPrice, maxPrice) =>
  axios.get(`/train/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}`);

export const getTrainsWithLocationApi = (sourceId, destId) =>
  axios.get(`/train/Schedule?source=${sourceId}&destination=${destId}`);

export const getTrainsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
export const getTrainsWithLocationPriceTimeApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  fromDate,
  toDate
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}`
  );
export const getTrainsWithLocationTimeApi = (
  sourceId,
  destId,
  fromDate,
  toDate
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&fromDate=${fromDate}&toDate=${toDate}`
  );
