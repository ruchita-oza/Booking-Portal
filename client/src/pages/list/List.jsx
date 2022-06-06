import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/loader";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useSelector, useDispatch } from "react-redux";
import { getFlightSchedules } from "../../redux/flights/actions";
import { getBusSchedules } from "../../redux/buses/actions";
import { getTrainSchedules } from "../../redux/trains/actions";
import { selectFlights } from "../../redux/flights/selector";
import { selectBuses } from "../../redux/buses/selector";
import { selectTrains } from "../../redux/trains/selector";

import toast from "react-hot-toast";
const List = () => {
  const dispatch = useDispatch();
  const {
    loading: isFlightLoaded,
    error: flightError,
    flights,
  } = useSelector(selectFlights);
  const {
    loading: isBusLoaded,
    error: busError,
    buses,
  } = useSelector(selectBuses);
  const { 
    loading : isTrainLoaded, 
    error : trainError, 
    trains,
  } = useSelector(selectTrains);


  const location = useLocation();
  const [source] = useState(location.state.source);
  const [destination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    switch (window.location.pathname) {
      case "/flights":
        setIsLoaded(isFlightLoaded);
        if(flightError)
          toast.error(flightError);
        else
        dispatch(getFlightSchedules(source, destination));
        break;

      case "/buses":
        setIsLoaded(isBusLoaded);

        if(busError)
          toast.error(busError);
        else
        dispatch(getBusSchedules(source, destination));
        break;

      default:
        if(trainError)
          toast.error(trainError);
        else
          dispatch(getTrainSchedules({source, destination}));
    }
  }, [dispatch, source, destination , flightError, busError, trainError, isBusLoaded, isFlightLoaded, isTrainLoaded]);

  console.log(useSelector(selectFlights));

  return isTrainLoaded ? (
    <Loader />
  ) : (
    <div>
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Source</label>
              <input placeholder={source} type='text'></input>
            </div>
            <div className='lsItem'>
              <label>Destination</label>
              <input placeholder={destination} type='text'></input>
            </div>
            <div className='lsItem'>
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
              <div className='lsItem'>
                <label>Options</label>
                <div className='lsOptions'>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText'>
                      Price <small>per seat</small>
                    </span>
                    <input type='number' className='lsOptionInput' />
                  </div>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText'>Adult</span>
                    <input
                      type='number'
                      min={1}
                      className='lsOptionInput'
                      placeholder={options.adult}
                    />
                  </div>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText'>Children</span>
                    <input
                      type='number'
                      min={0}
                      className='lsOptionInput'
                      placeholder={options.children}
                    />
                  </div>
                </div>
              </div>
              <button>Search</button>
            </div>
          </div>
          <div className='listResult'>
            {window.location.pathname === "/flights" && flights.map((flight) => <SearchItem key={flight.id} data={flight} />)}
            {window.location.pathname === "/buses" && buses.map((bus) => <SearchItem key={bus.id} data={bus} />)}
            {window.location.pathname === "/trains" && trains.map((train) => <SearchItem key={train.id} data={train} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
