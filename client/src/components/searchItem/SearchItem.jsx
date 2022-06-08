import React from "react";
import "./searchItem.css";
import toast from "react-hot-toast";

const SearchItem = ({ data }) => {
  // console.log(data);
  const getCity = (cityId) => async () => {
    const data = await fetch(`city/${cityId}`);
    if (data) {
      return data.city_name;
    } else {
      toast.error(`can't find city ${cityId}`);
    }
  };
  const dept_time = data.departure_time.split("T")[1].split(".")[0];
  const arrival_time = data.arrival_time.split("T")[1].split(".")[0];
  console.log(dept_time);
  return (
    <>
      <div className="searchItem">
        <img
          src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{data.bus_detail.bus_name}</h1>
          <span className="siDistance">{data.bus_id}</span>
          <span className="siTaxiOp">View Fares</span>
          <span className="siSubtitle">Source to Destination</span>
          <span className="siFeatures">
            {data.source} to {data.destination} ({dept_time} - {arrival_time})
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>seats available</span>
            <button>{data.total_available_seats}</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">${data.price_per_seat}</span>
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
