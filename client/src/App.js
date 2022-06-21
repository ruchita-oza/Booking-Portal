import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { refreshState, refreshStateRequest } from "./redux/users/actions";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import ErrorPage from "./pages/errorPage/errorPage";
import Buses from "./pages/buses/Buses";
import Login from "./pages/authPage/login";
import Register from "./pages/authPage/register";
import AuthRoute from "./pages/authPage/AuthRoute";
import UserPrivateRoute from "./components/PrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "./components/PrivateRoute/AdminPrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/userProfile/UserProfile";
import UserBooking from "./pages/userProfile/UserBooking";
import BookingPage from "./pages/bookingPage/BookingPage";
import Transport from "./pages/transportDetails/Transport";
import BusList from "./admin/pages/Bus/Buses";
import AdminDashboard from "./admin/pages/AdminDashboard/AdminDashboard";
import TrainList from "./admin/pages/Train/Trains";
import FlightList from "./admin/pages/Flight/Flights";
import UserListing from "./admin/pages/user/userListing";
import { AnimatePresence } from "framer-motion";
import EditTransport from "./pages/transportDetails/EditTransport";

function App() {
  const dispatch = useDispatch();
  const refreshStateHandler = () => {
    dispatch(refreshStateRequest());
    const user = JSON.parse(localStorage.getItem("user")) || null;
    dispatch(refreshState({ user }));
  };
  useEffect(() => {
    refreshStateHandler();
  }, []);
  const [category, setCategory] = useState("flights");
  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar changeType={changeCategory} type={category} />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home type={category} />} />
            <Route path="/flights" element={<List />} />
            <Route path="/flights/:id" element={<Flight />} />
            <Route path="/buses" element={<List />} />
            <Route path="/buses/:id" element={<Buses />} />
            <Route path="/trains" element={<List />} />
            <Route path="/userProfile" element={<UserPrivateRoute />}>
              <Route path="" element={<UserProfile />} />
              <Route path="Bookings/:id" element={<UserBooking />} />
            </Route>
            <Route path=":transport_type/book/:id" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPrivateRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="transportDetailAndSchedule"
                element={<Transport />}
              />
              <Route
                path="editTransportDetailAndSchedule/:transportId"
                element={<EditTransport />}
              />
              <Route path="busList" element={<BusList />} />
              <Route path="trainList" element={<TrainList />} />
              <Route path="flightList" element={<FlightList />} />
              <Route path="userList" element={<UserListing />} />
            </Route>
            <Route path="/auth" element={<AuthRoute />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>

            <Route path="" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
