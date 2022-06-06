import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import Footer from "./components/footer/Footer";
// import React, {useState} from "react";
//import AuthPage from "./pages/authPage/authPage";
import ErrorPage from "./pages/errorPage/errorPage";
// import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
// import { ToastContainer } from "react-toastify";
import Buses from "./pages/buses/Buses";
import "react-toastify/dist/ReactToastify.css";
// import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/authPage/login";
import Register from "./pages/authPage/register";
import AuthRoute from "./pages/authPage/AuthRoute";
// import AdminHome from "./pages/admin/home/AdminHome";
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
  }, []);
  // const routing = useRoutes(Themeroutes);

  const [category, setCategory] = useState("flights");

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <BrowserRouter>
      <Navbar changeType={changeCategory} type={category} />
      {/* <ToastContainer positive="top-right" autoClose={1500} /> */}
      <Routes>
        {/* <Route path="/authPage" element={<AuthPage />} /> */}
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

        <Route component={ErrorPage} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
