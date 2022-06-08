import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";

import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem";
import Header from "../../components/header/Header";
import ResultNotFoundPage from "../errorPage/ResultNotFoundPage";
import Loader from "../../components/loader/loader";
import EmptyView from "../../components/emptyView/EmptyView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "10 10 10 10",
  },
  thumb: {
    color: "#000",
  },
  rail: {
    color: `rgba(0, 0, 0, 0.26)`,
  },
  track: {
    color: "#000",
  },
});

const List = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const { loading: isFlightLoaded, flights } = useSelector(selectFlights);
  const { loading: isBusLoaded, buses } = useSelector(selectBuses);
  const { loading: isTrainLoaded, trains } = useSelector(selectTrains);

  const isLoading = isFlightLoaded || isTrainLoaded || isBusLoaded;
  const location = useLocation();
  const [source, SetSource] = useState(location?.state?.source || "");
  const [destination, SetDestination] = useState(
    location?.state?.destination || ""
  );
  const [date, setDate] = useState(
    location?.state?.date || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(
    location?.state?.options || {
      person: 1,
    }
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState([1, 20000]);
  const [resultsFound, SetResultsFound] = useState(true);

  const setResult = (value) => {
    console.log("result: ", value);
    SetResultsFound(value);
  };
  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const convertDate = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  const fetchData = () => {
    console.log("at fetch");
    let fromDate = convertDate(date[0].startDate);
    let toDate = convertDate(date[0].endDate);
    // console.log(price);
    let minPrice = selectedPrice[0],
      maxPrice = selectedPrice[1];
    console.log(minPrice, maxPrice, window.location.pathname);
    // setResultsFound(true);
    switch (window.location.pathname) {
      case "/flights":
        setIsLoaded(isFlightLoaded);
        dispatch(
          getFlightSchedules(
            {
              source,
              destination,
              fromDate,
              toDate,
              minPrice,
              maxPrice,
            },
            setResult
          )
        );
        break;

      case "/buses":
        setIsLoaded(isBusLoaded);
        dispatch(
          getBusSchedules(
            {
              source,
              destination,
              fromDate,
              toDate,
              minPrice,
              maxPrice,
            },
            setResult
          )
        );
        // console.log(buses.count);
        // if (buses.count === 0) SetResultsFound(false);
        // else SetResultsFound(true);
        // }
        break;
      default:
        dispatch(
          getTrainSchedules(
            {
              source,
              destination,
              fromDate,
              toDate,
              minPrice,
              maxPrice,
            },
            setResult
          )
        );
    }
  };

  React.useEffect(() => {
    window.addEventListener("load", () => {
      console.log("reloaded");
      navigate("/");
    });
    return () => {
      window.removeEventListener("load", () => {
        console.log("reloaded");
        navigate("/");
      });
    };
  }, []);

  useEffect(() => {
    let fromDate = convertDate(date[0].startDate);
    let toDate = convertDate(date[0].endDate);
    let minPrice = selectedPrice[0],
      maxPrice = selectedPrice[1];
    console.log("at effect");
    switch (window.location.pathname) {
      case "/flights":
        setIsLoaded(isFlightLoaded);
        dispatch(
          getFlightSchedules(
            {
              source,
              destination,
              fromDate,
              toDate,
              minPrice,
              maxPrice,
            },
            setResult
          )
        );
        break;
      case "/buses":
        setIsLoaded(isBusLoaded);

        // if (busError) toast.error(busError);
        // else
        dispatch(
          getBusSchedules(
            { source, destination, fromDate, toDate, minPrice, maxPrice },
            setResult
          )
        );

        break;

      default:
        dispatch(
          getTrainSchedules(
            {
              source,
              destination,
              fromDate,
              toDate,
              minPrice,
              maxPrice,
            },
            setResult
          )
        );
    }
  }, [dispatch, location.pathname]);

  const handleSearch = () => {
    fetchData();
  };
  // console.log(loading);
  return (
    <>
      {/* {isLoaded ? (
        <Loader />
      ) : ( */}


      <div>
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Source</label>
                <input
                  placeholder="&#xF002; Enter Your Source"
                  class="lsSearchInput"
                  type="text"
                  value={source}
                  style={{ "font-family": "FontAwesome" }}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    SetSource(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lsItem">
                <label>Destination</label>
                <input
                  style={{ "font-family": "FontAwesome" }}
                  placeholder="&#xF002; Enter Your Destination"
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    SetDestination(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span
                  onClick={() => setOpenDate(!openDate)}
                  onFocus={() => setOpenDate(!openDate)}
                  onBlur={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
                <div className="lsItem">
                  <label className="mt-3 mb-3">Options</label>
                  <div className="lsOptions">
                    <div className="lsOptionItem mt-3">
                      <div className={classes.root}>
                        <Slider
                          value={selectedPrice}
                          valueLabelDisplay="on"
                          min={1}
                          max={20000}
                          classes={{
                            thumb: classes.thumb,
                            rail: classes.rail,
                            track: classes.track,
                          }}
                          onChange={handleChangePrice}
                        />
                      </div>
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">person</span>
                      <input
                        style={{ "font-family": "FontAwesome" }}
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={options.person}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="listResult">
              {isLoaded ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  {!resultsFound ? (
                    <ResultNotFoundPage />
                  ) : (
                    <>
                      {/* {console.log(flights)} */}
                      {window.location.pathname === "/flights" &&
                        flights.rows &&
                        flights.rows.map((flight) => (
                          <SearchItem data={flight} key={flight.id} />
                        ))}
                      {window.location.pathname === "/buses" &&
                        buses.rows &&
                        buses.rows.map((bus) => (
                          <SearchItem data={bus} key={bus.id} />
                        ))}
                      {window.location.pathname === "/trains" &&
                        trains.rows &&
                        trains.rows.map((train) => (
                          <SearchItem key={train.id} data={train} />
                        ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* )}{" "} */}
    </>
  );
};

export default List;
