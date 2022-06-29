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
  Tooltip,
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
  const { data: requiredCities, loading } = UseGet("/city/");

  let cities = [];

  if (!loading) {
    for (let i = 0; i < requiredCities.length; i++) {
      let cityObject = {};
      cityObject["value"] = requiredCities[i]?.id;
      cityObject["label"] = requiredCities[i]?.city_name;
      cities.push(cityObject);
    }
  }

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
          <Grid spacing={2} container>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                select
                id="source"
                label="Source City"
                SelectProps={{ MenuProps: MenuProps }}
                value={data["source"]}
                onChange={(e) => {
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
                value={data["destination"]}
                onChange={(e) => {
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
              <Tooltip title="Delete schedule" placement="right">
                <Button
                  variant="contained"
                  color="error"
                  style={{ padding: "10px" }}
                  onClick={() => deleteComponent(data.id)}
                >
                  <DeleteIcon fontSize="large" />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <br />
          <Grid spacing={2} container>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  label="Departure Time of Source City"
                  value={data?.departure_time}
                  onChange={(e) => {
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
                  value={data?.arrival_time}
                  onChange={(e) => {
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
                value={data["total_available_seats"]}
                onChange={(e) => {
                  handleTotalAvailableSeats(data?.id, e.target.value);
                }}
              />
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="number"
                id="outlined-required"
                label="Price Per Seat"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                value={data["price_per_seat"]}
                onChange={(e) => {
                  handlePricePerSeat(data?.id, e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
    </>
  );
}

export default TransportScheduleCard;
