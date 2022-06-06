import React, { useState, useEffect } from "react";
import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getFlightSchedules } from "../../redux/flights/actions";
import { getBusSchedules } from "../../redux/buses/actions";
import Loader from "../../components/loader/loader";
import { selectFlights } from "../../redux/flights/selector";
import { selectBuses } from "../../redux/buses/selector";

import toast from "react-hot-toast";
const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, flights, buses } = useSelector(
    // selectFlights,
    selectBuses
  );

  const location = useLocation();
  const [source, SetSource] = useState(location.state.source);
  const [destination, SetDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    let fromDate = convertDate(date[0].startDate);
    let toDate = convertDate(date[0].endDate);

    if (window.location.pathname === "/flights")
      dispatch(getFlightSchedules(source, destination));
    if (window.location.pathname === "/buses") {
      dispatch(getBusSchedules({ source, destination, fromDate, toDate })).then(
        console.log(buses)
      );
      // console.log(buses);
    }
    if (window.location.pathname === "/trains")
      dispatch(getBusSchedules({ source, destination, fromDate, toDate }));
  }, [dispatch, error]);
  const convertDate = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  const handleSearch = () => {
    // console.log("at handler");
    // console.log(source, destination);
    // console.log(date[0].startDate);
    let fromDate = convertDate(date[0].startDate);
    let toDate = convertDate(date[0].endDate);
    if (error) {
      toast.error(error);
    }
    if (window.location.pathname === "/flights")
      dispatch(getFlightSchedules(source, destination));
    if (window.location.pathname === "/buses") {
      // console.log(buses);
      dispatch(getBusSchedules({ source, destination, fromDate, toDate })).then(
        console.log(buses)
      );
    }
    if (window.location.pathname === "/trains")
      dispatch(getBusSchedules(source, destination));
  };
  console.log(buses.rows);
  // console.log(loading);
  return (
    <>
      {isLoading} ? (
      <Loader />) : (
      <div>
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Source</label>
                <input
                  placeholder="enter your source"
                  type="text"
                  value={source}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    SetSource(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  placeholder="Enter your destination"
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    SetDestination(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  date[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
                <div className="lsItem">
                  <label>Options</label>
                  <div className="lsOptions">
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Price <small>per seat</small>
                      </span>
                      <input type="number" className="lsOptionInput" />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Adult</span>
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={options.adult}
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Children</span>
                      <input
                        type="number"
                        min={0}
                        className="lsOptionInput"
                        placeholder={options.children}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            <div className="listResult">
              {window.location.pathname === "/flights" && (
                <SearchItem props={flights} />
              )}
              {window.location.pathname === "/buses" &&
                buses.rows &&
                buses.rows.map((bus) => <SearchItem data={bus} />)}
              {window.location.pathname === "/trains" && (
                <SearchItem props={buses} />
              )}
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default List;
