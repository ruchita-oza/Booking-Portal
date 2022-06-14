import React from "react";
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

function TransportScheduleCard({ deleteComponent, data }) {
  const todaysDate = new Date();
  const [value, setValue] = React.useState(todaysDate);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
                //   {/* <Select */}
                fullWidth
                required
                select
                // multiple
                id="source"
                label="Source"
                SelectProps={{ MenuProps: MenuProps }}
              >
                <MenuItem value={1}>Mumbai</MenuItem>
                <MenuItem value={2}>Goa</MenuItem>
                <MenuItem value={3}>Pune</MenuItem>
                <MenuItem value={4}>Panjim</MenuItem>
                <MenuItem value={5}>Rajasthan</MenuItem>
                <MenuItem value={6}>Udaipur</MenuItem>
                <MenuItem value={7}>Rajkot</MenuItem>
                <MenuItem value={8}>Surat</MenuItem>
                <MenuItem value={9}>Vadodara</MenuItem>
                <MenuItem value={10}>Delhi</MenuItem>
                <MenuItem value={11}>Bangalore</MenuItem>
                <MenuItem value={12}>Hyderabad</MenuItem>
                <MenuItem value={13}>Ahmedabad</MenuItem>
                <MenuItem value={14}>Chennai</MenuItem>
                <MenuItem value={15}>Kolkata</MenuItem>
                <MenuItem value={16}>Jaipur</MenuItem>
                <MenuItem value={17}>Lucknow</MenuItem>
                <MenuItem value={18}>Kanpur</MenuItem>
                <MenuItem value={19}>Nagpur</MenuItem>
                <MenuItem value={20}>Indore</MenuItem>
                <MenuItem value={21}>Thane</MenuItem>
                <MenuItem value={22}>Bhopal</MenuItem>
                <MenuItem value={23}>Patna</MenuItem>
                <MenuItem value={24}>Agra</MenuItem>
                <MenuItem value={25}>Nashik</MenuItem>
                <MenuItem value={26}>Faridabad</MenuItem>
                <MenuItem value={27}>Varanasi</MenuItem>
                <MenuItem value={28}>Meerut</MenuItem>
                <MenuItem value={29}>Aurangabad</MenuItem>
                <MenuItem value={30}>Srinagar</MenuItem>
                <MenuItem value={31}>Dhanbad</MenuItem>
              </TextField>
              {/* </Select> */}
            </Grid>
            <br />
            <Grid item xs={12} md={5.3}>
              <TextField
                fullWidth
                required
                select
                id="destination"
                label="Destination"
                SelectProps={{ MenuProps: MenuProps }}
              >
                <MenuItem value={1}>Mumbai</MenuItem>
                <MenuItem value={2}>Goa</MenuItem>
                <MenuItem value={3}>Pune</MenuItem>
                <MenuItem value={4}>Panjim</MenuItem>
                <MenuItem value={5}>Rajasthan</MenuItem>
                <MenuItem value={6}>Udaipur</MenuItem>
                <MenuItem value={7}>Rajkot</MenuItem>
                <MenuItem value={8}>Surat</MenuItem>
                <MenuItem value={9}>Vadodara</MenuItem>
                <MenuItem value={10}>Delhi</MenuItem>
                <MenuItem value={11}>Bangalore</MenuItem>
                <MenuItem value={12}>Hyderabad</MenuItem>
                <MenuItem value={13}>Ahmedabad</MenuItem>
                <MenuItem value={14}>Chennai</MenuItem>
                <MenuItem value={15}>Kolkata</MenuItem>
                <MenuItem value={16}>Jaipur</MenuItem>
                <MenuItem value={17}>Lucknow</MenuItem>
                <MenuItem value={18}>Kanpur</MenuItem>
                <MenuItem value={19}>Nagpur</MenuItem>
                <MenuItem value={20}>Indore</MenuItem>
                <MenuItem value={21}>Thane</MenuItem>
                <MenuItem value={22}>Bhopal</MenuItem>
                <MenuItem value={23}>Patna</MenuItem>
                <MenuItem value={24}>Agra</MenuItem>
                <MenuItem value={25}>Nashik</MenuItem>
                <MenuItem value={26}>Faridabad</MenuItem>
                <MenuItem value={27}>Varanasi</MenuItem>
                <MenuItem value={28}>Meerut</MenuItem>
                <MenuItem value={29}>Aurangabad</MenuItem>
                <MenuItem value={30}>Srinagar</MenuItem>
                <MenuItem value={31}>Dhanbad</MenuItem>
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
                  label="Arrival Time"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  label="Departure Time"
                  value={value}
                  onChange={handleChange}
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
