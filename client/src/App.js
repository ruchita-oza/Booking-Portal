import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import Footer from "./components/footer/Footer";
import React, {useState} from "react";
import AuthPage from "./pages/authPage/authPage";
import ErrorPage from "./pages/errorPage/errorPage";
// import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Buses from "./pages/buses/Buses";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [category, setCategory] = useState('flights');

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  }

  return (
    <BrowserRouter>
      <Navbar changeType={changeCategory} type={category} />
      <ToastContainer positive="top-right" autoClose={1500} />
      <Routes>
        <Route path="/authPage" element={<AuthPage />} />
        <Route path="/" element={<Home type={category} />} />
        <Route path="/flights" element={<List />} />
        <Route path="/flights/:id" element={<Flight />} />
        <Route path="/authPage" element={<AuthPage />} />
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
