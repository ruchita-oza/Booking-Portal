import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./TransportScheduleCard.css";
import UseGet from "../../Utilities/UseGet";
import axios from "axios";

function TransportScheduleCard({
  deleteComponent,
  data,
  handleSourceData,
  handleDestinationData,
  handleDepartureTimeData,
  handleArrivalTimeData,
  handleTotalAvailableSeats,
  handlePricePerSeat,
}) {
  // console.log("data : ", data);
  // const transportId = transportDetails?.id;
  // const todaysDate = new Date();
  // // console.log("transport id : ", transportId);

  // let allScheduleData = [];

  // const [scheduleData, setScheduleData] = useState({
  //   id: transportId,
  //   source: "",
  //   destination: "",
  //   departure_time: todaysDate,
  //   arrival_time: todaysDate,
  //   total_available_seats: "",
  //   price_per_seat: "",
  // });

  // // console.log("schedule data : ", scheduleData);

  // allScheduleData.push(scheduleData);

  // console.log("all schedule data : ", allScheduleData);

  // const [value, setValue] = useState(todaysDate);

  // const handleArrivalTimeChange = (newValue) => {
  //   setValue(newValue);
  // };

  // const handleDepartureTimeChange = (newValue) => {
  //   setValue(newValue);
  // };

  const { data: requiredCities, loading } = UseGet("/city/");
  // console.log("loading : ", loading);

  let cities = [];

  if (!loading) {
    // console.log("required cities : ", requiredCities.length);
    for (let i = 0; i < requiredCities.length; i++) {
      let cityObject = {};
      cityObject["value"] = requiredCities[i]?.id;
      cityObject["label"] = requiredCities[i]?.city_name;
      cities.push(cityObject);
    }
  }

  // console.log("cities : ", cities);

  const ITEM_HEIGHT = 35;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          boxShadow: 3,
        }}
      >
        <CardContent>
          {/* <Box> */}
          {/* <Grid
            //   container
            //   spacing={2}
            //   direction="row"
            //   justifyContent="center"
            //   alignItems="center"
            style={{ marginTop: "20px" }}
          > */}
          <Grid spacing={2} container>
            {/* <form enctype="multipart/form-data" id="add-transport-schedule"> */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                select
                id="source"
                label="Source City"
                SelectProps={{ MenuProps: MenuProps }}
                // value={data["source"]}
                onChange={(e) => {
                  // setScheduleData({
                  //   ...scheduleData,
                  //   source: e.target.value,
                  // });
                  handleSourceData(data?.id, e.target.value);
                }}
              >
                {cities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <br />
            <Grid item xs={12} md={5.3}>
              <TextField
                fullWidth
                required
                select
                id="destination"
                label="Destination City"
                SelectProps={{ MenuProps: MenuProps }}
                // value={data["destination"]}
                onChange={(e) => {
                  // setScheduleData({
                  //   ...scheduleData,
                  //   destination: e.target.value,
                  // });
                  handleDestinationData(data?.id, e.target.value);
                }}
              >
                {cities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={0.7}>
              <Button
                variant="contained"
                color="error"
                style={{ padding: "10px" }}
                onClick={() => deleteComponent(data.id)}
              >
                <DeleteIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
          <br />
          <Grid spacing={2} container>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  label="Departure Time of Source City"
                  // value={value}
                  value={data?.departure_time}
                  // onChange={handleChange}
                  onChange={(e) => {
                    // setScheduleData({
                    //   ...scheduleData,
                    //   departure_time: e,
                    // });
                    handleDepartureTimeData(data?.id, e);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Arrival Time of Destination City"
                  // value={value}
                  value={data?.arrival_time}
                  // onChange={handleChange}
                  onChange={(e) => {
                    // setScheduleData({
                    //   ...scheduleData,
                    //   arrival_time: e,
                    // });
                    handleArrivalTimeData(data?.id, e);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                id="outlined-required"
                label="Total Available Seats"
                // value={data["totalAvailableSeats"]}
                onChange={(e) => {
                  // setScheduleData({
                  //   ...scheduleData,
                  //   total_available_seats: e.target.value,
                  // });
                  handleTotalAvailableSeats(data?.id, e.target.value);
                }}
              />
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                // disabled
                required
                type="number"
                id="outlined-required"
                label="Price Per Seat"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                // value={data["pricePerSeat"]}
                onChange={(e) => {
                  // setScheduleData({
                  //   ...scheduleData,
                  //   price_per_seat: e.target.value,
                  // });
                  handlePricePerSeat(data?.id, e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* </form> */}
          {/* </Grid> */}
          {/* </Box> */}
        </CardContent>
      </Card>
      <br />
    </>
  );
}

export default TransportScheduleCard;
