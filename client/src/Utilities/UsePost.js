import axios from "axios";

const UsePost = async (url, data, method = "post") => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export default UsePost;
