import axios from "axios";

const UseDelete = async (url) => {
  try {
    const response = await axios.delete(url);
    console.log("from UseDelete.js", response.data.data);
    return response?.data;
  } catch (error) {
    console.log(error.toString());
    return error;
  }
};

export default UseDelete;
