import axios from "axios";

export const getBookingDetailWithIdApi = (id) =>
  axios.get(`/booking/record/${id}`);
export const getAllPassengerDetailsWithBookingIdApi = (booking_id) =>
  axios.get(`/passenger/details/booking_id/${booking_id}`);
