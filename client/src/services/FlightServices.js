// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllFlightsApi = (minPrice, maxPrice) =>
  axios.get(`/flight/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}`);

export const getFlightsWithLocationApi = (sourceId, destId) =>
  axios.get(`/flight/Schedule?source=${sourceId}&destination=${destId}`);

export const getFlightsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
export const getFlightsWithLocationPriceTimeApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  fromDate,
  toDate
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}`
  );
export const getFlightsWithLocationTimeApi = (
  sourceId,
  destId,
  fromDate,
  toDate
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}&fromDate=${fromDate}&toDate=${toDate}`
  );
