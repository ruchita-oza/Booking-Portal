import React, { useState, useEffect } from "react";
import { TextField, Grid, Box, Button, MenuItem } from "@mui/material";
import "./Transport.css";
import { toast } from "react-hot-toast";
import UsePost from "../../Utilities/UsePost";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import TransportScheduleCard from "../../components/cards/TransportScheduleCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UseGet from "../../Utilities/UseGetForEditTransport";

function EditTransport() {
  const [transportDetails, setTransportDetails] = useState({
    id: "",
    name: "",
    type: "",
  });

  const [transportMode, setTransportMode] = useState(null);

  const [components, setComponents] = useState([]);

  const [id1, setId] = useState(undefined);

  const [transportName, setTransportName] = useState(undefined);

  const [transportType, setTransportType] = useState(undefined);

  const [arrivalTimeValue, setArrivalTimeValue] = useState();

  const [departureTimeValue, setDepartureTimeValue] = useState();

  const [data, setData] = useState(undefined);

  const id = useLocation().pathname.split("/")[3];
  // console.log("id.length : ", id.length);

  function fetchData() {
    if (id.length == 10) {
      axios
        .get("/bus/schedule/getAllBusSchedulesByBusId/" + id)
        .then((response) => {
          setData(response.data.data.rows);
          setId(response.data.data.rows[0].bus_id);
          setTransportName(response.data.data.rows[0].bus_detail.bus_name);
          setTransportType(response.data.data.rows[0].bus_detail.bus_type);
        });
    } else if (id.length == 5) {
      axios
        .get("/train/schedule/getAllTrainSchedulesByTrainId/" + id)
        .then((response) => {
          setData(response.data.data.rows);
          setId(response.data.data.rows[0].train_id);
          setTransportName(response.data.data.rows[0].train_detail.train_name);
          setTransportType(response.data.data.rows[0].train_detail.train_type);
        });
    } else if (id.length == 6) {
      axios
        .get("/flight/schedule/getAllFlightSchedulesByFlightId/" + id)
        .then((response) => {
          setData(response.data.data.rows);
          setId(response.data.data.rows[0].flight_id);
          setTransportName(
            response.data.data.rows[0].flight_detail.flight_name
          );
          setTransportType(
            response.data.data.rows[0].flight_detail.flight_type
          );
        });
    }
  }

  useEffect(() => {
    if (id.length == 10) {
      setTransportMode("Bus");
    }

    if (id.length == 5) {
      setTransportMode("Train");
    }

    if (id.length == 6) {
      setTransportMode("Flight");
    }

    fetchData();
  }, []);

  // console.log("data.length : ", data?.length);

  for (let i = 0; i < data?.length; i++) {}

  const handleArrivalTimeChange = (newValue) => {
    setArrivalTimeValue(newValue);
  };

  const handleDepartureTimeChange = (newValue) => {
    setDepartureTimeValue(newValue);
  };

  const transportId = transportDetails?.id;

  const todaysDate = new Date();
  // console.log("transport id : ", transportId);

  function handleSourceData(id, sourceData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].source = sourceData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleDestinationData(id, destinationData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].destination = destinationData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleDepartureTimeData(id, departureTimeData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].departure_time = departureTimeData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleArrivalTimeData(id, arrivalTimeData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].arrival_time = arrivalTimeData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handleTotalAvailableSeats(id, totalAvailableSeatsData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].total_available_seats = totalAvailableSeatsData;
      }
    }
    setComponents([].concat(allComponents));
  }

  function handlePricePerSeat(id, pricePerSeatData) {
    let allComponents = [...components];
    for (let i = 0; i < allComponents.length; i++) {
      if (id == allComponents[i].id) {
        allComponents[i].price_per_seat = pricePerSeatData;
      }
    }
    setComponents([].concat(allComponents));
  }

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

      scheduleData = scheduleData.map((item) => ({
        ...item,
        transportId: transportDetails?.id != "" ? transportDetails?.id : id1,
      }));

      for (let i = 0; i < components.length; i++) {
        delete scheduleData[i].id;
        if (transportMode.toLowerCase() === "train") {
          // scheduleData[i].transportId = scheduleData[i]["train_id"];
          scheduleData = scheduleData.map(
            ({ transportId: train_id, ...rest }) => ({
              train_id,
              ...rest,
            })
          );
        } else if (transportMode.toLowerCase() === "bus") {
          // scheduleData[i].transportId = scheduleData[i]["bus_id"];
          scheduleData = scheduleData.map(
            ({ transportId: bus_id, ...rest }) => ({
              bus_id,
              ...rest,
            })
          );
        } else if (transportMode.toLowerCase() === "flight") {
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
    } else if (transportMode.toLowerCase() === "train") {
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
        // console.log("train schedule data : ", scheduleData);
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
        // console.log("train schedule data : ", scheduleData);
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
            // console.log("transportDetails?.id : ", transportDetails?.id);
            toast.success(
              response1?.data?.data +
                " for train number : " +
                transportDetails?.id
            );
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          } else {
            // console.log(
            //   "response1?.response1?.data?.message : ",
            //   response1?.response?.data?.message
            // );
            toast.error(response1?.response?.data?.message);
          }
        }
      }
    } else if (transportMode.toLowerCase() === "bus") {
      // console.log("here");
      let busRequestBody = {
        id: transportDetails?.id,
        bus_name: transportDetails?.name,
        bus_type: transportDetails?.type,
      };
      const response = await UsePost("/bus/details", busRequestBody, "post");
      // console.log("bus response  : ", response);
      if (response?.data?.status) {
        // console.log("bus schedule data : ", scheduleData);
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
        // console.log("bus schedule data : ", scheduleData);
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
            // console.log(
            //   "response1?.response1?.data?.message : ",
            //   response1?.response?.data?.message
            // );
            toast.error(response1?.response?.data?.message);
          }
        }
      }
    } else if (transportMode.toLowerCase() === "flight") {
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
        // console.log("flight schedule data : ", scheduleData);
        // console.log(scheduleData, components.length, "check here");
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
        // console.log("flight schedule data : ", scheduleData);
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
          // console.log("response1 : ", response1);
          if (response1?.data?.status) {
            toast.success(
              response1?.data?.data +
                " for flight number : " +
                transportDetails?.id
            );
            setComponents([]);
            document.getElementById("add-transport-details").reset();
          } else {
            // console.log(
            //   "response1?.response1?.data?.message : ",
            //   response1?.response?.data?.message
            // );
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
                // select
                id="transport-modes"
                value={transportMode}
                label="Transport Mode"
                // onChange={handleTransportMode}
              >
                {/* {types.map((option) => (
                  // console.log(option.value)
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            <br />
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Transport Number"
                value={id1}
                // value={
                //   transportMode == "bus"
                //     ? data[0].bus_id
                //     : transportMode == "train"
                //     ? data[0].train_id
                //     : data[0].flight_id
                // }
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
                value={transportName}
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
                value={transportType}
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
                    departure_time: new Date(),
                    arrival_time: new Date(),
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
                {...components}
                handleSourceData={handleSourceData}
                handleDestinationData={handleDestinationData}
                handleDepartureTimeData={handleDepartureTimeData}
                handleArrivalTimeData={handleArrivalTimeData}
                handleTotalAvailableSeats={handleTotalAvailableSeats}
                handlePricePerSeat={handlePricePerSeat}
              />
            ))}
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
    </>
  );
}

export default EditTransport;
