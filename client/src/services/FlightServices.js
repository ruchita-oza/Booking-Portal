// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllFlightsApi = (
  minPrice,
  maxPrice,
  personCount,
  currentPage
) =>
  axios.get(
    `/flight/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}`
  );

export const getFlightsWithLocationApi = (
  sourceId,
  destId,
  personCount,
  currentPage
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}$personCount=${personCount}&page=${currentPage}`
  );

export const getFlightsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount,
  currentPage
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}`
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
