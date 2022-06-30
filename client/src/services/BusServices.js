import axios from "axios";
export const getAllBusesApi = (
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/bus/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );

export const getBusesWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/bus/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );
export const getBusesWithLocationPriceTimeApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  fromDate,
  toDate,
  personCount,
  currentPage
) =>
  axios.get(
    `/bus/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );

export const getBusesWithSourcePriceApi = (
  sourceId,
  minPrice,
  maxPrice,
  personCount,
  currentPage,
  fromDate
) =>
  axios.get(
    `/bus/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}&fromDate=${fromDate}`
  );
export const getBusesWithSourcePriceTimeApi = (
  sourceId,
  minPrice,
  maxPrice,
  fromDate,
  toDate,
  personCount,
  currentPage
) =>
  axios.get(
    `/bus/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}&page=${currentPage}`
  );
export const getBusWithId = (id) => axios.get(`/bus/schedule/${id}`);
