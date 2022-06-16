import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";
import Transport from "../../components/transport/Transport";
import { faPlane, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";

import "./home.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader/loader";
import { selectUser } from "../../redux/users/selectors";

const Home = ({ type }) => {
  const { isLoading } = useSelector(selectUser);
  const [source, setSource] = useState();
  const [destination, setDestination] = useState("");
  const [currentState, setCurrentState] = useState("");

  // Step 2: Get city name
  function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.17d0cbca19dd9c109e5d5f13ede954be&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        setSource(city);
        return city;
      }
    }
  }

  // get state name
  async function getStates() {
    let url = "https://ipinfo.io/json?token=779eae9e88d5b2";
    let response = await fetch(url);
    let data = await response.json();
    setCurrentState(data.region);
  }
  getStates();

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      getCity(coordinates);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`); 
      switch (err.code) {
        case err.PERMISSION_DENIED:
          alert("You denied the request for Geolocation.");
          document.getElementById('nearbyCities').classList.add('d-none')
          break;

        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          document.getElementById('nearbyCities').classList.add('d-none')
          break;

        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          document.getElementById('nearbyCities').classList.add('d-none')
          break;

        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          document.getElementById('nearbyCities').classList.add('d-none')
          break;

        default:
      }
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=''>
          {type === "flights" && (
            <Header
              type={type}
              heading={"Introducting Skyline Booking...! It's A Genius"}
              description={
                "Explore for your travels with a free Skyline booking account"
              }
              icon={faPlane}
              source={source}
              setSource={setSource}
              destination={destination}
              setDestination={setDestination}
            />
          )}
          {type === "buses" && (
            <Header
              type={type}
              heading={"Introducting Busline Booking...! It's A Genius"}
              description={
                "Explore for your travels with a free Busline booking account"
              }
              icon={faBus}
              source={source}
              setSource={setSource}
              destination={destination}
              setDestination={setDestination}
            />
          )}
          {type === "trains" && (
            <Header
              type={type}
              heading={"Introducting Railwayline Booking...! It's A Genius"}
              description={
                "Explore for your travels with a free Railwayline booking account"
              }
              icon={faTrain}
              source={source}
              setSource={setSource}
              destination={destination}
              setDestination={setDestination}
            />
          )}
          <div className='homeContainer'>
            <Transport
              source={source}
              destination={destination}
              setDestination={setDestination}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
