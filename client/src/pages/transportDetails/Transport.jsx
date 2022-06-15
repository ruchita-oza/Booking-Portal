import React, { useState } from "react";
import {
  TextField,
  Grid,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./Transport.css";
import { toast } from "react-hot-toast";
import UsePost from "../../Utilities/UsePost";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import TransportScheduleCard from "../../components/cards/TransportScheduleCard";

function Transport() {
  const [transportDetails, setTransportDetails] = useState({
    id: "",
    name: "",
    type: "",
  });

  const [transportMode, setTransportMode] = useState(null);

  const [components, setComponents] = useState([]);

  const transportId = transportDetails?.id;

  const todaysDate = new Date();
  // console.log("transport id : ", transportId);

  let allScheduleData = [];

  const [scheduleData, setScheduleData] = useState({
    id: transportId,
    source: "",
    destination: "",
    departure_time: todaysDate,
    arrival_time: todaysDate,
    total_available_seats: "",
    price_per_seat: "",
  });

  function handleSourceData(id, sourceData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.source = sourceData;
  }

  function handleDestinationData(id, destinationData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.destination = destinationData;
  }

  function handleDepartureTimeData(id, departureTimeData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.departure_time = departureTimeData;
  }

  function handleArrivalTimeData(id, arrivalTimeData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.arrival_time = arrivalTimeData;
  }

  function handleTotalAvailableSeats(id, totalAvailableSeatsData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.total_available_seats = totalAvailableSeatsData;
  }

  function handlePricePerSeat(id, pricePerSeatData) {
    const selectedSchedule = components.find((item) => item.id == id);
    // console.log("selected schedule : ", selectedSchedule.id);
    selectedSchedule.price_per_seat = pricePerSeatData;
  }

  allScheduleData.push(components);

  // useEffect(() => {
  //   allScheduleData.push(scheduleData);
  // }, [scheduleData]);

  // console.log("all schedule data : ", allScheduleData);

  function addComponent(data) {
    setComponents([
      ...components,
      { ...data, transportId: transportDetails?.id },
    ]);
  }

  // console.log("component", components);

  function deleteComponent(id) {
    // console.log("delete component id : ", id);
    setComponents((previousData) =>
      previousData.filter((element) => element.id !== id)
    );
  }

  let types = [
    { value: "train", label: "Train" },
    { value: "bus", label: "Bus" },
    { value: "flight", label: "Flight" },
  ];

  function handleTransportMode(event, object) {
    const target = object.props;
    const id = target.id;
    const value = target.value;
    setTransportMode(value);
  }

  async function handleAdd() {
    if (components.length > 0) {
      var scheduleData = [...components];

      for (let i = 0; i < scheduleData.length; i++) {
        delete scheduleData[i].id;
        if (transportMode === "train") {
          // scheduleData[i].transportId = scheduleData[i]["train_id"];
          scheduleData = scheduleData.map(
            ({ transportId: train_id, ...rest }) => ({
              train_id,
              ...rest,
            })
          );
        } else if (transportMode === "bus") {
          // scheduleData[i].transportId = scheduleData[i]["bus_id"];
          scheduleData = scheduleData.map(
            ({ transportId: bus_id, ...rest }) => ({
              bus_id,
              ...rest,
            })
          );
        } else if (transportMode === "flight") {
          // scheduleData[i].transportId = scheduleData[i]["flight_id"];
          scheduleData = scheduleData.map(
            ({ transportId: flight_id, ...rest }) => ({
              flight_id,
              ...rest,
            })
          );
        }
      }

      // console.log("schedule data : ", transportMode, scheduleData);
    }

    if (transportMode == null) {
      toast.error("Select transport mode");
    } else if (transportMode === "train") {
      let trainRequestBody = {
        id: transportDetails?.id,
        train_name: transportDetails?.name,
        train_type: transportDetails?.type,
      };
      const response = await UsePost(
        "/train/details",
        trainRequestBody,
        "post"
      );
      // console.log("train response  : ", response);
      if (response?.data?.status) {
        if (components.length == 0) {
          toast.success(response?.data?.data);
          document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            // "/bus/schedule/createBusSchedules"
            "/train/schedule/createTrainSchedules",
            components,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Train details and " + response1?.data?.data);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        toast.error(response?.response?.data?.message);
      }
    } else if (transportMode === "bus") {
      let busRequestBody = {
        id: transportDetails?.id,
        bus_name: transportDetails?.name,
        bus_type: transportDetails?.type,
      };
      const response = await UsePost("/bus/details", busRequestBody, "post");
      // console.log("bus response  : ", response);
      if (response?.data?.status) {
        if (components.length == 0) {
          toast.success(response?.data?.data);
          document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/bus/schedule/createBusSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Bus details and " + response1?.data?.data);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        toast.error(response?.response?.data?.message);
      }
    } else if (transportMode === "flight") {
      let flightRequestBody = {
        id: transportDetails?.id,
        flight_name: transportDetails?.name,
        flight_type: transportDetails?.type,
      };
      const response = await UsePost(
        "/flight/details",
        flightRequestBody,
        "post"
      );
      // console.log("flight response  : ", response?.data?.status);
      if (response?.data?.status) {
        // console.log(scheduleData, scheduleData.length, "check here");
        if (scheduleData.length == 0) {
          toast.success(response?.data?.data);
          document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/flight/schedule/createFlightSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Flight details and " + response1?.data?.data);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        toast.error(response?.response?.data?.message);
      }
    }
  }

  return (
    <>
      <Box
        component="form"
        sx={
          {
            //   "& .MuiTextField-root": { m: 1 },
            //   flexGrow: 1,
          }
        }
        // fullWidth
        // sx={{ flexGrow: 1 }}
        // noValidate
        // autoComplete="off"
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <form enctype="multipart/form-data" id="add-transport-details">
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                select
                id="transport-modes"
                label="Transport Mode"
                onChange={handleTransportMode}
                value={transportMode}
              >
                {types.map((option) => (
                  // console.log(option.value)
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <br />
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Transport Number"
                onChange={(e) => {
                  setTransportDetails({
                    ...transportDetails,
                    id: e.target.value,
                  });
                  // setComponents({
                  //   ...components,
                  //   transportId: e.target.value,
                  // });
                }}
                //   defaultValue="Enter transport number / id"
              />
            </Grid>
            <br />
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                // disabled
                required
                id="outlined-required"
                label="Transport Name"
                onChange={(e) => {
                  setTransportDetails({
                    ...transportDetails,
                    name: e.target.value,
                  });
                }}
                //   defaultValue="Enter transport name"
              />
            </Grid>
            <br />
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Transport Type"
                onChange={(e) => {
                  setTransportDetails({
                    ...transportDetails,
                    type: e.target.value,
                  });
                }}
                //   defaultValue="Enter transport type"
              />
            </Grid>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="end"
              style={{ marginTop: "20px" }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  addComponent({
                    id: uuidv4(),
                    transportId: "",
                    source: "",
                    destination: "",
                    departure_time: "",
                    arrival_time: "",
                    total_available_seats: "",
                    price_per_seat: "",
                  })
                }
              >
                <AddIcon fontSize="large" />
              </Button>
            </Grid>
            <br />
            {components.map((i) => (
              <TransportScheduleCard
                deleteComponent={deleteComponent}
                data={i}
                // {...transportDetails}
                // {...scheduleData}
                handleSourceData={handleSourceData}
                handleDestinationData={handleDestinationData}
                handleDepartureTimeData={handleDepartureTimeData}
                handleArrivalTimeData={handleArrivalTimeData}
                handleTotalAvailableSeats={handleTotalAvailableSeats}
                handlePricePerSeat={handlePricePerSeat}
              />
            ))}
            {/* <Grid container justifyContent="center">
              <Button
                variant="contained"
                style={{ marginTop: "15px", width: "100px" }}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid> */}
          </form>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          style={{ marginTop: "15px", width: "100px", fontSize: "20px" }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Grid>
      {/* <Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Button variant="contained">
            <AddIcon fontSize="large" />
          </Button>
        </Grid>
      </Box> */}
    </>
  );
}

export default Transport;
