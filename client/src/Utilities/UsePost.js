import axios from "axios";

const UsePost = async (url, data, method = "post") => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });
    console.log("response from usepost.js : ", response);
    return response;
  } catch (error) {
    // console.log(error.toString());
    return error;
  }
};

export default UsePost;
