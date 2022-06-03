import axios from "axios";

export const getLoggedInUserApi = (userData) =>
  axios.post("/authRoute/login", userData);
