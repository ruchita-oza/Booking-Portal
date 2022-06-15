import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faUser } from "@fortawesome/free-regular-svg-icons";
import SearchItem from "../../components/searchItem/SearchItem";
function BookingPage({ match }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchParams } = useSearchParams();
  const transport_type = location?.pathname?.split("/")[1];
  const transport_id = location?.pathname?.split("/")[3];
  const person = searchParams?.get("person") || 1;
  //   React.useEffect(() => {
  //     window.addEventListener("load", () => {
  //       navigate("/");
  //     });
  //     return () => {
  //       window.removeEventListener("load", () => {
  //         navigate("/");
  //       });
  //     };
  //   }, []);
  const data = {
    id: 1,
    train_id: "G8-322",
    source: 2,
    destination: 1,
    departure_time: "2022-06-23T03:30:00.000Z",
    arrival_time: "2022-06-23T14:30:00.000Z",
    total_available_seats: 40,
    price_per_seat: 4030,
    createdAt: "2022-06-10T05:47:18.000Z",
    updatedAt: "2022-06-10T05:47:18.000Z",
    deletedAt: null,
    train_detail: { train_name: "express", train_type: "non ac sleeper" },
    source_name: { city_name: "source" },
    destination_name: { city_name: "dest" },
  };
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
                  class="fontIcon-clipboard pull-left"
                ></FontAwesomeIcon>{" "}
                <div
                  className="pull-left i-b pt5 ng-binding"
                  style={{ width: "80%" }}
                >
                  {" "}
                  Review your booking
                </div>
              </h3>
              <Link
                className="pull-right color-blue under-link change-flt-btn"
                to="/"
              >
                Change {transport_type}
              </Link>
              <div className="box-content itin-padd">
                <div class="cancel-free">
                  <span className="content">"Same Day Free cancellation"</span>
                </div>
                <div className="accordion-sm">
                  <div className="acc-content">
                    <SearchItem data={data} />
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
                  class="fontIcon-clipboard pull-left"
                ></FontAwesomeIcon>{" "}
                <div
                  className="pull-left i-b pt5 ng-binding"
                  style={{ width: "80%" }}
                >
                  {" "}
                  Review your booking
                </div>
              </h3>
              <Link
                className="pull-right color-blue under-link change-flt-btn"
                to="/"
              >
                Change {transport_type}
              </Link>
              <form name="travellerForm" id="travellerForm">
                <div className="box">
                  <div className="box-content itin-padd">
                    <artical className="no-gutter clearfix gt-sm-space-down">
                      <div className="col-md-2 col-md-offset-0 trav-labl bold">
                        Contact-Details
                      </div>
                      <div className="col-md-4 col-md-offset-0 mb-05">
                        <input
                          type="text"
                          class="bookingInputText"
                          name="cust_email"
                          Placeholder="Email ID"
                          required
                        />
                      </div>
                      <div className="col-md-4 col-md-offset-0 align-width">
                        <input
                          type="text"
                          placeHolder="Mobile Number"
                          className="bookingInputText"
                          name="cust_phone"
                          required="true"
                          minlength="10"
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
                          <span class="fs-18 bold">Passenger Information</span>
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
                            class="bold"
                          >
                            Important Note:
                          </span>
                          <span>
                            Please ensure that the names of the passengers on
                            the travel documents is the same as on their Gov ID.
                          </span>
                        </div>
                      </div>
                      <artical
                        class="no-gutter clearfix gt-sm-space-down md-pad-botm ng-scope "
                        style={{ marginTop: "30px" }}
                      >
                        <div className="col-md-2 col-md-offset-0 trav-labl bold">
                          Adult - 1
                        </div>
                        <div className="col-md-2 col-md-offset-0 ">
                          <span className="ui-select">
                            <select name="gender" required>
                              <option value="" className="bookingOption">
                                Gender
                              </option>
                              <option value="male" className="bookingOption">
                                Mr
                              </option>{" "}
                              <option value="female" className="bookingOption">
                                Ms/Mrs
                              </option>
                            </select>
                          </span>
                        </div>

                        <div className="col-md-4 col-md-offset-0">
                          <input
                            type="text"
                            autocomplete="none"
                            id="passenger_name"
                            pattern="/^[A-Za-z\s]+$"
                            className="bookingInputText"
                            Placeholder="Passenger Name"
                            required
                          />
                        </div>
                        <div className="col-md-4 col-lg-3 col-md-offset-0">
                          <input
                            type="number"
                            autocomplete="none"
                            id="passenger_Age"
                            pattern="/^[0-9\s]+$"
                            className="bookingInputText"
                            Placeholder="Passenger Age"
                            required
                          />
                        </div>
                      </artical>
                    </div>
                  </div>
                </div>
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
                        <div className="ng-binding">Base Fare</div>
                        <div className="gray-light fs-sm pd-15 ng-binding">
                          ({person} Traveller)
                        </div>
                      </span>
                      <span className="pull-right tr">
                        {" "}
                        <span>9999</span>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className=" full-spread pr" style={{ top: "50px" }}>
                  <button
                    type="submit"
                    className="bkButton "
                    style={{ width: "100%", height: "100%" }}
                  >
                    Confirm your booking!
                  </button>
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
