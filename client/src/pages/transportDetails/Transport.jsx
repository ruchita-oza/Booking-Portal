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

function Transport() {
  const [transportDetails, setTransportDetails] = useState({
    id: "",
    name: "",
    type: "",
  });

  const [transportMode, setTransportMode] = useState(null);

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
        toast.success(response?.data?.data);
        document.getElementById("add-transport-details").reset();
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
        toast.success(response?.data?.data);
        document.getElementById("add-transport-details").reset();
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
      // console.log("flight response  : ", response);
      if (response?.data?.status) {
        toast.success(response?.data?.data);
        document.getElementById("add-transport-details").reset();
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
              <Button variant="contained">
                <AddIcon fontSize="large" />
              </Button>
            </Grid>
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
