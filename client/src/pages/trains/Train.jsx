import React from 'react'
import './train.css'
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Train = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Header type="list" />
      <div className="trainContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="trainWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="trainTitle">Indigo</h1>
          <div className="trainAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Indira Gandhi International Aiport</span>
          </div>
          <span className="trainClass">
            Class Avaialible – Business / Economy Class Avaialible
          </span>
          <span className="trainPriceHighlight">
            Book your seat and enjoy thw ride with the IndiGo Airlines 
          </span>
          <div className="trainImages">
            {photos.map((photo, i) => (
              <div className="trainImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="trainImg"
                />
              </div>
            ))}
          </div>
          <div className="trainDetails">
            <div className="trainDetailsTexts">
              <h1 className="trainTitle">About Indigo</h1>
              <p className="trainDesc">
                IndiGo with its headquarters in Gurgaon, Haryana, is a low-cost 
                carrier in the country. In terms of passengers and fleet size, IndiGo airlines is the largest airline domestically. 
                About 1500 IndiGo trains operate everyday across 63 domestic and 
                24 international destinations, with its hub being New Delhi’s Indira Gandhi International Airport.                 

                <br></br>

                You can make IndiGo train booking on a destination you wish to travel to on Yatra. 
                IndiGo operates a fleet of Airbus A320-200, Airbus 320neo among a host of other Airbuses. 
                The airlines only offers economy-class seating and does 
                not offer any complimentary meals on-board, though you have the provision to buy one from the airline’s in-train menu.
              </p>
            </div>
          </div>
          <div className="trainDetailsPrice">
            <div className="row">
              <div className="col-md-6">
              </div>
              <div className="col-md-6">
                <h2>Indianapolis to Paris</h2>
                <h5>ONEWAY train</h5>
                <br></br>
                <div className="row">
                  <div className="col-md-6 align-center">
                    <span>
                      <label><b>TAKE OFF</b></label>
                      < br></br>
                      <span>13 NOV 2022, 7:50 AM </span>
                    </span>                  
                  </div>
                  <div className="col-md-6">                  
                    <span>
                      <label><b>LANDING</b></label>
                      <br></br>
                      <span> 13 NOV 2022, 7:50 AM </span>
                    </span>
                  </div>
                </div>  
                <br></br>  
                <div className="row">
                  <div className="col-md-6">
                    <h5>
                    <b> Business </b> Rs 45000
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <h5>
                      <b> Economy </b> Rs 25000
                    </h5>
                  </div>
                  <button>Reserve or Book Now!</button>  
                </div>                            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
