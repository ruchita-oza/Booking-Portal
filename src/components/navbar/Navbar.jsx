import "./navbar.css"
import React from 'react';

const Navbar = () => {
  return (
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
  )
}

export default Navbar