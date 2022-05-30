import "./footer.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Footer = () => {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          <i className="fas fa-copyright"></i>Booking Portal
          <i className="fas fa-envelope"></i>
          <br />
        </p>

          <div className="footerListItem">
            <FontAwesomeIcon icon="fa-brands fa-instagram-square" />
          </div>
       
        <div className="input-areas">          
          <p className="footer-subscription-text">
            Hetvee sakaria &emsp; Ruchita Oza &emsp; Rikin Chauhan           
          </p>
          
        </div>
      </section>
    </div>
  );
};

export default Footer;
