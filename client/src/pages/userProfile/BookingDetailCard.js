import React, { useState } from "react";
import ParseDate from "../../Utilities/ParseDate";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import selectUser from "../../redux/users/selectors";

function BookingDetailCard({ booking }) {
  const navigate = useNavigate();
  const StyleChip = withStyles({
    root: {
      // backgroundColor:'salmon'
      height: "25px",
      // padding: "1px",
    },
  })(Chip);
  const [editOpen, setEditOpen] = useState(false);
  const handleBookingClick = (e, booking) => {
    console.log(booking);
    navigate(`/UserProfile/Bookings/${booking.id}`);
  };
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5">
            {booking.transport_type == "flight"
              ? booking.flight_schedule?.source_name?.city_name +
                " to " +
                booking.flight_schedule?.destination_name?.city_name +
                " "
              : booking.transport_type == "bus"
              ? booking.bus_schedule?.source_name?.city_name +
                " to " +
                booking.bus_schedule?.destination_name?.city_name +
                " "
              : booking.train_schedule?.source_name?.city_name +
                " to " +
                booking.train_schedule?.destination_name?.city_name +
                " "}
            <StyleChip label={"  " + booking.booking_status} color="success" />
            <Button
              variant="outlined"
              className="pull-right"
              startIcon={<DescriptionOutlinedIcon />}
              onClick={(e) => {
                handleBookingClick(e, booking);
              }}
            >
              Your Booking Details
            </Button>
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
            Tranport type: {" " + booking.transport_type}
            <br />
            Journey date:{" "}
            {" " + ParseDate.ParseDate(booking.journey_date, true)}
            <br />
            Total tickets: {" " + booking.total_ticket_count}
            <br />
            Total fare: {" " + booking.total_fare}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingDetailCard;
