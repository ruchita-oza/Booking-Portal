import React from "react";
import "./searchItem.css";
import toast from "react-hot-toast";
import bus from "../../images/bus.gif";
import train from "../../images/train.gif";
import { useLocation } from "react-router-dom";

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
  if (data.departure_time) {
    var dept_date = data?.departure_time.split("T")[0];
    var dept_time = data?.departure_time.split("T")[1].split(".")[0];
    var arrival_date = data?.arrival_time.split("T")[0];
    var arrival_time = data?.arrival_time.split("T")[1].split(".")[0];
  } // console.log(dept_time);
  return (
    <>
      <div className="searchItem">
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
            {window.location.pathname === "/buses"
              ? data?.bus_id
              : window.location.pathname === "/flights"
              ? data?.flight_id
              : data.train_id}
            {/* {data?.bus_id} */}
          </span>
          <span className="siDistance">
            {" "}
            {window.location.pathname === "/buses"
              ? data?.bus_detail.bus_type
              : window.location.pathname === "/flights"
              ? data?.flight_detail.flight_type
              : data.train_detail.train_type}
          </span>
          {/* <span className="siTaxiOp">View Fares</span> */}
          <span className="siSubtitle">Source to Destination</span>
          <span className="siFeatures">
            {data?.source} to {data?.destination}{" "}
          </span>
          <span className="siSubtitle">Date and Time</span>
          <span className="siFeatures">
            {dept_time ? `${dept_date}  ${dept_time}` : "Start"}
          </span>

          <span className="siFeatures">To</span>
          <span className="siFeatures">
            {arrival_time ? `${arrival_date}  ${arrival_time}` : "End"}
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
      </div>

      {/* <div className="searchItem">
        <img
          src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">Go Daddy</h1>
          <span className="siDistance">6E-2519</span>
          <span className="siTaxiOp">View Fares</span>
          <span className="siSubtitle">Source to Destination</span>
          <span className="siFeatures">
            New Delhi to Mumbai (21:15 - 08:35)
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$112</span>
            <span className="siFlight">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img
          src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">Go Daddy</h1>
          <span className="siDistance">6E-2519</span>
          <span className="siTaxiOp">View Fares</span>
          <span className="siSubtitle">Source to Destination</span>
          <span className="siFeatures">
            New Delhi to Mumbai (21:15 - 08:35)
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$112</span>
            <span className="siFlight">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div> */}
      {/* 
      <div className="searchItem">
        <img
          src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">Go Daddy</h1>
          <span className="siDistance">6E-2519</span>
          <span className="siTaxiOp">View Fares</span>
          <span className="siSubtitle">Source to Destination</span>
          <span className="siFeatures">
            New Delhi to Mumbai (21:15 - 08:35)
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">$112</span>
            <span className="siFlight">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SearchItem;
