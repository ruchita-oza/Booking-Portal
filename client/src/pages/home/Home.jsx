import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";
import Transport from "../../components/transport/Transport";
import { faPlane, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";

import "./home.css";
import React from "react";
import IndiaList from "../../components/homeComponents/IndiaList/IndiaList";
// import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
// import { getFlightSchedules } from "../../redux/flights/actions";
// import { getBusSchedules } from "../../redux/buses/actions";
import Loader from "../../components/loader/loader";
import { selectUser } from "../../redux/users/selectors";
const Home = ({ type }) => {
  // const alert = useAlert();
  // const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.busesAvailable);
  // useEffect(() => {
  //   if (error) {
  //     return alert.error(error);
  //   }

  //   // dispatch(getFlightSchedules());
  //   dispatch(getBusSchedules());
  // }, [alert, dispatch, error]);
  const { isLoading } = useSelector(selectUser);
  return (
    <>
      {console.log(isLoading)}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="" style={{ height: "100vh" }}>
          {type === "flights" && (
            <Header
              type={type}
              heading={"Introducting Skyline Booking...! It's A Genius"}
              description={
                "Explore for your travels with a free Skyline booking account"
              }
              icon={faPlane}
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
            />
          )}
          <div className="homeContainer">
            <Transport />
            <h1 className="homeTitle">Explore India</h1>
            <IndiaList />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
