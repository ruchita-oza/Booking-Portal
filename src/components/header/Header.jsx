// import { faPlane} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import React from 'react';

const Header = () => {
  return (
    <div>
      <div className="header">      
        <div className="headerList">          
          <div className="headerListItem">
            {/* <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span> */}
          </div>          
        </div>        
      </div>
    </div>
  )
}

export default Header