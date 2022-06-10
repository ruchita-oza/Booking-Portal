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
import { Grid, Chip, Divider } from "@mui/material";
import { toast } from "react-hot-toast";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { refreshState } from "../../redux/users/actions";
import { fetchUserBookingRecordsDetailThunkAction } from "../../redux/users/actions";
import Loader from "../../components/loader/loader";
import ParseDate from "../../Utilities/ParseDate";
import dateFormat, { masks } from "dateformat";
import { withStyles } from "@material-ui/core/styles";

const axios = require("axios");
// const DATE_FORMATER = require("dateformat");

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

const StyleChip = withStyles({
  root: {
    // backgroundColor:'salmon'
    height: "25px",
    // padding: "1px",
  },
})(Chip);

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
  const [allCompletedBookingRecords, setAllCompletedBookingRecords] =
    useState(null);
  const [allUpcomingBookingRecords, setAllUpcomingBookingRecords] =
    useState(null);

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
    // console.log("on success");
    toast.success("Success");
    // navigate("/");
  };

  const onError = (error) => {
    // console.log("error occured", error);
    toast.error("Error : " + error);
  };

  const {
    loggedInUser: data,
    isLoading,
    error,
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

  // useEffect(() => {
  //   setBookingDetails(data1?.data);
  //   setAllCompletedBookingRecords(completedBookingRecords)
  //   setAllUpcomingBookingRecords(upcomingBookingRecords)
  // }, [data1]);
  // console.log("first name: " + data?.id);
  // console.log(userDetails);
  // console.log(bookingDetails);

  // console.log("booking details : " + JSON.stringify(data1?.data));

  var allBookingRecords = [];

  var completedBookingRecords = [];

  var upcomingBookingRecords = [];

  // var todaysDate = new Date();

  var todaysDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss", true);
  // console.log("todays date : " + todaysDate);

  if (bookingDetails) {
    var allBookingRecordsLength = bookingDetails.length;

    // console.log("all booking details length : " + allBookingRecordsLength);
    for (var i = 0; i < allBookingRecordsLength; i++) {
      // console.log(
      //   "current booking details : " + JSON.stringify(bookingDetails[i])
      // );
      // var currentBookingRecordDateTime = bookingDetails[i].journey_date;
      var currentBookingRecordDateTime = new Date(
        bookingDetails[i].journey_date
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      // console.log(
      //   "current booking record date and time : " + currentBookingRecordDateTime
      // );
      if (currentBookingRecordDateTime > todaysDate) {
        // console.log(
        //   "current booking record: " +
        //     currentBookingRecordDateTime +
        //     " > todays date: " +
        //     todaysDate
        // );
        upcomingBookingRecords.push(bookingDetails[i]);
      } else {
        // console.log(
        //   "current booking record: " +
        //     currentBookingRecordDateTime +
        //     " < todays date: " +
        //     todaysDate
        // );
        completedBookingRecords.push(bookingDetails[i]);
      }
    }
  }

  // console.log("completed booking records : " + completedBookingRecords);
  // console.log("upcoming booking records : " + upcomingBookingRecords);

  // useEffect(() => {
  //   setBookingDetails(data1?.data);
  //   setAllCompletedBookingRecords(completedBookingRecords);
  //   setAllUpcomingBookingRecords(upcomingBookingRecords);
  // }, [
  //   dispatch,
  //   data1,
  //   isLoading,
  //   error,
  //   completedBookingRecords,
  //   upcomingBookingRecords,
  // ]);

  // useEffect(() => {}, []);

  // useEffect(() => {}, []);

  // console.log(
  //   "completed booking records : " + JSON.stringify(allCompletedBookingRecords)
  // );
  // console.log(
  //   "upcoming booking records : " + JSON.stringify(upcomingBookingRecords)
  // );

  // console.log("isLoading: " + isLoading);

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

  const upcomingRecords = () => {
    return allUpcomingBookingRecords.map((e) => (
      <TabPanel value={value} index={0} dir={theme.direction}>
        {/* ONE */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">
              Journey Details
              {" : "}
              <StyleChip label={"  " + e.booking_status} color="success" />
            </Typography>
            <br />
            <Typography variant="body1">
              Tranport type: {" " + e.transport_type}
              <br />
              Journey date: {" " + ParseDate.ParseDate(e.journey_date, true)}
              <br />
              Total tickets: {" " + e.total_ticket_count}
              <br />
              Total fare: {" " + e.total_fare}
              {/* <br />
          Booking status:{" "}
          <StyleChip
            label={" " + e.booking_status}
            color="success"
          /> */}
            </Typography>
          </CardContent>
        </Card>
        <br />
      </TabPanel>
    ));
  };

  const completedRecords = () => {
    return allCompletedBookingRecords.map((e) => (
      <TabPanel value={value} index={1} dir={theme.direction}>
        {/* ONE */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">
              Journey Details{" "}
              <StyleChip label={"  " + e.booking_status} color="success" />
            </Typography>
            <br />
            <Typography variant="body1">
              Tranport type: {" " + e.transport_type}
              <br />
              Journey date: {" " + ParseDate.ParseDate(e.journey_date, true)}
              <br />
              Total tickets: {" " + e.total_ticket_count}
              <br />
              Total fare: {" " + e.total_fare}
              {/* <br />
                Booking status:
                <StyleChip
                  label={" " + e.booking_status}
                  color="success"
                /> */}
            </Typography>
          </CardContent>
        </Card>
        <br />
      </TabPanel>
    ));
  };

  const allRecords = () => {
    return bookingDetails.map((e) => (
      <TabPanel value={value} index={1} dir={theme.direction}>
        {/* ONE */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">
              Journey Details{" "}
              <StyleChip label={"  " + e.booking_status} color="success" />
            </Typography>
            <br />
            <Typography variant="body1">
              Tranport type: {" " + e.transport_type}
              <br />
              Journey date: {" " + ParseDate.ParseDate(e.journey_date, true)}
              <br />
              Total tickets: {" " + e.total_ticket_count}
              <br />
              Total fare: {" " + e.total_fare}
              {/* <br />
                Booking status:
                <StyleChip
                  label={" " + e.booking_status}
                  color="success"
                /> */}
            </Typography>
          </CardContent>
        </Card>
        <br />
      </TabPanel>
    ));
  };

  // console.log("booking details: " + bookingDetails);
  return (
    <>
      {/* {console.log(isLoading)} */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {userDetails == null ? (
            ""
          ) : (
            <>
              <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                  <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                      <img
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
                    <Card
                      variant="outlined"
                      sx={{
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            <b>NO BOOKING RECORDS FOUND</b>
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <Card
                      variant="outlined"
                      sx={{
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            <b>NO BOOKING RECORDS FOUND</b>
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <Card
                      variant="outlined"
                      sx={{
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="h5">
                            <b>NO BOOKING RECORDS FOUND</b>
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
                  {allUpcomingBookingRecords.length === 0 ? (
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography variant="h5">
                              <b>NO BOOKING RECORDS FOUND</b>
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Card>
                    </TabPanel>
                  ) : (
                    // upcomingRecords()
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      {allUpcomingBookingRecords.map((e) => (
                        <>
                          {/* ONE */}
                          <Card
                            variant="outlined"
                            sx={{
                              boxShadow: 3,
                            }}
                          >
                            <CardContent>
                              <Typography variant="h5">
                                {e.transport_type == "flight"
                                  ? e.flight_schedule?.source_name?.city_name +
                                    " to " +
                                    e.flight_schedule?.destination_name
                                      ?.city_name +
                                    " "
                                  : e.transport_type == "bus"
                                  ? e.bus_schedule?.source_name?.city_name +
                                    " to " +
                                    e.bus_schedule?.destination_name
                                      ?.city_name +
                                    " "
                                  : e.train_schedule?.source_name?.city_name +
                                    " to " +
                                    e.train_schedule?.destination_name
                                      ?.city_name +
                                    " "}
                                <StyleChip
                                  label={"  " + e.booking_status}
                                  color="success"
                                />
                              </Typography>
                              {/* <br /> */}
                              <Divider
                                // variant="absolute"
                                style={{
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  // height: "100%",
                                }}
                              />
                              <Typography variant="body1">
                                Tranport type: {" " + e.transport_type}
                                <br />
                                Journey date:{" "}
                                {" " +
                                  ParseDate.ParseDate(e.journey_date, true)}
                                <br />
                                Total tickets: {" " + e.total_ticket_count}
                                <br />
                                Total fare: {" " + e.total_fare}
                                {/* <br />
                                Booking status:{" "}
                                <StyleChip
                                  label={" " + e.booking_status}
                                  color="success"
                                /> */}
                              </Typography>
                            </CardContent>
                          </Card>
                          <br />
                        </>
                      ))}
                    </TabPanel>
                  )}
                  {allCompletedBookingRecords.length === 0 ? (
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography variant="h5">
                              <b>NO BOOKING RECORDS FOUND</b>
                            </Typography>
                          </Grid>
                        </CardContent>
                      </Card>
                    </TabPanel>
                  ) : (
                    // completedRecords()
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      {allCompletedBookingRecords.map((e) => (
                        <>
                          {/* ONE */}
                          <Card
                            variant="outlined"
                            sx={{
                              boxShadow: 3,
                            }}
                          >
                            <CardContent>
                              <Typography variant="h5">
                                {e.transport_type == "flight"
                                  ? e.flight_schedule?.source_name?.city_name +
                                    " to " +
                                    e.flight_schedule?.destination_name
                                      ?.city_name +
                                    " "
                                  : e.transport_type == "bus"
                                  ? e.bus_schedule?.source_name?.city_name +
                                    " to " +
                                    e.bus_schedule?.destination_name
                                      ?.city_name +
                                    " "
                                  : e.train_schedule?.source_name?.city_name +
                                    " to " +
                                    e.train_schedule?.destination_name
                                      ?.city_name +
                                    " "}
                                <StyleChip
                                  label={"  " + e.booking_status}
                                  color="success"
                                />
                              </Typography>
                              {/* <br /> */}
                              <Divider
                                // variant="absolute"
                                style={{
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                  // height: "100%",
                                }}
                              />
                              <Typography variant="body1">
                                Tranport type: {" " + e.transport_type}
                                <br />
                                Journey date:{" "}
                                {" " +
                                  ParseDate.ParseDate(e.journey_date, true)}
                                <br />
                                Total tickets: {" " + e.total_ticket_count}
                                <br />
                                Total fare: {" " + e.total_fare}
                                {/* <br />
                                Booking status:
                                <StyleChip
                                  label={" " + e.booking_status}
                                  color="success"
                                /> */}
                              </Typography>
                            </CardContent>
                          </Card>
                          <br />
                        </>
                      ))}
                    </TabPanel>
                  )}
                  {/* {allRecords()} */}
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    {bookingDetails.map((e) => (
                      <>
                        <Card
                          variant="outlined"
                          sx={{
                            boxShadow: 3,
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5">
                              {e.transport_type == "flight"
                                ? e.flight_schedule?.source_name?.city_name +
                                  " to " +
                                  e.flight_schedule?.destination_name
                                    ?.city_name +
                                  " "
                                : e.transport_type == "bus"
                                ? e.bus_schedule?.source_name?.city_name +
                                  " to " +
                                  e.bus_schedule?.destination_name?.city_name +
                                  " "
                                : e.train_schedule?.source_name?.city_name +
                                  " to " +
                                  e.train_schedule?.destination_name
                                    ?.city_name +
                                  " "}
                              <StyleChip
                                label={"  " + e.booking_status}
                                color="success"
                              />
                            </Typography>
                            <Divider
                              // variant="absolute"
                              style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                // height: "100%",
                              }}
                            />
                            <Typography variant="body1">
                              Tranport type: {" " + e.transport_type}
                              <br />
                              Journey date:{" "}
                              {" " + ParseDate.ParseDate(e.journey_date, true)}
                              <br />
                              Total tickets: {" " + e.total_ticket_count}
                              <br />
                              Total fare: {" " + e.total_fare}
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
