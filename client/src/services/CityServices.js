import AxiosInstance from "./AxiosInstance";

export const getCityApi = (cityName) =>
  AxiosInstance.get(`/city/?city_name=${cityName}`);
