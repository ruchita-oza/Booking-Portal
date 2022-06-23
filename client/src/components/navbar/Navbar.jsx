import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { faPlane, faBus, faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectUser } from "../../redux/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { loggingOutUserThunkAction } from "../../redux/users/actions";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
  Typography,
  IconButton,
} from "@mui/material";

const Navbar = (props) => {
  const userMenu = [
    { label: "Home", link: "/" },
    { label: "Profile", link: "/userProfile" },
    { label: "Logout", link: "/" },
    // { label: "Add Transport", link: "/admin/transportDetailAndSchedule" },
  ];

  const adminMenu = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/admin/dashboard " },
    { label: "Users List", link: "/admin/userList " },
    { label: "Add Transport", link: "/admin/transportDetailAndSchedule" },
    // {
    // label: "Edit Transport",
    // link: "/admin/editTransportDetailAndSchedule/GJ06XC1901",
    // link: "/admin/editTransportDetailAndSchedule/E6-658",
    // link: "/admin/editTransportDetailAndSchedule/13001",
    // },
    // { label: "Bus List", link: "/admin/busList" },
    // { label: "Flight List", link: "/admin/flightList" },
    // { label: "Train List", link: "/admin/trainList" },
    {
      label: "View Transport",
      link: "/admin/transportDetailsAndScheduleListing",
    },
    { label: "Logout", link: "/" },
  ];

  const { loggedInUser } = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isAdmin = loggedInUser?.is_admin === "Admin" ? true : false;
  // console.log("from navbar isAdmin : ", loggedInUser?.is_admin);

  const userInitials =
    loggedInUser?.first_name?.charAt(0).toUpperCase() +
    loggedInUser?.last_name?.charAt(0).toUpperCase();

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(loggingOutUserThunkAction());
  };

  const isAdminPage = window.location.pathname.split("/").includes("admin");

  // const isBusListPage = window.location.pathname.split("/").includes("busList");

  // const isTrainListPage = window.location.pathname
  //   .split("/")
  //   .includes("trainList");

  // const isFlightListPage = window.location.pathname
  //   .split("/")
  //   .includes("flightList");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const firstPath = window.location.pathname.split("/")[1];

  // console.log("firstPath : ", firstPath);

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
              {loggedInUser ? (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open Menu">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: "#2196f3" }}>
                          <b>{userInitials}</b>
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {isAdmin ? (
                        <>
                          {adminMenu.map((setting) => (
                            <MenuItem
                              key={setting.label}
                              onClick={handleCloseUserMenu}
                            >
                              {setting.label === "Logout" ? (
                                <>
                                  <Link
                                    onClick={handleLogout}
                                    to={setting.link}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <Typography textAlign="center">
                                      {setting.label}
                                    </Typography>
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to={setting.link}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <Typography textAlign="center">
                                      {setting.label}
                                    </Typography>
                                  </Link>
                                </>
                              )}
                            </MenuItem>
                          ))}
                        </>
                      ) : (
                        <>
                          {userMenu.map((setting) => (
                            <MenuItem
                              key={setting.label}
                              onClick={handleCloseUserMenu}
                            >
                              {setting.label === "Logout" ? (
                                <>
                                  <Link
                                    to={setting.link}
                                    style={{ textDecoration: "none" }}
                                    onClick={handleLogout}
                                  >
                                    <Typography textAlign="center">
                                      {setting.label}
                                    </Typography>
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to={setting.link}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <Typography textAlign="center">
                                      {setting.label}
                                    </Typography>
                                  </Link>
                                </>
                              )}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  <Link to="/auth/register">
                    <button className="navButton">Register</button>
                  </Link>
                  <Link to="/auth/login">
                    <button className="navButton">Login</button>
                  </Link>
                </>
              )}
              {/* {!loggedInUser && (
            <div className='navItems'>
              {!loggedInUser && (
                <>
                  <Link to='/auth/register'>
                    <button className='navButton'>Register</button>
                  </Link>
                  <Link to='/auth/login'>
                    <button className='navButton'>Login</button>
                  </Link>
                </>
              )}
              {!loggedInUser}
              {loggedInUser && (
                <Link onClick={handleLogout} to='/'>
                  <button className='navButton'>Logout</button>
                </Link>
              )}
              {loggedInUser && (

                <Link to="/userProfile">
                  <button className="navButton">User Profile</button>
                </Link>
              )}
              {loggedInUser?.is_admin === "Admin" && (
                <Link to="/admin/transportDetailAndSchedule">
                  <button className="navButton">Add Transport</button>
                </Link>
              )} */}
            </div>
          </div>
        </div>
        {firstPath === "" ||
        firstPath === "buses" ||
        firstPath === "flights" ||
        firstPath === "trains" ? (
          // <>
          //   {firstPath === "" ||
          //   firstPath === "buses" ||
          //   firstPath === "flights" ||
          //   firstPath === "trains" ? (
          <>
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
          </>
        ) : (
          // )
          //  : (
          // )}
          <div className="addTransportPageHeader"></div>
        )}
        {/* <Link to='/userProfile'>
                  <button className='navButton'>User Profile</button>
                </Link> */}

        {/* {loggedInUser?.is_admin === "Admin" && (
                <>
                  <Link to='/admin/transportDetailAndSchedule'>
                    <button className='navButton'>Trasnport</button>
                  </Link>
                  <Link to='/admin/busList'>
                    <button className='navButton'>Bus List</button>
                  </Link>
                  <Link to='/admin/flightList'>
                    <button className='navButton'>Flight List</button>
                  </Link>
                  <Link to='/admin/trainList'>
                    <button className='navButton'>Train List</button>
                  </Link>
                </>
              )} */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/**/}
      </div>
    </>
  );
};

export default Navbar;
