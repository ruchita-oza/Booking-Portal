import React from 'react'
import './searchItem.css'

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cutewallpaper.org/24/airplanes-cartoon/airplane-animation-by-matheus-didier-on-dribbble-animation-motion-design-animation-motion-graphics-design.gif"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Indigo</h1>
        <span className="siDistance">6E-2519</span>
        <span className="siTaxiOp">View Fares</span>
        <span className="siSubtitle">
          Source to Destination
        </span>
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
  )
}

export default SearchItem