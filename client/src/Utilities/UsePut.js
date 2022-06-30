import axios from "axios";

const UsePut = async (url, data, method = "put") => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.put(url, data, { headers });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default UsePut;
