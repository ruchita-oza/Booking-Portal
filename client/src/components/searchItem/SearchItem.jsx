import React from "react";
import "./searchItem.css";
import toast from "react-hot-toast";
import bus from "../../images/bus.gif";
import train from "../../images/train.gif";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";

const SearchItem = ({ data }) => {
  // console.log(data);
  // const getCity = (cityId) => async () => {
  //   const data = await fetch(`city/${cityId}`);
  //   if (data) {
  //     return data?.city_name;
  //   } else {
  //     toast.error(`can't find city ${cityId}`);
  //   }
  // };
  const location = useLocation();
  // console.log(data?.departure_time);
  const getMonth = (month) => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "none";
    }
  };
  if (data.departure_time) {
    // var date = DateTime.Parse(data.departure_time);
    console.log(data.departure_time);
    var dept_date = `${
      data?.departure_time.split("T")[0].split("-")[2]
    } ${getMonth(data?.departure_time.split("T")[0].split("-")[1])}`;
    var dept_time = `${
      data?.departure_time.split("T")[1].split(".")[0].split(":")[0]
    }:${data?.departure_time.split("T")[1].split(".")[0].split(":")[1]}`;
    var arrival_date = `${
      data?.arrival_time.split("T")[0].split("-")[2]
    } ${getMonth(data?.arrival_time.split("T")[0].split("-")[1])}`;
    var arrival_time = `${
      data?.arrival_time.split("T")[1].split(".")[0].split(":")[0]
    }:${data?.arrival_time.split("T")[1].split(".")[0].split(":")[1]}`;
  } // console.log(dept_time);
  return (
    <>
      <motion.div
        className="searchItem"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {window.location.pathname === "/buses" ? (
          <img src={bus} alt="" className="siImg" />
        ) : window.location.pathname === "/trains" ? (
          <img src={train} alt="" className="siImg" />
        ) : (
          <img
            src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
            alt=""
            className="siImg"
          />
        )}
        <div className="siDesc">
          <h1 className="siTitle">
            {window.location.pathname === "/buses"
              ? data?.bus_detail.bus_name
              : window.location.pathname === "/flights"
              ? data?.flight_detail.flight_name
              : data.train_detail.train_name}
          </h1>
          <span className="siDistance">
            <span>
              {window.location.pathname === "/buses"
                ? data?.bus_id
                : window.location.pathname === "/flights"
                ? data?.flight_id
                : data.train_id}
              {/* {data?.bus_id} */}
            </span>
            {" - "}
            <span>
              {" "}
              {window.location.pathname === "/buses"
                ? data?.bus_detail.bus_type
                : window.location.pathname === "/flights"
                ? data?.flight_detail.flight_type
                : data.train_detail.train_type}
            </span>
          </span>
          {/* <span className="siDistance"> </span> */}
          {/* <span className="siTaxiOp">View Fares</span> */}
          <span className="siSubtitle">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ marginRight: "10px" }}
            ></FontAwesomeIcon>
            <span className="siFeatures">
              {data?.source} to {data?.destination}{" "}
            </span>
          </span>
          <span className="siDateTime">
            <span className="siTime">
              <span className="siTimeInner">{dept_time}</span>
              <span className="siTimeInner"> {arrival_time}</span>
            </span>
            <span className="row">
              <span className="col-3"></span>
              <span className="siHoriLine col-6"></span>
              <span className="col-3"></span>
            </span>

            <span className="siDate">
              <span className="siDateInner">
                {dept_time ? `${dept_date} ` : "Start"}
              </span>
              <span className="siDateInner">
                {arrival_time ? `${arrival_date}` : "End"}
              </span>
            </span>
          </span>

          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>seats available</span> <span>:</span>
            <button>{data?.total_available_seats}</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">${data?.price_per_seat}</span>
            <span className="siFlight">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SearchItem;
