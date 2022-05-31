import "./navbar.css";
import React from "react";
import { faPlane, faBus, faTrain} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">Skyline booking</span>
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
            <button className="navButton">Logout</button>
            <button className="navButton">User Profile</button>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="headerContainer listMode">
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
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
  );
};

export default Navbar;
