import "./footer.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter, faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons";



const Footer = () => {
  return (
    // <div className="footer-container">
    //   <section className="footer-subscription">
    //     <p className="footer-subscription-heading">
    //       <i className="fas fa-copyright"></i>Booking Portal
    //       <br />
    //     </p>
       
    //     <div className="input-areas">          
    //       <p className="col-md-4 footer-subscription-text">
    //         Hetvee Sakaria            
    //       </p>  
    //       <FontAwesomeIcon icon={faInstagram} />                   
    //     </div>
    //     &emsp;
    //     {/* <div className="col-md-4 input-areas">          
    //       <p className="footer-subscription-text">
    //         Hetvee sakaria  
    //         <FontAwesomeIcon icon={faInstagram} />           
    //       </p>          
    //     </div>
    //     &emsp;
    //     <div className="col-md-4 input-areas">          
    //       <p className="footer-subscription-text">
    //         Hetvee sakaria  
    //         <FontAwesomeIcon icon={faInstagram} />           
    //       </p>          
    //     </div>
    //     &emsp; */}
    //   </section>
    // </div>
    <footer>
      <div className="footer-container">
        <h3> BOOKING PORTAL </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam minus doloribus labore neque odit?</p>
        <ul className="socials">
          <li><a href="/#"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="/#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="/#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="/#"><FontAwesomeIcon icon={faGoogle} /></a></li>          
          <li><a href="/#"><FontAwesomeIcon icon={faYoutube} /></a></li>          
        </ul>
      </div>
      <div className="footer-bottom">
        <p>Hetvee Sakaria &emsp; Ruchita Oza &emsp; Rikin Chauhan &emsp; -2022</p>
      </div>
    </footer>
  );
};

export default Footer;
