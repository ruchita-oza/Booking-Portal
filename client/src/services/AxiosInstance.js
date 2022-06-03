import axios from "axios";

// Axios Instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_DEV_BASE_URL,
});

export default instance;
