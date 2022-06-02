import "./navbar.css";
import React from "react";
import { Link } from 'react-router-dom';
import {faPlane, faBus, faTrain,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {

 

  return (
    <>   
    
     <div>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/">
            <span className="logo" style={{color: "white"}}>Skyline booking</span>
          </Link>          
          <div className="navItems">
            <Link to="/authPage">
              <button className="navButton">Register</button>
              <button className="navButton">Login</button>
            </Link>  
            <Link to="/">
              <button className="navButton">Logout</button>
            </Link>
            <Link to="/userProfile">
              <button className="navButton">User Profile</button>
            </Link>      
          </div>
        </div>
      </div>
      <div className="header">
        <div className="headerContainer listMode">
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flight</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBus} />
              <span>Bus</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTrain} />
              <span>Train</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Navbar;
