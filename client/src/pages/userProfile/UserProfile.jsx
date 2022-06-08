import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";
import UsePut from "../../Utilities/UsePut";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { toast } from "react-hot-toast";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { refreshState } from "../../redux/users/actions";
import { fetchUserBookingRecordsDetailThunkAction } from "../../redux/users/actions";
import Loader from "../../components/loader/loader";
import ParseDate from "../../Utilities/ParseDate";

const axios = require("axios");
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Journey Details
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Journey Details
      </Typography>
      <Typography variant="body1">
        Journey Details
        <br />
        {'"vadodara to ahmedabad"'}
      </Typography>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </React.Fragment>
);

function UserProfile() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // useEffect(async () => {
  //   const user = JSON.parse(localStorage.getItem("user")) || null;
  //   dispatch(refreshState({ user }));
  //   // const response = await fetch("/user/" + userId, { method: "GET" });
  //   // // console.log("response : " + response);
  //   // let data1 = await response.json();
  //   // console.log("data1 : " + JSON.stringify(data1["data"]));
  //   // setUserDetails(data1["data"]);
  //   // console.log("user details : " + JSON.stringify(userDetails));
  // }, [dispatch]);
  // console.log(userDetails[0]["first_name"]);

  const onSuccess = () => {
    console.log("on success");
    // navigate("/");
  };

  const onError = (error) => {
    console.log("error occured", error);
  };

  const {
    loggedInUser: data,
    isLoading,
    bookingRecords: data1,
  } = useSelector(selectUser);

  useEffect(() => {
    setUserDetails(data);
    setBookingDetails(data1?.data);
    if (data) {
      dispatch(
        fetchUserBookingRecordsDetailThunkAction(data?.id, onError, onSuccess)
      );
    }
  }, [dispatch, data]);

  useEffect(() => {
    setBookingDetails(data1?.data);
  }, [data1]);
  // console.log("first name: " + data?.id);
  // console.log(userDetails);
  // console.log(bookingDetails);

  // console.log("booking details : " + JSON.stringify(data1?.data));

  var allBookingRecords = [];

  console.log("isLoading: " + isLoading);

  // if (!isLoading) {
  //   // allBookingRecords = JSON.stringify(data1?.data);
  //   allBookingRecords = bookingDetails;
  //   // console.log("booking records : " + allBookingRecords[0]["transport_type"]);
  // }

  async function handleSubmit() {
    const response = await UsePut(
      "/user/" + userDetails?.id,
      userDetails,
      "PUT"
    );
    if (response?.success) {
      // console.log("hell yes");
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(userDetails));
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log("user details : " + user);
      dispatch(refreshState({ user }));
      toast.success(response?.data);
    } else {
      // console.log("hell nooo : " + response?.message);
      toast.error(response?.message);
    }
  }

  const styles = (theme) => ({
    indicator: {
      backgroundColor: "red",
    },
  });

  // console.log("booking details: " + bookingDetails);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img alt =""
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                {/* <span class="font-weight-bold">Rikin Chauhan</span> */}
                <span class="font-weight-bold">
                  {userDetails?.first_name + " " + userDetails?.last_name}
                </span>
                {/* <span class="text-black-50">rikin01@gmail.com</span> */}
                <span class="text-black-50">{userDetails?.email}</span>
                {/* <span></span> */}
              </div>
            </div>
            <div class="col-md-9 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="First name"
                      // placeholder="Rikin"
                      value={userDetails?.first_name}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          first_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="Last name"
                      // placeholder="Chauhan"
                      value={userDetails?.last_name}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          last_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="Mobile number"
                      // placeholder="1234567890"
                      value={userDetails?.phone_number}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          phone_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div class="col-md-9 border-right">
                    <div class="p-3 py-5">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                      </div>
                      <div class="row mt-2">
                        <div class="col-md-6">
                          <label class="labels">First name</label>
                          <input
                            type="text"
                            class="form-control"
                            // placeholder="First name"
                            // placeholder="Rikin"
                            value={userDetails?.first_name}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                first_name: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div class="col-md-6">
                          <label class="labels">Last name</label>
                          <input
                            type="text"
                            class="form-control"
                            // placeholder="Last name"
                            // placeholder="Chauhan"
                            value={userDetails?.last_name}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                last_name: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-md-12">
                          <label class="labels">Mobile Number</label>
                          <input
                            type="text"
                            class="form-control"
                            // placeholder="Mobile number"
                            // placeholder="1234567890"
                            value={userDetails?.phone_number}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                phone_number: e.target.value,
                              });
                            }}
                          />
                        </div>
                        {/* <div class="col-md-12">
                  <label class="labels">Address Line 1</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 1"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Address Line 2</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Postcode</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">State</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Area</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div> */}
                        <div class="col-md-12">
                          <label class="labels">Email ID</label>
                          <input
                            type="text"
                            class="form-control"
                            // placeholder="Email id"
                            // placeholder="rikin01@gmail.com"
                            value={userDetails?.email}
                            onChange={(e) => {
                              setUserDetails({
                                ...userDetails,
                                email: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      {/* <div class="row mt-3">
                <div class="col-md-6">
                  <label class="labels">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="country"
                    value=""
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">State/Region</label>
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    placeholder="state"
                  />
                </div>
              </div> */}
                      <div class="mt-5 text-center">
                        <button
                          class="btn btn-primary profile-button"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span class="border px-3 p-1 add-experience">
                  <i class="fa fa-plus"></i>&nbsp;Experience
                </span>
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Experience in Designing</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="experience"
                  value=""
                />
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Additional Details</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="additional details"
                  value=""
                />
              </div>
            </div>
          </div> */}
                </div>
              </div>
            </>
          )}
          {bookingDetails == "" || bookingDetails == null ? (
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Typography>Center Center</Typography> */}
              <Box
                justifyContent="center"
                alignItems="center"
                sx={{ bgcolor: "background.paper", width: 1500 }}
              >
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab
                      label="Upcoming"
                      {...a11yProps(0)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("upcoming")}
                    />

                    <Tab
                      label="Completed"
                      {...a11yProps(1)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("completed")}
                    />
                    <Tab
                      label="All bookings"
                      {...a11yProps(2)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("all booking")}
                    />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            NO BOOKING RECORDS FOUND
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            NO BOOKING RECORDS FOUND
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            NO BOOKING RECORDS FOUND
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </Grid>
          ) : (
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Typography>Center Center</Typography> */}
              <Box
                justifyContent="center"
                alignItems="center"
                sx={{ bgcolor: "background.paper", width: 1500 }}
              >
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    // indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    TabIndicatorProps={{ style: { background: "red" } }}
                    style={{ background: "#003580" }}
                  >
                    <Tab
                      label="Upcoming"
                      {...a11yProps(0)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("upcoming")}
                    />
                    <Tab
                      label="Completed"
                      {...a11yProps(1)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("completed")}
                    />
                    <Tab
                      label="All bookings"
                      {...a11yProps(2)}
                      style={{ fontWeight: "bolder" }}
                      // onClick={() => console.log("all booking")}
                    />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    {/* ONE */}
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    {/* TWO */}
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    {bookingDetails.map((e) => (
                      <>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h5">
                              Journey Details
                            </Typography>
                            <br />
                            <Typography variant="body1">
                              Tranport type: {" " + e.transport_type}
                              <br />
                              Journey date:{" "}
                              {" " + ParseDate.ParseDate(e.journey_date, true)}
                              <br />
                              Total tickets: {" " + e.total_ticket_count}
                              <br />
                              Total fare: {" " + e.total_fare}
                              <br />
                              Booking status: {" " + e.booking_status}
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                      </>
                    ))}
                  </TabPanel>
                </SwipeableViews>
              </Box>
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default UserProfile;
