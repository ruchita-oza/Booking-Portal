import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./header.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/users/selectors";
import { useSelector } from "react-redux";

const Header = (props) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { loggedInUser } = useSelector(selectUser);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    person: 1,
  });

  const navigate = useNavigate();

  // console.log(props.heading);
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = (name, operation) => {
    navigate(`/${props.type}`, {
      state: { source, destination, date, options },
    });
  };

  return (
    <div className="header">
      <div
        className={
          props.type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {props.type !== "list" && (
          <>
            <h1 className="headerTitle pl-5">{props.heading}</h1>
            <p className="headerDesc pl-5">{props.description}</p>
            {!loggedInUser && (
              <Link to="/auth/login" className="pl-5">
                <button className="headerBtn"> Sign in / Register </button>
              </Link>
            )}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={props.icon} className="m-2 headerIcon" />
                <input
                  type="text"
                  placeholder="Source"
                  className="headerSearchInput"
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="Destination"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {" "}
                  {format(date[0]?.startDate, "MM/dd/yyyy")} to{" "}
                  {format(date[0]?.endDate, "MM/dd/yyyy")}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInput={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >
                  {`${options.person} Person`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Person</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.person <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("person", "d")}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span className="optionCounterNumber">
                          {options.person}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("person", "i")}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
