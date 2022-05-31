import Header from "../../components/header/Header";
// import Navbar from "../../components/navbar/Navbar";
import Transport from "../../components/transport/Transport";
import Footer from "../../components/footer/Footer";
import "./home.css";
import React from 'react';

const Home = () => {
  return (
    <div>
      
      <Header/>
      <div className="homeContainer">
        <Transport />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
