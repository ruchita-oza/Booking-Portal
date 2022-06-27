// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllFlightsApi = (
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/flight/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );

export const getFlightsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );
export const getFlightsWithSourcePriceApi = (
  sourceId,
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
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
export const getFlightsWithSourcePriceTimeApi = (
  sourceId,
  minPrice,
  maxPrice,
  fromDate,
  toDate
) =>
  axios.get(
    `/flight/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}`
  );

export const getFlightWithId = (id) => axios.get(`/flight/schedule/${id}`);
