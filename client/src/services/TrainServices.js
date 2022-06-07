import axios from "axios";
export const getAllTrainsApi = () => axios.get("/train/schedule");

export const getTrainsWithLocationApi = (sourceId, destId) =>
  axios.get(`/train/schedule?source=${sourceId}&destination=${destId}`);

export const getTrainsWithLocationAndPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice
) =>
  axios.get(
    `/train/schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
