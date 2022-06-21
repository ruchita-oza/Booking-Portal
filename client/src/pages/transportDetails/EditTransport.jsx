import React, { useState, useEffect } from "react";
import { TextField, Grid, Box, Button, MenuItem, Tooltip } from "@mui/material";
import "./Transport.css";
import { toast } from "react-hot-toast";
import UsePut from "../../Utilities/UsePut";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import TransportScheduleCard from "../../components/cards/TransportScheduleCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UseGet from "../../Utilities/UseGetForEditTransport";
import UsePost from "../../Utilities/UsePost";

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

  const [data, setData] = useState(undefined);

  const id = useLocation().pathname.split("/")[3];
  // console.log("id.length : ", id.length);

  function fetchData() {
    // console.log("in fetch data function");
    if (id.length == 10) {
      axios
        .get("/bus/schedule/getAllBusSchedulesByBusId/" + id)
        .then((response) => {
          // console.log(
          //   "response.data.data.rows from bus : ",
          //   response.data.data.rows.length
          // );
          if (response.data.data.rows.length == 0) {
            // console.log("here in length == 0");
            axios.get("/bus/details/" + id).then((response) => {
              let busDetails = {
                id: response.data.data[0].id,
                name: response.data.data[0].bus_name,
                type: response.data.data[0].bus_type,
              };
              // console.log("response from else if : ", response?.data?.data[0]);
              // console.log("bus details : ", fbusDetails);
              setTransportDetails(busDetails);
            });
          } else {
            let busDetails = {
              id: response.data.data.rows[0].bus_detail.id,
              name: response.data.data.rows[0].bus_detail.bus_name,
              type: response.data.data.rows[0].bus_detail.bus_type,
            };
            setData(response.data.data.rows);
            setTransportDetails(busDetails);
            setId(response.data.data.rows[0].bus_id);
            setTransportName(response.data.data.rows[0].bus_detail.bus_name);
            setTransportType(response.data.data.rows[0].bus_detail.bus_type);

            let allBusSchedules = [];
            let busScheduleDetail;
            let currentBusSchedule;
            for (let i = 0; i < response.data.data.rows.length; i++) {
              currentBusSchedule = response.data.data.rows[i];
              busScheduleDetail = {
                id: currentBusSchedule.id,
                source: currentBusSchedule.source,
                destination: currentBusSchedule.destination,
                departure_time: currentBusSchedule.departure_time,
                arrival_time: currentBusSchedule.arrival_time,
                total_available_seats: currentBusSchedule.total_available_seats,
                price_per_seat: currentBusSchedule.price_per_seat,
              };
              allBusSchedules.push(busScheduleDetail);
            }
            setComponents(allBusSchedules);
            // console.log("all bus schedule details : ", allBusSchedules);
          }
        });
    } else if (id.length == 5) {
      axios
        .get("/train/schedule/getAllTrainSchedulesByTrainId/" + id)
        .then((response) => {
          if (response.data.data.rows.length == 0) {
            // console.log("here in length == 0");
            axios.get("/train/details/" + id).then((response) => {
              // console.log("response from else if : ", response?.data?.data);
              let trainDetails = {
                id: response.data.data.id,
                name: response.data.data.train_name,
                type: response.data.data.train_type,
              };
              // console.log("train details : ", trainDetails);
              setTransportDetails(trainDetails);
            });
          } else {
            let trainDetails = {
              id: response.data.data.rows[0].train_detail.id,
              name: response.data.data.rows[0].train_detail.train_name,
              type: response.data.data.rows[0].train_detail.train_type,
            };
            setData(response.data.data.rows);
            setTransportDetails(trainDetails);
            setId(response.data.data.rows[0].train_id);
            setTransportName(
              response.data.data.rows[0].train_detail.train_name
            );
            setTransportType(
              response.data.data.rows[0].train_detail.train_type
            );

            let allTrainSchedules = [];
            let trainScheduleDetail;
            let currentTrainSchedule;
            for (let i = 0; i < response.data.data.rows.length; i++) {
              currentTrainSchedule = response.data.data.rows[i];
              trainScheduleDetail = {
                id: currentTrainSchedule.id,
                source: currentTrainSchedule.source,
                destination: currentTrainSchedule.destination,
                departure_time: currentTrainSchedule.departure_time,
                arrival_time: currentTrainSchedule.arrival_time,
                total_available_seats:
                  currentTrainSchedule.total_available_seats,
                price_per_seat: currentTrainSchedule.price_per_seat,
              };
              allTrainSchedules.push(trainScheduleDetail);
            }
            setComponents(allTrainSchedules);
            // console.log("all train schedule details : ", allTrainSchedules);
          }
        });
    } else if (id.length == 6) {
      axios
        .get("/flight/schedule/getAllFlightSchedulesByFlightId/" + id)
        .then((response) => {
          // console.log("response flight : ", response);
          // console.log(
          //   "response.data.data.rows from flight : ",
          //   response.data.data.rows.length
          // );
          if (response.data.data.rows.length == 0) {
            // console.log("here in length == 0");
            axios.get("/flight/details/" + id).then((response) => {
              let flightDetails = {
                id: response.data.data[0].id,
                name: response.data.data[0].flight_name,
                type: response.data.data[0].flight_type,
              };
              // console.log("response from else if : ", response);
              // console.log("flight details : ", flightDetails);
              setTransportDetails(flightDetails);
            });
          } else {
            let flightDetails = {
              id: response.data.data.rows[0].flight_detail.id,
              name: response.data.data.rows[0].flight_detail.flight_name,
              type: response.data.data.rows[0].flight_detail.flight_type,
            };
            setData(response.data.data.rows);
            setTransportDetails(flightDetails);
            setId(response.data.data.rows[0].flight_id);
            setTransportName(
              response.data.data.rows[0].flight_detail.flight_name
            );
            setTransportType(
              response.data.data.rows[0].flight_detail.flight_type
            );

            let allFlightSchedules = [];
            let flightScheduleDetail;
            let currentFlightSchedule;
            for (let i = 0; i < response.data.data.rows.length; i++) {
              currentFlightSchedule = response.data.data.rows[i];
              flightScheduleDetail = {
                id: currentFlightSchedule.id,
                source: currentFlightSchedule.source,
                destination: currentFlightSchedule.destination,
                departure_time: currentFlightSchedule.departure_time,
                arrival_time: currentFlightSchedule.arrival_time,
                total_available_seats:
                  currentFlightSchedule.total_available_seats,
                price_per_seat: currentFlightSchedule.price_per_seat,
              };
              allFlightSchedules.push(flightScheduleDetail);
            }
            setComponents(allFlightSchedules);
            // console.log("all flight schedule details : ", allFlightSchedules);
          }
        });
    }
  }

  useEffect(() => {
    // console.log("in use effect");
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

  // console.log("transport mode : ", transportMode);

  // console.log("data : ", data);

  // console.log("transport details : ", transportDetails);

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
    setComponents([...components, { ...data, transportId: id }]);
  }

  console.log("component", components);

  function deleteComponent(id) {
    // console.log("delete component id : ", id);
    // console.log("transport mode in delete : ", transportMode);
    if (transportMode.toLowerCase() == "bus") {
      axios.delete("/bus/schedule/" + id).then((response) => {
        // console.log("response : ", response);
        if (response?.data?.status) {
          toast.success(response?.data?.data);
        } else {
          toast.error(response?.data?.data?.message);
        }
      });
    } else if (transportMode.toLowerCase() == "train") {
      axios.delete("/train/schedule/" + id).then((response) => {
        // console.log("response : ", response);
        if (response?.data?.status) {
          toast.success(response?.data?.data);
        } else {
          toast.error(response?.data?.data?.message);
        }
      });
    } else if (transportMode.toLowerCase() == "flight") {
      axios.delete("/flight/schedule/" + id).then((response) => {
        // console.log("response : ", response);
        if (response?.data?.status) {
          toast.success(response?.data?.data);
        } else {
          toast.error(response?.data?.data?.message);
        }
      });
    }
    setComponents((previousData) =>
      previousData.filter((element) => element.id !== id)
    );
    // console.log("components after delete : ", components);
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

  async function handleSubmit() {
    if (components.length > 0) {
      // console.log("components before changing its structure : ", components);
      var scheduleData = [...components];

      scheduleData = scheduleData.map((item) => ({
        ...item,
        transportId: transportDetails?.id != "" ? transportDetails?.id : id1,
      }));

      // for (let i = 0; i < components.length; i++) {
      //   delete scheduleData[i].id;
      // if (transportMode.toLowerCase() === "train") {
      //   // scheduleData[i].transportId = scheduleData[i]["train_id"];
      //   scheduleData = scheduleData.map(
      //     ({ transportId: train_id, ...rest }) => ({
      //       train_id,
      //       ...rest,
      //     })
      //   );
      // } else if (transportMode.toLowerCase() === "bus") {
      //   // scheduleData[i].transportId = scheduleData[i]["bus_id"];
      //   scheduleData = scheduleData.map(
      //     ({ transportId: bus_id, ...rest }) => ({
      //       bus_id,
      //       ...rest,
      //     })
      //   );
      // } else if (transportMode.toLowerCase() === "flight") {
      //   // scheduleData[i].transportId = scheduleData[i]["flight_id"];
      //   scheduleData = scheduleData.map(
      //     ({ transportId: flight_id, ...rest }) => ({
      //       flight_id,
      //       ...rest,
      //     })
      //   );
      // }
      // }

      // console.log("schedule data : ", scheduleData);
    }

    if (transportMode == null) {
      toast.error("Select transport mode");
    } else if (transportMode.toLowerCase() === "train") {
      let trainRequestBody = {
        id: transportDetails?.id.toString(),
        train_name: transportDetails?.name,
        train_type: transportDetails?.type,
      };

      // console.log("trainRequestBody : ", trainRequestBody);
      const response = await UsePut(
        "/train/details/" + id,
        trainRequestBody,
        "put"
      );
      // console.log("train response : ", response);
      if (response?.status) {
        // console.log("train schedule data : ", scheduleData);
        if (components.length == 0) {
          toast.success(response?.data);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            // "/train/schedule/" + transportDetails.id,
            "/train/schedule/updateAllTrainSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Train details and " + response1?.data?.data);
            setComponents(components);
            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response1?.response?.data?.message);
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        // console.log(response?.status);
        // console.log("train schedule data : ", scheduleData);
        if (components.length == 0) {
          toast.error(response?.response?.data?.message);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/train/schedule/updateAllTrainSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.error(response?.response?.data?.message);
            // console.log("transportDetails?.id : ", transportDetails?.id);
            setTimeout(function () {
              toast.success(
                response1?.data?.data + " for train number : " + id
              );
            }, 4000);

            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
          } else {
            // console.log(
            //   "response1?.response1?.data?.message : ",
            //   response1?.response?.data?.message
            // );
            toast.error(response?.response?.data?.message);
            setTimeout(function () {
              toast.error(response1?.response?.data?.message);
            }, 4000);
          }
        }
      }
    } else if (transportMode.toLowerCase() === "bus") {
      // console.log("here in bus");
      // console.log("here");
      let busRequestBody = {
        id: transportDetails?.id,
        bus_name: transportDetails?.name,
        bus_type: transportDetails?.type,
      };
      const response = await UsePut(
        "/bus/details/" + id,
        busRequestBody,
        "put"
      );
      // console.log("bus response  : ", response?.data);
      // console.log("bus schedule data : ", scheduleData);
      if (response?.status) {
        // console.log("response from success : ", response?.data);
        // console.log("bus schedule data : ", scheduleData);
        if (components.length == 0) {
          toast.success(response?.data);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            // "/bus/schedule/" + transportDetails.id,
            "/bus/schedule/updateAllBusSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Bus details and " + response1?.data?.data);
            setComponents(components);
            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response1?.response?.data?.message);
          }
        }
        // toast.success(response?.data?.data);
        // document.getElementById("add-transport-details").reset();
      } else {
        // console.log("bus schedule data : ", scheduleData);
        // console.log(response?.response?.data?.message);
        if (components.length == 0) {
          toast.error(response?.response?.data?.message);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            "/bus/schedule/updateAllBusSchedules",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.error(response?.response?.data?.message);
            setTimeout(function () {
              toast.success(response1?.data?.data + " for bus number : " + id);
            }, 4000);
            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
          } else {
            // console.log(
            //   "response1?.response1?.data?.message : ",
            //   response1?.response?.data?.message
            // );
            toast.error(response?.response?.data?.message);
            setTimeout(function () {
              toast.error(response1?.response?.data?.message);
            }, 4000);
          }
        }
      }
    } else if (transportMode.toLowerCase() === "flight") {
      let flightRequestBody = {
        id: transportDetails?.id,
        flight_name: transportDetails?.name,
        flight_type: transportDetails?.type,
      };
      const response = await UsePut(
        "/flight/details/" + id,
        flightRequestBody,
        "put"
      );
      // console.log("flight response  : ", response?.data?.status);
      if (response?.status) {
        // console.log("flight schedule data : ", scheduleData);
        // console.log(scheduleData, components.length, "check here");
        if (components.length == 0) {
          toast.success(response?.data);
          // document.getElementById("add-transport-details").reset();
        } else {
          const response1 = await UsePost(
            // "/flight/schedule/" + transportDetails.id,
            "/flight/schedule/updateAllFlightSchedules/",
            scheduleData,
            "post"
          );
          if (response1?.data?.status) {
            toast.success("Flight details and " + response1?.data?.data);
            setComponents(components);
            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
          } else {
            toast.error(response1?.response?.data?.message);
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
            "/flight/schedule/updateAllFlightSchedules/",
            scheduleData,
            "post"
          );
          // console.log("response1 : ", response1);
          if (response1?.data?.status) {
            toast.error(response?.response?.data?.message);
            setTimeout(function () {
              toast.success(
                response1?.data?.data + " for flight number : " + id
              );
            }, 4000);
            // setComponents([]);
            // document.getElementById("add-transport-details").reset();
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
                value={transportDetails.id}
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
                // value={
                //   transportMode.toLowerCase() == "bus"
                //     ? transportDetails?.bus_name
                //     : transportMode.toLowerCase() == "train"
                //     ? transportDetails?.train_name
                //     : transportDetails?.flight_name
                // }
                value={transportDetails.name}
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
                value={transportDetails.type}
                // value={
                //   transportMode.toLowerCase() == "bus"
                //     ? transportDetails?.bus_type
                //     : transportMode.toLowerCase() == "train"
                //     ? transportDetails?.train_type
                //     : transportDetails?.flight_type
                // }
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
          </form>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          style={{ marginTop: "15px", width: "100px", fontSize: "20px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
}

export default EditTransport;
