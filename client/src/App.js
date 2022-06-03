import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import ErrorPage from "./pages/errorPage/errorPage";
// import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import BusList from "./pages/BusList/busList";
import "react-toastify/dist/ReactToastify.css";
// import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/authPage/login";
import Register from "./pages/authPage/register";
import AuthRoute from "./pages/authPage/AuthRoute";
import { refreshState } from "./redux/users/actions";

function App() {
  const dispatch = useDispatch();

  // const [isSignUp, changeForm] = useState(false);
  const refreshStateHandler = () => {
    // const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")) || null;
    dispatch(refreshState({ user }));
  };
  useEffect(() => {
    refreshStateHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      {/* <ToastContainer positive="top-right" autoClose={1500} /> */}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<List />} />
        <Route path="/flights/:id" element={<Flight />} />
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route path="/BusList" element={<BusList />} />
        <Route path="/ErrorPage" element={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
