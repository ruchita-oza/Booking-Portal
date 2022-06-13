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
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/userProfile/UserProfile";
import Transport from "./pages/transportDetails/Transport";
// import "./App.css";
import { AnimatePresence } from "framer-motion";

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
            <Route path="/fligh ts/:id" element={<Flight />} />
            <Route path="/auth" element={<AuthRoute />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>
            {/* <Route path="/admin">{routing} </Route> */}
            {/* <Route path="/authPage" element={<AuthPage />} /> */}
            <Route path="/buses" element={<List />} />
            <Route path="/buses/:id" element={<Buses />} />
            <Route path="/trains" element={<List />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/transportDetailAndSchedule" element={<Transport />} />
            <Route path="" element={<ErrorPage />} />

            {/* <Route component={ErrorPage} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
