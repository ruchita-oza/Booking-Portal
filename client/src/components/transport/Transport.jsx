import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./transport.css";

import one from "../../images/india/1.png";
import two from "../../images/india/2.png";
import three from "../../images/india/3.png";
import four from "../../images/india/4.png";
import five from "../../images/india/5.png";

const Transport = ({ source, destination, setDestination }) => {
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [isDestinationSelected, setIsDestinationSelected] = useState(false);

  async function getStates() {
    let url = "https://ipinfo.io/json?token=779eae9e88d5b2";
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    setState(data.region);
    // console.log(state);
  }
  getStates();

  const navigate = useNavigate();

  const handleSearch = (name, operation) => {
    navigate(`/flights`, {
      state: { source, destination },
    });
  };

  useEffect(() => {
    if (state) {
      const getCity = async () => {
        const res = await fetch(`/city?state_name=${state}`);
        const getdata = await res.json();
        setCity(getdata.cities.rows);
        console.log(getdata);
      };
      getCity();
    }
  }, [state]);

  useEffect(() => {
    if (isDestinationSelected) {
      handleSearch();
      setIsDestinationSelected(false);
    }
  }, [isDestinationSelected]);

  const renderCityCarouselItem = (index) => {
    if (index < city.length) {
      const data = city[index];
      let cardClass = index % 5 === 0 ? "card" : "card d-none d-md-block";
      return (
        <div className={cardClass} key={data?.id}>
          <img
            id='img-id'
            src={
              index % 5 === 0
                ? one
                : index % 5 === 1
                ? two
                : index % 5 === 2
                ? three
                : index % 5 === 3
                ? four
                : five
            }
            className='card-img-top'
            alt='...'
            onClick={() => {
              setDestination(data?.city_name);
            }}
          />

          <div className='card-body'>
            <h5 className='card-title'>{data?.city_name}</h5>
          </div>
        </div>
      );
    }
  };

  const renderCityCarousel = () => {
    if (!city.length) {
      return <div></div>;
    }
    const items = [];
    console.log("length = ");
    console.log(parseInt(city.length / 5));
    let length = parseInt(city.length / 5) * 5;
    for (let i = 0; i < length; i += 5) {
      items.push(
        <div className={`carousel-item ${(i === 0 && "active") || ""}`}>
          <div className='cards-wrapper'>
            {renderCityCarouselItem(i)}
            {renderCityCarouselItem(i + 1)}
            {renderCityCarouselItem(i + 2)}
            {renderCityCarouselItem(i + 3)}
            {renderCityCarouselItem(i + 4)}
          </div>
        </div>
      );
    }
    return items;
  };

  return (
    <div className='transport'>
      <div className='row'>
        <h1 align='left'>Popular Cities</h1>
      </div>
      <div
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='cards-wrapper'>
              <div className='card'>
                <img
                  src="https://images.unsplash.com/photo-1606240639706-dbd343433c32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80"
                  className='card-img-top'
                  alt='...'
                  onClick={() => {
                    setDestination("Goa");
                    setIsDestinationSelected(true);
                  }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>Goa - The Tourist Place</h5>
                </div>
              </div>

              <div className='card d-none d-md-block'>
                <img
                  src="https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1314&q=80"
                  className='card-img-top'
                  alt='...'
                  onClick={() => {
                    setDestination("Delhi");
                    setIsDestinationSelected(true);
                  }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>Delhi - Capital of india</h5>
                </div>
              </div>
              <div className='card d-none d-md-block'>
                <img
                  src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbmRoaW5hZ2FyJTIwZ2lmdCUyMGNpdHklMjAxJTNBMXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  className='card-img-top'
                  alt='...'
                  onClick={() => {
                    setDestination("Gandhinagar");
                    setIsDestinationSelected(true);
                  }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>
                    Gandhinagar - Capital of Gujarat
                  </h5>
                </div>
              </div>
              <div className='card d-none d-md-block'>
                <img
                  src="https://images.unsplash.com/photo-1635227408430-1025bbff13b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZ2xvcmUlMjBjb2l0eSUyMDElM0ExfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className='card-img-top'
                  alt='...'
                  onClick={() => {
                    setDestination("Banglore");
                    setIsDestinationSelected(true);
                  }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>Banglore - The IT Industry</h5>
                </div>
              </div>
              <div className='card d-none d-md-block'>
                <img
                  src="https://images.unsplash.com/photo-1518930259200-3e5b29f42096?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bXVtYmFpJTIwZmlsbSUyMGluZHVzdHJ5MSUzQTF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  className='card-img-top'
                  alt='...'
                  onClick={() => {
                    setDestination("Mumbai");
                    setIsDestinationSelected(true);
                  }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>Mumbai - The Film Industry</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className='carousel-control-prev'
          href='#carouselExampleControls'
          role='button'
          data-slide='prev'>
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='carousel-control-next'
          href='#carouselExampleControls'
          role='button'
          data-slide='next'>
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'></span>
          <span className='sr-only'>Next</span>
        </a>
      </div>
      <br></br>
      <br />
      {/* {{}} */}
      <div id='nearbyCities'>
        <div className='row'>
          <h1>Nearby Cities</h1>
        </div>
        <div
          id='carouselExampleControlsNearbyCities'
          className='carousel slide'
          ride='carousel'>
          <div className='carousel-inner'>
            {(city && renderCityCarousel()) || null}
          </div>
          <a
            className='carousel-control-prev'
            href='#carouselExampleControlsNearbyCities'
            role='button'
            data-slide='prev'>
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'></span>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#carouselExampleControlsNearbyCities'
            role='button'
            data-slide='next'>
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'></span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Transport;
