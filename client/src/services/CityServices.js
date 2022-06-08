import axios from "axios";


export const getCityApi = (cityName) =>
  axios.get(`city/?city_name=${cityName}`);
