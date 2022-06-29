import axios from "axios";

const UseDelete = async (url) => {
  try {
    const response = await axios.delete(url);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default UseDelete;
