import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";
import Transport from "../../components/transport/Transport";
import "./home.css";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getFlightSchedules } from "../../redux/actions/flightAction";
import { getBusSchedules } from "../../redux/actions/busAction";
import Loader from "../../components/loader/loader";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.busesAvailable
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getFlightSchedules());
    dispatch(getBusSchedules());
  }, [alert, dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="" style={{height:"100vh"}}>
          <Header />
          <div className="homeContainer">
            <Transport />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
