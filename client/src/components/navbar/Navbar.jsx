import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { faPlane, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectUser } from "../../redux/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { loggingOutUserThunkAction } from "../../redux/users/actions";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const { loggedInUser } = useSelector(selectUser);
  // console.log(user);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loggingOutUserThunkAction());
  };

  function doChanges(newtype) {
    props.changeType(newtype);

    if (window.location.pathname !== "/") {
      navigate(`/${newtype}`, {
        state: {
          source: location.state.source,
          destination: location.state.destination,
          date: location.state.date,
          options: location.state.options,
        },
      });
    }
  }

  return (
    <>
      <div>
        <div className="navbar">
          <div className="navContainer">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo" style={{ color: "white" }}>
                Skyline booking
              </span>
            </Link>
            <div className="navItems">
              {!loggedInUser && (
                <>
                  <Link to="/auth/register">
                    <button className="navButton">Register</button>
                  </Link>
                  <Link to="/auth/login">
                    <button className="navButton">Login</button>
                  </Link>
                </>
              )}
              {loggedInUser && (
                <Link onClick={handleLogout} to="/">
                  <button className="navButton">Logout</button>
                </Link>
              )}
              {loggedInUser && (
                <Link to="/userProfile">
                  <button className="navButton">User Profile</button>
                </Link>
              )}{loggedInUser?.is_admin==="Admin" && (
                <Link to="/admin/transportDetailAndSchedule">
                  <button className="navButton">Trasnport</button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="header">
          <div className="headerContainer listMode">
            <div className="headerList">
              <div
                className={
                  props.type === "flights"
                    ? "headerListItem active"
                    : "headerListItem "
                }
                onClick={() => doChanges("flights")}
              >
                <FontAwesomeIcon icon={faPlane} />
                <span>Flight</span>
              </div>
              <div
                className={
                  props.type === "buses"
                    ? "headerListItem active"
                    : "headerListItem "
                }
                onClick={() => {
                  doChanges("buses");
                }}
              >
                <FontAwesomeIcon icon={faBus} />
                <span>Bus</span>
              </div>
              <div
                className={
                  props.type === "trains"
                    ? "headerListItem active"
                    : "headerListItem "
                }
                onClick={() => {
                  doChanges("trains");
                }}
              >
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
