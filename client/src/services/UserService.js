import axios from "axios";

export const getLoggedInUserApi = (userData) =>
  axios.post("/authRoute/login", userData);

export const getUserDetailApi = (id) => axios.get(`/users/${id}`);

export const getUserBookingRecordsDetailApi = (id) =>
  axios.get(`/booking/record/userId/${id}`);
