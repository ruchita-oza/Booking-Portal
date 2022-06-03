import axios from "axios";

export const getLoggedInUserApi = (userData) =>
  axios.post("auth/login", userData);
