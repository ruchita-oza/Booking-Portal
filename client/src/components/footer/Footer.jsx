import "./footer.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faGoogle,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <h3> BOOKING PORTAL </h3>
        <p>
          Enjoy your Journey through the best booking deals and service and even
          with the cheapest rates....!
        </p>
        <ul className="socials">
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
          </li>
          <li>
            <a href="/#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          Hetvee Sakaria &emsp; Ruchita Oza &emsp; Rikin Chauhan &emsp;{" "}
          <FontAwesomeIcon icon={faCopyright} /> 2022
        </p>
      </div>
    </footer>
  );
};

export default Footer;
