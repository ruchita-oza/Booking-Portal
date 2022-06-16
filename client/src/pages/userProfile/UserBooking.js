import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader/loader";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};
function UserBooking() {
  const location = useLocation();
  const bookingId = location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    id: 1,
    cust_id: 1,
    cust_email: "test5@gmail.com",
    cust_phoneNumber: 1234567890,
    transport_type: "bus",
    transport_id: 1,
    total_ticket_count: 1,
    journey_date: "2022-06-24T03:30:00.000Z",
    total_fare: 171,
    booking_status: "confirm",
  });
  const [passengerDetails, setPassengerDetails] = useState(null);
  const [error, setError] = useState("");
  //   const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setError("");
      let data = await axios.get(`/booking/record/${bookingId}`);
      data = data.data;
      if (!data || data?.status != true) {
        throw new Error(`Error : ${data?.message}`);
      } else {
        console.log(data.data);
        // setBookingData({
        //   id: data.data.id,
        //   cust_id: data.data.cust_id,
        //   cust_email: data.data.cust_email,
        //   cust_phoneNumber: data.data.cust_phoneNumber,
        //   transport_type: data.data.transport_type,
        //   transport_id: data.data.transport_id,
        //   total_ticket_count: data.data.total_ticket_count,
        //   journey_date: data.data.journey_date,
        //   total_fare: data.data.total_fare,
        //   booking_status: data.data.booking_status,
        // });
      }
    } catch (e) {
      console.log(e);
      // setError(e);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {" "}
      {error !== null && !bookingData ? (
        <div className="container">{error}</div>
      ) : (
        <>
          <div>
            {bookingId}
            <br />
            {bookingData}
            <div
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              style={MODAL_STYLES}
            ></div>
            skdj
          </div>
        </>
      )}
    </>
  );
  //   );
}

export default UserBooking;
