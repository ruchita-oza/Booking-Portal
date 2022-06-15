// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllBusesApi = (minPrice, maxPrice, personCount, currentPage) =>
  axios.get(
    `/bus/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}`
  );

// export const getBusesWithLocationApi = (sourceId, destId) =>
//   axios.get(`/bus/Schedule?source=${sourceId}&destination=${destId}`);

export const getBusesWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount,
  currentPage
) =>
  axios.get(
    `/bus/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&page=${currentPage}`
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
    `/bus/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}&page=${currentPage}`
  );
// export const getBusesWithLocationTimeApi = (
//   sourceId,
//   destId,
//   fromDate,
//   toDate
// ) =>
//   axios.get(
//     `/bus/Schedule?source=${sourceId}&destination=${destId}&fromDate=${fromDate}&toDate=${toDate}`
//   );
