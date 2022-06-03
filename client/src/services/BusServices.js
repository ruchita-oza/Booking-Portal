import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllBusesApi = () => axios.get("/bus/Schedule");

export const getBusesWithLocationApi = (sourceId, destId) =>
  axios.get(`/bus/schedule?source=${sourceId}&destination=${destId}`);

export const getBusesWithLocationAndPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice
) =>
  axios.get(
    `/bus/schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
