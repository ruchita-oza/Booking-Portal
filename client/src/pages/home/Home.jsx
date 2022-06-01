import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";
import Transport from "../../components/transport/Transport";
import Footer from "../../components/footer/Footer";
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
  const { loading, error, buses } = useSelector(
    (state) => state.busesAvailable
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getFlightSchedules());
    dispatch(getBusSchedules());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="homeContainer">
            <Transport />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
