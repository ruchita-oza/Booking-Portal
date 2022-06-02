import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import React from "react";
import AuthPage from "./pages/authPage/authPage";
import ErrorPage from "./pages/errorPage/errorPage";
// import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import BusList from "./pages/BusList/busList";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer positive="top-right" autoClose={1500} />

      <Navbar>
        <Route path="/authPage" element={<AuthPage />} />
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<List />} />
        <Route path="/flights/:id" element={<Flight />} />
        <Route path="/authPage" element={<AuthPage />} />
        <Route path="/BusList" element={<BusList />} />
        <Route component={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
