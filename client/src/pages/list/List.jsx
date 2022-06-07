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

  const isLoading = isFlightLoaded || isTrainLoaded || isBusLoaded;
  const location = useLocation();
  const [source, SetSource] = useState(location.state.source);
  const [destination, SetDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [isLoaded, setIsLoaded] = useState(false);
 
  const convertDate = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

 const fetchData = (()=>{ let fromDate = convertDate(date[0].startDate);
  let toDate = convertDate(date[0].endDate);

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
      dispatch(getBusSchedules({ source, destination, fromDate, toDate }))
      break;

    default:
      if(trainError)
        toast.error(trainError);
      else
        dispatch(getTrainSchedules({source, destination}));
  }   });
  
  useEffect(() => {
    let fromDate = convertDate(date[0].startDate);
  let toDate = convertDate(date[0].endDate);

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
      dispatch(getBusSchedules({ source, destination, fromDate, toDate }))
      break;

    default:
      if(trainError)
        toast.error(trainError);
      else
        dispatch(getTrainSchedules({source, destination}));
  }
 }, [dispatch , flightError, busError, trainError, isLoading]);


  //   if (window.location.pathname === "/buses") {
  //     );
  //     // console.log(buses);
  //   }
  //   if (window.location.pathname === "/trains")
  //     dispatch(getBusSchedules({ source, destination, fromDate, toDate }));
  // }, [dispatch, error]);
  const handleSearch = () => {fetchData();}
  // console.log(loading);
  return (
    <>
      {isLoaded ? (
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
//  skjdksjd
  // console.log(useSelector(selectFlights));

  // return isTrainLoaded ? (
  //   <Loader />
  // ) : (
  //   <div>
  //     <Header type='list' />
  //     <div className='listContainer'>
  //       <div className='listWrapper'>
  //         <div className='listSearch'>
  //           <h1 className='lsTitle'>Search</h1>
  //           <div className='lsItem'>
  //             <label>Source</label>
  //             <input placeholder={source} type='text'></input>
  //           </div>
  //           <div className='lsItem'>
  //             <label>Destination</label>
  //             <input placeholder={destination} type='text'></input>
  //           </div>
  //           <div className='lsItem'>
  //             <label>Check-in Date</label>
  //             <span onClick={() => setOpenDate(!openDate)}>{`${format(
  //               date[0].startDate,
  //               "MM/dd/yyyy"
  //             )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
  //             {openDate && (
  //               <DateRange
  //                 onChange={(item) => setDate([item.selection])}
  //                 minDate={new Date()}
  //                 ranges={date}
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
                  <button type="submit" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
              <div className="listResult">
              {window.location.pathname === "/flights" && flights.map((flight) => <SearchItem key={flight.id} data={flight} />)}
           
                {window.location.pathname === "/buses" &&
                  buses.rows &&
                  buses.rows.map((bus) => <SearchItem data={bus} />)}
                 {window.location.pathname === "/trains" && trains.map((train) => <SearchItem key={train.id} data={train} />)}
        
              </div>
            </div>
          </div>
        </div>
      )}{" "}

{/* >>>>>>> 0ef795fe404a0811105da44d3f165843e5692c29
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
                          placeholder={options.children} */}
    </>
  );
};

export default List;
