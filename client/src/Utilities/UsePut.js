import axios from "axios";

// const UsePut = async (url, data, method = "PUT") => {
//   try {
//     let response = await fetch(url, {
//       method: method,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     let result = await response.json();
//     return result;
//   } catch (error) {
//   }
// };

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
