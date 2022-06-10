import React, {useState, useEffect}from "react";
import {useDispatch } from "react-redux";
import {getCityApi} from "../../services/CityServices";
import "./transport.css";
import goa from "../../images/india/goa.png";
import delhi from "../../images/india/delhi.png";
import Bangalore from "../../images/india/Bangalore.png";
import Lonavala from "../../images/india/Lonavala.png";


const Transport = () => {
  
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);
  const [sources, setSources] = useState(null);
  const [destination, setDestination] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);       
         
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const fetchData = () => {
    console.log('Fetching data');
    dispatch(
      getCityApi(
        {
          destination
        },
      )
    );
  }

  useEffect (() => {
    dispatch(
      getCityApi(
        {
          destination
        },
      )
    );
  }, [dispatch, destination]);

  const handleSearch = () => {
    fetchData();
  };


  return (
    <div>
      <div className="row">
        <h1 align="left">Popular Cities</h1>
      </div>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..."  onClick={getLocation} />
                <div class="card-body">
                  <p>{status}</p>
                  {latitude && <p>Latitude: {latitude}</p>}
                  {longitude && <p>Longitude: {longitude}</p>}
                  <h5 class="card-title">{destination}</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of india</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Cpital of Gujarat</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Banglore - The IT Industry</h5>                  
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Goa - Tourist Place</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of India</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Cpital of Gujarat</h5>                                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Banglore - The IT Industry</h5>                                  
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Goa - Tourist Place</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of India</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Capital of Gujarat</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Bagnlore - The IT Industry</h5>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div className="row">
        <h1>Nearby  Cities</h1>
      </div>
      <div id="carouselExampleControlsNearbyCities" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Goa - Tourist Place</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of india</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Cpital of Gujarat</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Banglore - The IT Industry</h5>                  
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Goa - Tourist Place</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of India</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Cpital of Gujarat</h5>                                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Banglore - The IT Industry</h5>                                  
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="cards-wrapper">
              <div class="card">
                <img src={goa} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Goa - Tourist Place</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={delhi} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Delhi - Capital of India</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Lonavala} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Gandhinagar - Capital of Gujarat</h5>                  
                </div>
              </div>
              <div class="card d-none d-md-block">
                <img src={Bangalore} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Bagnlore - The IT Industry</h5>                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControlsNearbyCities" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControlsNearbyCities" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Transport;
