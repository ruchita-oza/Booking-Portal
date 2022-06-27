import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./BookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faUser } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";
import SearchItem from "../../components/searchItem/SearchItem";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { selectUser } from "../../redux/users/selectors";
import { getFlightScheduleById } from "../../redux/flights/actions";
import { getBusScheduleById } from "../../redux/buses/actions";
import { getTrainScheduleById } from "../../redux/trains/actions";
import toast from "react-hot-toast";
import axios from "axios";
// import { dispatch } from "react-hot-toast/dist/core/store";
function BookingPage({ match }) {
  const { loggedInUser } = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: flightData } = useSelector((state) => state.flight.flight);
  const { data: busData } = useSelector((state) => state.bus.bus);
  const { data: trainData } = useSelector((state) => state.train.train);
  const { searchParams } = useSearchParams();
  const transport_type = location?.pathname?.split("/")[1];
  const transport_id = location?.pathname?.split("/")[3];
  const search = location.search;
  const person = new URLSearchParams(search).get("person") || 1;
  const [passengerDetails, setPassengerDetails] = useState([
    {
      id: uuidv4(),
      passenger_name: "",
      passenger_gender: "male",
      passenger_age: "",
    },
  ]);
  const [booking, setBooking] = useState({
    cust_id: "",
    cust_email: "",
    cust_phoneNumber: "",
    transport_type,
    transport_id,
    total_ticket_count: person,
    journey_date: "2022-06-24 09:00:00",
    total_fare: "5000",
    booking_status: "confirm",
  });
  const handlePassengerChange = (id, event) => {
    const newPassenger = passengerDetails.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setPassengerDetails(newPassenger);
  };

  const handleAddFields = () => {
    setPassengerDetails([
      ...passengerDetails,
      {
        id: uuidv4(),
        passenger_name: "",
        passenger_gender: "male",
        passenger_age: "",
      },
    ]);
  };
  const handleRemoveFields = (id) => {
    const values = [...passengerDetails];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setPassengerDetails(values);
  };
  const handleRemoveAllFields = () => {
    setPassengerDetails([]);
  };
  let name, value;
  const handleBookingInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBooking({ ...booking, [name]: value });
  };
  let total_fare =
    (transport_type === "flight"
      ? flightData?.price_per_seat
      : transport_type === "bus"
      ? busData?.price_per_seat
      : trainData?.price_per_seat) * person;
  let journey_date =
    transport_type === "flight"
      ? flightData?.departure_time
      : transport_type === "bus"
      ? busData?.departure_time
      : trainData?.departure_time;
  const addBookingRecord = async () => {
    try {
      // const headers = {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      // };
      // console.log(booking);
      // const response = await axios.post(`/booking/record`, booking, {
      //   headers,
      // });
      const res = await fetch("/booking/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cust_id: loggedInUser.id,
          cust_email: booking.cust_email,
          cust_phoneNumber: booking.cust_phoneNumber,
          transport_type: booking.transport_type,
          transport_id: booking.transport_id,
          total_ticket_count: booking.total_ticket_count,
          journey_date: journey_date,
          total_fare: total_fare,
          booking_status: "confirm",
        }),
      });
      const data = await res.json();
      if (!data) {
        throw new Error("message");
      }
      if (data.success === false) {
        throw new Error(`success false with error ${data.message}`);
      }

      // console.log("res:  ", data);
      return data;
    } catch (error) {
      toast.error(error);
      // console.log(error.toString());
      return error;
    }
  };
  const addPassengerDetails = async (person, id) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        `/passenger/details`,
        {
          booking_id: id,
          name: person.passenger_name,
          gender: person.passenger_gender,
          age: person.passenger_age,
        },
        {
          headers,
        }
      );
      if (!response) {
        throw new Error("something went wrong!");
      }
      if (response.success === false) {
        throw new Error(
          `Error while adding ${person.passenger_name} , error: ${response.error}`
        );
      }
      return response;
    } catch (error) {
      toast.error(error);
      // console.log(error.toString());
      return error;
    }
  };
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (passengerDetails.length != person) {
      toast.error(`Please Enter ${person} Passenger Details`);
    } else {
      let total_fare =
        (transport_type === "flight"
          ? flightData?.price_per_seat
          : transport_type === "bus"
          ? busData?.price_per_seat
          : trainData?.price_per_seat) * person;
      const journey_date =
        transport_type === "flight"
          ? flightData?.departure_time
          : transport_type === "bus"
          ? busData?.departure_time
          : trainData?.departure_time;
      // console.log("id : ", loggedInUser.id);
      setBooking({
        ...booking,
        cust_id: loggedInUser.id,
        journey_date: journey_date,
        total_fare: total_fare,
      });
      // console.log("before call");
      const bookingResult = await addBookingRecord();
      // console.log("after call", bookingResult);
      if (bookingResult.success === true) {
        passengerDetails.forEach(async (person) => {
          const passengerResult = await addPassengerDetails(
            person,
            bookingResult.id
          );
        });
        toast.success("booking confirmed");
        navigate("/");
        // console.log("bookingResult");
      } else {
        toast.error("in else part");
      }
      // console.log("booking details :", booking);
      // console.log("person details");
    }
  };
  React.useEffect(() => {
    // console.log(transport_type);
    switch (transport_type) {
      case "flight":
        dispatch(getFlightScheduleById(transport_id));
        break;
      case "bus":
        dispatch(getBusScheduleById(transport_id));
        break;
      default:
        dispatch(getTrainScheduleById(transport_id));
    }
  }, []);
  return (
    <main
      className="container-fluid pad-sm-bottom"
      style={{
        maxWidth: "1180px",
        marginRight: "auto",
        marginLeft: "auto",
        paddingLeft: "0.9375rem",
        paddingRight: "0.9375rem",
        marginTop: " 0.9375rem",
        marginBottom: " 0.9375rem",
        fontSize: " 1rem",
        lineHeight: " 1.5",
        color: " #333",
        boxSizing: "inherited",
      }}
    >
      <div className="row gutter-md-5" id="main-box" style={{ display: "box" }}>
        <div className="col-md-9" id="left-box">
          <div id="review-dom" className="box">
            <div className="box hide-under-overlay ng-scope">
              <h3 className="box-title bold grad" style={{ width: "66%" }}>
                <FontAwesomeIcon
                  icon={faClipboard}
                  className="fontIcon-clipboard pull-left"
                ></FontAwesomeIcon>{" "}
                <div
                  className="pull-left i-b pt5 ng-binding"
                  style={{ width: "80%" }}
                >
                  {" "}
                  Review your booking details
                </div>
              </h3>
              <Link
                className="pull-right color-blue under-link change-flt-btn"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Change {transport_type}
              </Link>
              <div className="box-content itin-padd">
                <div className="cancel-free">
                  <span className="content">"Same Day Free cancellation"</span>
                </div>
                <div className="accordion-sm">
                  <div className="acc-content">
                    {transport_type === "flight"
                      ? flightData && <SearchItem data={flightData} />
                      : transport_type === "train"
                      ? trainData && <SearchItem data={trainData} />
                      : busData && <SearchItem data={busData} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="traveller-dom" className="box">
            <div className="box hide-under-overlay ng-scope">
              <h3 className="box-title bold grad" style={{ width: "66%" }}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="fontIcon-clipboard pull-left"
                ></FontAwesomeIcon>{" "}
                <div
                  className="pull-left i-b pt5 ng-binding"
                  style={{ width: "80%" }}
                >
                  {" "}
                  Review your personal details
                </div>
              </h3>
              {/* <Link
                className="pull-right color-blue under-link change-flt-btn"
                to="/"
              >
                Change {transport_type}
              </Link> */}
              <form
                name="travellerForm"
                id="travellerForm"
                onSubmit={handleBookingSubmit}
              >
                <div className="box">
                  <div className="box-content itin-padd">
                    <artical className="no-gutter clearfix gt-sm-space-down">
                      <div className="col-md-2 col-md-offset-0 trav-labl bold">
                        Contact-Details
                      </div>
                      <div className="col-md-4 col-md-offset-0 mb-05">
                        <input
                          type="text"
                          className="bookingInputText"
                          name="cust_email"
                          value={booking.email}
                          onChange={(e) => handleBookingInput(e)}
                          placeholder="Email ID"
                          required={true}
                          autoComplete="on"
                        />
                      </div>
                      <div className="col-md-4 col-md-offset-0 align-width">
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          className="bookingInputText"
                          name="cust_phoneNumber"
                          value={booking.cust_phoneNumber}
                          onChange={(e) => {
                            handleBookingInput(e);
                          }}
                          required={true}
                          autoComplete="on"
                          minLength="10"
                          maxLength="10"
                        />
                      </div>
                      <div className="col-md-offset-2 col-md-10 col-xs-12 pb-10px">
                        <div className="pd-0">
                          <div className="txt2">
                            <p className="fs-base block mb5 gray">
                              Your booking details will be sent to this email
                              address and mobile number.
                            </p>
                          </div>
                        </div>
                      </div>
                    </artical>
                    <div className="ng-scope">
                      <div className="traveller-list ng-scope">
                        {" "}
                        <p className="col-md-offset-2 col-md-10 col-xs-12">
                          <span className="fs-18 bold">
                            Passenger Information
                          </span>
                        </p>
                      </div>
                      <div className="passport-note clearfix">
                        <div className="col-md-offset-2 col-md-10 fs-base passport-info">
                          {" "}
                          <span
                            style={{
                              backgroundColor: "#fffcc7",
                              padding: "5px",
                            }}
                            className="bold"
                          >
                            Important Note:
                          </span>
                          <span>
                            Please ensure that the names of the passengers on
                            the travel documents is the same as on their Gov ID.
                          </span>
                        </div>
                      </div>
                      {passengerDetails.map((passenger, index) => {
                        return (
                          <artical
                            className="no-gutter clearfix gt-sm-space-down md-pad-botm ng-scope "
                            style={{ marginTop: "30px" }}
                            key={passenger.id}
                          >
                            <div className="col-md-2 col-md-offset-0 trav-labl bold">
                              Passenger -{index + 1}
                            </div>
                            <div className="col-md-2 col-md-offset-0 ">
                              <span className="ui-select">
                                <select
                                  name="passenger_gender"
                                  value={
                                    passenger.passenger_gender
                                      ? passenger.passenger_gender
                                      : "male"
                                  }
                                  onChange={(e) =>
                                    handlePassengerChange(passenger.id, e)
                                  }
                                  required={true}
                                >
                                  <option
                                    value="male"
                                    className="bookingOption"
                                  >
                                    Mr
                                  </option>{" "}
                                  <option
                                    value="female"
                                    className="bookingOption"
                                  >
                                    Ms/Mrs
                                  </option>
                                </select>
                              </span>
                            </div>

                            <div className="col-md-3 col-md-offset-0">
                              <input
                                type="text"
                                autoComplete="on"
                                id="passenger_name"
                                name="passenger_name"
                                onChange={(e) =>
                                  handlePassengerChange(passenger.id, e)
                                }
                                value={passenger.passenger_name}
                                className="bookingInputText"
                                placeholder="Passenger Name"
                                required={true}
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-md-offset-0">
                              <input
                                type="number"
                                autoComplete="on"
                                id="passenger_age"
                                name="passenger_age"
                                className="bookingInputText"
                                placeholder="Passenger Age"
                                value={passenger.passenger_age}
                                onChange={(e) =>
                                  handlePassengerChange(passenger.id, e)
                                }
                                required={true}
                              />
                            </div>
                            <IconButton
                              disabled={passengerDetails.length === 1}
                              onClick={() => handleRemoveFields(passenger.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <IconButton
                              onClick={handleAddFields}
                              disabled={passengerDetails.length >= person}
                            >
                              <AddIcon />
                            </IconButton>
                          </artical>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <br />
                <button
                  type="submit"
                  className="bkButton "
                  style={{ width: "100%", height: "100%" }}
                >
                  Confirm your booking!
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-3"
          id="right-box"
          styke={{ postion: "relative", top: "0px" }}
        >
          {" "}
          <div className="box fair-details ng-scope">
            {" "}
            {/* fair details */}{" "}
            <div className="box-title bold normal clearfix hide-under-overlay half-width">
              {" "}
              <span className="pull-left fs-md pd-tp">Fair Details</span>
            </div>
            <div className="box-content aside-box-content pd-btm-0 hide-under-overlay">
              {" "}
              <div className="showFairDetails">
                <div>
                  <ul className="list list-border">
                    <li className="fs-13 gray">
                      <span className="pull-left cursor-pointer pr under-link">
                        <div
                          className="ng-binding"
                          style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                          Base Fare
                        </div>
                        <div
                          className="gray-light fs-sm pd-15 ng-binding"
                          style={{ fontSize: "15px" }}
                        >
                          ({person} Traveller)
                        </div>
                      </span>
                      <span
                        className="pull-right tr"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {" "}
                        <span>₹ {total_fare} </span>
                      </span>
                    </li>
                  </ul>
                </div>
                <br />
                <br />
                <br />
                <div className=" full-spread pr" style={{ top: "50px" }}>
                  {/* <button
                    // type="submit"
                    className="bkButton "
                    style={{ width: "100%", height: "100%" }}
                    onClick={handleBookingSubmit}
                  >
                    Confirm your booking!
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingPage;
