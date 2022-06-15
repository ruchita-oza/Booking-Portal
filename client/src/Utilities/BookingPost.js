import axios from "axios";
const BookingPost = async (url, data, method = "post") => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await axios.post(`/booking/record/`, data, { headers });

    return response;
  } catch (error) {
    console.log(error.toString());
    return error;
  }
};

export default BookingPost;
