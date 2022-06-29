import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import "./userBookingHistory.css";
import UseGet from "../../../Utilities/UseGet";
import axios from "axios";
import NoRecord from "../../../pages/userProfile/NoRecord";
import BookingDetailCard from "../../../pages/userProfile/BookingDetailCard";
import dateFormat from "dateformat";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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
        <Box sx={{ p: 0 }}>
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

export default function UserBookingHistory() {
  const [expanded, setExpanded] = React.useState("");

  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState();

  const [allBookingRecords, setAllBookingRecords] = useState([]);

  const handlePanelChange = (panel, id) => (event, newExpanded) => {
    setUserId(id);
    setExpanded(newExpanded ? panel : false);
  };

  function fetchBookingRecordsFromAdmin() {
    axios.get("/booking/record/userId/" + userId).then((response) => {
      setAllBookingRecords(response?.data?.data);
    });
  }

  useEffect(() => {
    fetchBookingRecordsFromAdmin();
  }, [expanded]);

  var completedBookingRecords = [];

  var upcomingBookingRecords = [];

  var todaysDate = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss", true);

  if (allBookingRecords.length > 0) {
    var allBookingRecordsLength = allBookingRecords.length;

    for (let i = 0; i < allBookingRecordsLength; i++) {
      let currentBookingRecordDateTime = new Date(
        allBookingRecords[i].journey_date
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      if (currentBookingRecordDateTime > todaysDate) {
        upcomingBookingRecords.push(allBookingRecords[i]);
      } else {
        completedBookingRecords.push(allBookingRecords[i]);
      }
    }
  }

  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { data: allUsers, loading } = UseGet("/user/");

  useEffect(() => {
    axios.get("/user/").then((response) => {
      setUsers(response?.data?.users?.rows);
    });
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="m-5">
            {users.map((item, index = 1) => {
              index++;
              return (
                <>
                  <Accordion
                    expanded={expanded === `panel${index}`}
                    onChange={handlePanelChange(`panel${index}`, item?.id)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography
                        fontSize="150%"
                        sx={{ width: "50%", flexShrink: 0 }}
                      >
                        <b>User Name</b> :{" "}
                        {item?.first_name + " " + item?.last_name}
                      </Typography>
                      <Typography
                        fontSize="150%"
                        sx={{ width: "50%", flexShrink: 0 }}
                      >
                        <b>User Email</b> : {item?.email}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <>
                        {allBookingRecords.length === 0 ? (
                          <>
                            <Grid
                              item
                              container
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  bgcolor: "background.paper",
                                  width: 1500,
                                }}
                              >
                                <AppBar position="static">
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    TabIndicatorProps={{
                                      style: { background: "red" },
                                    }}
                                    style={{ background: "#003580" }}
                                  >
                                    <Tab
                                      label="Upcoming Bookings"
                                      {...a11yProps(0)}
                                      style={{ fontWeight: "bolder" }}
                                    />

                                    <Tab
                                      label="Completed Bookings"
                                      {...a11yProps(1)}
                                      style={{ fontWeight: "bolder" }}
                                    />
                                    <Tab
                                      label="All bookings"
                                      {...a11yProps(2)}
                                      style={{ fontWeight: "bolder" }}
                                    />
                                  </Tabs>
                                </AppBar>
                                <SwipeableViews
                                  axis={
                                    theme.direction === "rtl"
                                      ? "x-reverse"
                                      : "x"
                                  }
                                  index={value}
                                  onChangeIndex={handleChangeIndex}
                                >
                                  <TabPanel
                                    value={value}
                                    index={0}
                                    dir={theme.direction}
                                  >
                                    <br />
                                    <NoRecord />
                                  </TabPanel>
                                  <TabPanel
                                    value={value}
                                    index={1}
                                    dir={theme.direction}
                                  >
                                    <br />
                                    <NoRecord />
                                  </TabPanel>
                                  <TabPanel
                                    value={value}
                                    index={2}
                                    dir={theme.direction}
                                  >
                                    <br />
                                    <NoRecord />
                                  </TabPanel>
                                </SwipeableViews>
                              </Box>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid
                              item
                              container
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  bgcolor: "background.paper",
                                  width: 1500,
                                }}
                              >
                                <AppBar position="static">
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    TabIndicatorProps={{
                                      style: { background: "red" },
                                    }}
                                    style={{ background: "#003580" }}
                                  >
                                    <Tab
                                      label="Upcoming Bookings"
                                      {...a11yProps(0)}
                                      style={{ fontWeight: "bold" }}
                                    />
                                    <Tab
                                      label="Completed Bookings"
                                      {...a11yProps(1)}
                                      style={{ fontWeight: "bold" }}
                                    />
                                    <Tab
                                      label="All bookings"
                                      {...a11yProps(2)}
                                      style={{ fontWeight: "bold" }}
                                    />
                                  </Tabs>
                                </AppBar>
                                <SwipeableViews
                                  axis={
                                    theme.direction === "rtl"
                                      ? "x-reverse"
                                      : "x"
                                  }
                                  index={value}
                                  onChangeIndex={handleChangeIndex}
                                >
                                  {upcomingBookingRecords.length === 0 ? (
                                    <>
                                      <TabPanel
                                        value={value}
                                        index={0}
                                        dir={theme.direction}
                                      >
                                        <br />
                                        <NoRecord />
                                      </TabPanel>
                                    </>
                                  ) : (
                                    <>
                                      <TabPanel
                                        value={value}
                                        index={0}
                                        dir={theme.direction}
                                        style={{ padding: "none" }}
                                      >
                                        {upcomingBookingRecords.map((item) => (
                                          <>
                                            <br />
                                            <BookingDetailCard
                                              booking={item}
                                              status="upcoming"
                                              fetchBookingRecordsFromAdmin={
                                                fetchBookingRecordsFromAdmin
                                              }
                                            />
                                          </>
                                        ))}
                                      </TabPanel>
                                    </>
                                  )}
                                  {completedBookingRecords.length === 0 ? (
                                    <>
                                      <TabPanel
                                        value={value}
                                        index={1}
                                        dir={theme.direction}
                                      >
                                        <br />
                                        <NoRecord />
                                      </TabPanel>
                                    </>
                                  ) : (
                                    <>
                                      <TabPanel
                                        value={value}
                                        index={1}
                                        dir={theme.direction}
                                      >
                                        {completedBookingRecords.map((item) => (
                                          <>
                                            <br />
                                            <BookingDetailCard
                                              booking={item}
                                              status="completed"
                                              fetchBookingRecordsFromAdmin={
                                                fetchBookingRecordsFromAdmin
                                              }
                                            />
                                          </>
                                        ))}
                                      </TabPanel>
                                    </>
                                  )}
                                  <TabPanel
                                    value={value}
                                    index={2}
                                    dir={theme.direction}
                                  >
                                    {allBookingRecords.map((e) => (
                                      <>
                                        <br />
                                        <BookingDetailCard
                                          booking={e}
                                          status="all"
                                          fetchBookingRecordsFromAdmin={
                                            fetchBookingRecordsFromAdmin
                                          }
                                        />
                                      </>
                                    ))}
                                  </TabPanel>
                                </SwipeableViews>
                              </Box>
                            </Grid>
                          </>
                        )}
                      </>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
