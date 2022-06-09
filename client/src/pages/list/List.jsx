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
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles({
  root: {
    width: "100%",
    margin: "10 10 10 10",
    layout_width: "match_parent",
    layout_height: "wrap_content",
    contentDescription: "@string/slider_desc",
  },
  thumb: {
    color: "#000",
  },
  rail: {
    color: `rgba(1, 1, 1, 0.26)`,
  },
  value_lable: { borderRadius: "0", cornerSize: "0%" },
  track: {
    color: "#000",
  },
});

const List = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const { isLoading: isFlightLoaded, flights } = useSelector(selectFlights);
  const { isLoading: isBusLoaded, buses } = useSelector(selectBuses);
  const { isLoading: isTrainLoaded, trains } = useSelector(selectTrains);

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

  const [selectedPrice, setSelectedPrice] = useState([1, 20000]);
  const [resultsFound, SetResultsFound] = useState(true);

  React.useEffect(() => {
    window.addEventListener("load", () => {
      // console.log("reloaded");
      navigate("/");
    });
    return () => {
      window.removeEventListener("load", () => {
        // console.log("reloaded");
        navigate("/");
      });
    };
  }, []);

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
    // console.log(minPrice, maxPrice, window.location.pathname);
    // setResultsFound(true);
    switch (window.location.pathname) {
      case "/flights":
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

  useEffect(() => {
    let fromDate = convertDate(date[0].startDate);
    let toDate = convertDate(date[0].endDate);
    let minPrice = selectedPrice[0],
      maxPrice = selectedPrice[1];
    // console.log("at effect");
    switch (window.location.pathname) {
      case "/flights":
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
      {console.log("Loading", isLoading)}{" "}
      {/* {isLoaded ? (
        <Loader />
      ) : ( */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
                          layout_width="wrap_content"
                          layout_height="wrap_content"
                          layout_gravity="center"
                          labelBehavior="withinBounds"
                          value_lable="@style/tooltip"
                          classes={{
                            thumb: classes.thumb,
                            rail: classes.rail,
                            track: classes.track,
                            value_lable: classes.value_lable,
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

              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="listResult">
              {isLoading ? (
                <>
                  {console.log("loading")} <EmptyView />
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
      </motion.div>
      {/* )}{" "} */}
    </>
  );
};

export default List;
