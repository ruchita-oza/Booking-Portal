import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/loader/loader";
import { userBookingRecieptThunkAction } from "../../redux/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPassenger, selectUser } from "../../redux/users/selectors";
function UserBooking() {
  const dispatch = useDispatch();
  const location = useLocation();
  const bookingId = location.pathname.split("/")[3];
  const { isLoading, error, bookingRecord, passengers, transport } =
    useSelector(selectPassenger);
  const { loggedInUser } = useSelector(selectUser);
  React.useEffect(() => {
  //  console.log(bookingId);
    if (bookingId) dispatch(userBookingRecieptThunkAction(bookingId));
  }, [dispatch, bookingId]);
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error !== "" ? (
        <div className="container">{error}</div>
      ) : (
        <>
          <main
            className="xl:items-start  container bookingReciept"
            // style={{ fontFamily: "Reem Kufi" }}
            // style={{ maxWidth: "1270px", width: "100%" }}
          >
            {/* Invoice Preview */}
            <div
              className="invoice__preview bg-white rounded  justify-content-md-center"
              // style={{ maxWidth: "1270px", width: "100%" }}
            >
              <div className="p-5">
                <button
                  className="bg-blue-500 ml-4 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 xl:flex-row  xl:justify-between"
                  onClick={handlePrint}
                >
                  Print / Download
                </button>
                <header className="flex flex-col items-center justify-center py-2 px-8  xl:flex-row  xl:justify-between">
                  <div>
                    <h1 className="font-bold uppercase tracking-wide text-3xl mb-3 bookingFont">
                      E-Ticket/Reservation voucher
                    </h1>
                  </div>
                  <div></div>
                </header>
                {/* mainDetails */}
                <section className="flex flex-col items-end justify-end">
                  <h2 className="font-bold text-3xl bookingFont uppercase mb-1">
                    Safar Sath Sath
                  </h2>
                  <p className="bookingFont">
                    Enjoy your safar with your humsafar
                  </p>
                </section>
                {/* client details */}
                <section className="mt-2">
                  <h2 className="text-2xl uppercase font-bold mb-1 bookingFont">
                    {bookingRecord?.cust_email}
                  </h2>
                  <p>{bookingRecord?.cust_phoneNumber}</p>
                </section>
                {/* date */}
                <article className="mt-4 mb-3 flex items-center justify-center">
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col-12 p-1 bg-gray-200 font-bold text-center">
                      Your Transport details
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li className="p-1 bg-gray-100">
                          <span className="font-bold">
                            {bookingRecord?.transport_type === "train"
                              ? transport?.train_detail?.train_name
                              : bookingRecord?.transport_type === "bus"
                              ? transport?.bus_detail?.bus_name
                              : transport?.flight_detail?.flight_name}
                          </span>{" "}
                        </li>
                        <li className="p-1">
                          <span className="font-bold">booking Id number:</span>{" "}
                          {bookingRecord?.id}
                        </li>

                        <li className="p-1 bg-gray-100">
                          <span className="font-bold">journey From :</span>{" "}
                          {transport?.source_name}
                        </li>
                        <li className="p-1 ">
                          <span className="font-bold">Class:</span>{" "}
                          {bookingRecord?.transport_type === "train"
                            ? transport?.train_detail?.train_type
                            : bookingRecord?.transport_type === "bus"
                            ? transport?.bus_detail?.bus_type
                            : transport?.flight_detail?.flight_type}
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      {" "}
                      <ul>
                        <li className="p-1 bg-gray-100">
                          <span className="font-bold">
                            {bookingRecord.transport_type} number :{" "}
                          </span>
                          {bookingRecord?.transport_type === "train"
                            ? transport?.train_id
                            : bookingRecord?.transport_type === "bus"
                            ? transport?.bus_id
                            : transport?.flight_id}
                        </li>
                        <li className="p-1 ">
                          <span className="font-bold">journey Date :</span>{" "}
                          {bookingRecord?.journey_date}
                        </li>
                        <li className="p-1 bg-gray-100">
                          <span className="font-bold">journey To :</span>{" "}
                          {transport?.destination_name}
                        </li>
                        <li className="p-1 ">
                          <span className="font-bold">Departure Time:</span>{" "}
                          {transport?.departure_time}
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
                {/* table */}
                <div className="col-12 mb-2 p-1 bg-gray-200 font-bold text-center">
                  Passenger details
                </div>

                <table width="100%" className="mb-10">
                  <thead>
                    <tr className="bg-gray-100 p-1">
                      <td className="font-bold">Passenger name</td>
                      <td className="font-bold">Passenger Age</td>
                      <td className="font-bold">Passenger Gender</td>
                    </tr>
                  </thead>

                  {passengers.rows &&
                    passengers.rows.map((passenger) => (
                      <React.Fragment key={passenger.id}>
                        <tbody>
                          <tr className="h-10">
                            <td>{passenger.name}</td>
                            <td>{passenger.age}</td>
                            <td>{passenger.gender}</td>
                          </tr>
                        </tbody>
                      </React.Fragment>
                    ))}
                </table>
                <div>
                  <h2 className="flex items-end justify-end text-gray-800 text-2xl font-bold">
                    Total Fare : {bookingRecord.total_fare}(₹)
                  </h2>
                </div>
                {/* note */}
                <section className=" mb-2">
                  <h3> notes</h3>
                  <p className="lg:w-3/4 text-justify">
                    his e-ticket print out has to be carried by the passenger
                    during the journey along with Original Photo ID Card of the
                    passenger whose name appears above. Please show the e-ticket
                    at the time of checking.
                  </p>
                  <p className="lg:w-3/4 text-justify">
                    Please keep the e-ticket safely till the end of the journey.{" "}
                  </p>
                  <p className="lg:w-3/4 text-justify">
                    Please show the e-ticket at the time of checking.
                  </p>
                </section>
                {/* footer */}
                <footer className="footer border-t-2 border-gray-300 pt-5">
                  <ul className="flex flex-wrap items-center justify-center">
                    <li>
                      <span className="font-bold">Your name:</span>{" "}
                      {loggedInUser.first_name}
                      {loggedInUser.last_name}
                    </li>
                    <li>
                      <span className="font-bold">Your email:</span>{" "}
                      {loggedInUser.email}
                    </li>
                    <li>
                      <span className="font-bold">Phone number:</span>{" "}
                      {loggedInUser.phone_number}
                    </li>
                  </ul>
                </footer>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
  //   );
}

export default UserBooking;
