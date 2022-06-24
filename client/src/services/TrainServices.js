import axios from "axios";
export const getAllTrainsApi = (minPrice, maxPrice, personCount, fromDate) =>
  axios.get(
    `/train/Schedule?minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&fromDate=${fromDate}`
  );
export const getTrainsWithLocationPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice,
  personCount,
  fromDate
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&fromDate=${fromDate}`
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
export const getTrainsWithSourcePriceApi = (
  sourceId,
  minPrice,
  maxPrice,
  personCount,
  fromDate
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&personCount=${personCount}&fromDate=${fromDate}`
  );
export const getTrainsWithSourcePriceTimeApi = (
  sourceId,
  minPrice,
  maxPrice,
  fromDate,
  toDate,
  personCount
) =>
  axios.get(
    `/train/Schedule?source=${sourceId}&minPrice=${minPrice}&maxPrice=${maxPrice}&fromDate=${fromDate}&toDate=${toDate}&personCount=${personCount}`
  );

export const getTrainWithId = (id) => axios.get(`/train/schedule/${id}`);
