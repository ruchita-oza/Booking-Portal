// import AxiosInstance from "./AxiosInstance";
import axios from "axios";
export const getAllFlightsApi = () => axios.get("/flight/Schedule");

export const getFlightsWithLocationApi = (sourceId, destId) =>
  axios.get(`/flight/schedule?source=${sourceId}&destination=${destId}`);

export const getFlightsWithLocationAndPriceApi = (
  sourceId,
  destId,
  minPrice,
  maxPrice
) =>
  axios.get(
    `/flight/schedule?source=${sourceId}&destination=${destId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
