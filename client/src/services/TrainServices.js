import axios from "axios";
export const getAllTrainsApi = (minPrice, maxPrice, personCount) =>
  axios.get(
    `/train/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}`
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
export const getTrainWithId = (id) => axios.get(`/train/schedule/${id}`);
