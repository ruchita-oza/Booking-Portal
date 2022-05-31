import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import React from "react";
import AuthPage from "./pages/authPage/authPage";
import ErrorPage from "./components/errorPage/errorPage";
// import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Route path="/authPage" element={<AuthPage />} />
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<List />} />
        <Route path="/flights/:id" element={<Flight />} />
        <Route path="/authPage" element={<AuthPage />} />
        <Route component={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
