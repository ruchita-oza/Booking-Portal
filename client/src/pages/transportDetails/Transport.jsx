import React, { useState } from "react";
import { TextField, Grid, Box, Button, MenuItem, Tooltip } from "@mui/material";
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

  const [arrivalTimeValue, setArrivalTimeValue] = useState();

  const [departureTimeValue, setDepartureTimeValue] = useState();

  const handleArrivalTimeChange = (newValue) => {
    setArrivalTimeValue(newValue);
  };

  const handleDepartureTimeChange = (newValue) => {
    setDepartureTimeValue(newValue);
  };

  const transportId = transportDetails?.id;

  const todaysDate = new Date();

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
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].source = sourceData;
      }
    }
    setComponents([].concat(allComponents));
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.source = sourceData;
  }

  function handleDestinationData(id, destinationData) {
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.destination = destinationData;
    // setComponents([].concat(selectedSchedule));
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].destination = destinationData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleDepartureTimeData(id, departureTimeData) {
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.departure_time = departureTimeData;
    // setComponents([].concat(selectedSchedule));
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].departure_time = departureTimeData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleArrivalTimeData(id, arrivalTimeData) {
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.arrival_time = arrivalTimeData;
    // setComponents([].concat(selectedSchedule));
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].arrival_time = arrivalTimeData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleTotalAvailableSeats(id, totalAvailableSeatsData) {
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.total_available_seats = totalAvailableSeatsData;
    // setComponents([].concat(selectedSchedule));
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].total_available_seats = totalAvailableSeatsData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handlePricePerSeat(id, pricePerSeatData) {
    // const selectedSchedule = components.find((item) => item.id == id);
    // selectedSchedule.price_per_seat = pricePerSeatData;
    // setComponents([].concat(selectedSchedule));
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].price_per_seat = pricePerSeatData;
      }
    }
    setComponents([].concat(allComponents));
  }

  // allScheduleData.push(components);

  // useEffect(() => {
  //   allScheduleData.push(scheduleData);
  // }, [scheduleData]);

  function addComponent(data) {
    setComponents([
      ...components,
      { ...data, transportId: transportDetails?.id },
    ]);
  }

  function deleteComponent(id) {
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

      scheduleData = scheduleData.map((item) => ({
        ...item,
        transportId: transportDetails?.id,
      }));

      for (let i = 0; i < components.length; i++) {
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
      if (response?.data?.status) {
        if (components.length == 0) {
          toast.success(response?.data?.data);
          document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/train/schedule/createTrainSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Train details and " + response1?.data?.data);
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        // toast.error(response?.response?.data?.message);
        if (components.length == 0) {
          toast.error(response?.response?.data?.message);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/train/schedule/createTrainSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success(
              response1?.data?.data +
                " for train number : " +
                transportDetails?.id
            );
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response1?.response?.data?.message);
          }
        }
      }
    } else if (transportMode === "bus") {
      let busRequestBody = {
        id: transportDetails?.id,
        bus_name: transportDetails?.name,
        bus_type: transportDetails?.type,
      };
      const response = await UsePost("/bus/details", busRequestBody, "post");
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
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        // toast.error(response?.response?.data?.message);
        if (components.length == 0) {
          toast.error(response?.response?.data?.message);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/bus/schedule/createBusSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success(
              response1?.data?.data +
                " for bus number : " +
                transportDetails?.id
            );
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response1?.response?.data?.message);
          }
        }
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
      if (response?.data?.status) {
        if (components.length == 0) {
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
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        // toast.error(response?.response?.data?.message);
        if (components.length == 0) {
          toast.error(response?.response?.data?.message);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/flight/schedule/createFlightSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success(
              response1?.data?.data +
                " for flight number : " +
                transportDetails?.id
            );
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response?.response?.data?.message);
            setTimeout(function () {
              toast.error(response1?.response?.data?.message);
            }, 4000); //run this after 3 seconds
            // toast.error(response1?.response?.data?.message);
          }
        }
      }
    }
  }

  return (
    <>
      <Box component="form" sx={{}}>
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
              <Tooltip title="Add new schedule" placement="left">
                <Button
                  variant="contained"
                  onClick={() =>
                    addComponent({
                      id: uuidv4(),
                      transportId: "",
                      source: "",
                      destination: "",
                      departure_time: new Date(),
                      arrival_time: new Date(),
                      total_available_seats: "",
                      price_per_seat: "",
                    })
                  }
                >
                  <AddIcon fontSize="large" />
                </Button>
              </Tooltip>
            </Grid>
            <br />
            {components.map((i) => (
              <TransportScheduleCard
                deleteComponent={deleteComponent}
                data={i}
                // {...transportDetails}
                // {...scheduleData}
                {...components}
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
