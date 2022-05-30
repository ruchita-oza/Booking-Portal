import { faPlane, faBus, faTrain, faCalendarDays, faPerson} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {format} from "date-fns";
import { DateRange } from 'react-date-range';
import {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./header.css";
import React from 'react';

const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    }
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,    
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (    
      <div className="header"> 
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
          <div className="headerList">          
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faPlane}/>
              <span>Flights</span>
            </div>    
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBus}/>
              <span>Bus</span>
            </div>    
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTrain}/>
              <span>Train</span>
            </div>            
          </div>     
          { type !== "list" && (
            <>
              <h1 className="headerTitle">
              Introducing Skyline Booking...! It's A Genius
              </h1>        

              <p className="headerDesc">
                Explore for your travels with a free Skyline booking account.
              </p>
              <button className="headerBtn"> Sign in / Register </button>   
              
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPlane} className="headerIcon" />  
                  <input 
                    type="text" 
                    placeholder="Where are you going ?"
                    className="headerSearchInput"/>
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />  
                  <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                    {/* {`
                        ${format(date[0].startDate, "MM/dd/yyyy")} 
                        to 
                        ${format(date[0].endDate, "MM/dd/yyyy")}
                    `} */}
                  </span>
                  {openDate && (
                    <DateRange editableDateInput={true} 
                    onChange={item => setDate([item.selection])} 
                    moveRangeOnFirstSelection={false} 
                    ranges={date} className="date" minDate={new Date()}/>
                  )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />  
                  <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                    {`${options.adult} adult · ${options.children} children`}
                  </span>
                  {openOptions && (<div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")} > - </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")} > + </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")} > - </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")} > + </button>
                      </div>
                    </div>
                  </div>)}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn">Search</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>        
  );
};

export default Header