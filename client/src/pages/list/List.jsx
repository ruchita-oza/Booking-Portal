import React, { useState, useEffect } from "react";
import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getFlightSchedules } from "../../redux/actions/flightAction";
import { getBusSchedules } from "../../redux/actions/busAction";
import Loader from "../../components/loader/loader";

const List = () => {
  const dispatch = useDispatch();
  const { loading, error, flights } = useSelector(
    (state) => state.flightsAvailable
  );

  const location = useLocation();
  const [source] = useState(location.state.source);
  const [destination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  useEffect(() => {
    if (error) {
      return alert(error);
    }
    dispatch(getFlightSchedules(source, destination));
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Source</label>
              <input placeholder={source} type="text"></input>
            </div>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text"></input>
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
              <button>Search</button>
            </div>
          </div>
          <div className="listResult">
            {flights.data.flightSchedules &&
              flights.data.flightSchedules.map((flight) => (
                <SearchItem flight={flight} />
              ))}
            {/* <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
