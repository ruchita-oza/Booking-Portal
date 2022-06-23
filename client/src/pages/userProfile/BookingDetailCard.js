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

function BookingDetailCard({ booking, status }) {
  console.log("booking : ", booking);

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
    // console.log(booking, booking.id);
    navigate(`/UserProfile/Bookings/${booking.id}`);
  };

  const handleCancel = (e, booking) => {
    var txt;
    if (window.confirm("Do you want to cancel your booking?!")) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
    }
    window.alert(txt);
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
            {booking.booking_status === "confirm" ? (
              <>
                {/* {console.log(status)} */}
                {status === "upcoming" ? (
                  <Button
                    variant="contained"
                    color="error"
                    className="pull-right"
                    // startIcon={<DescriptionOutlinedIcon />}
                    onClick={(e) => {
                      handleCancel(e, booking);
                    }}
                  >
                    Cancel Booking
                  </Button>
                ) : (
                  <></>
                )}

                <Button
                  variant="contained"
                  className="pull-right mr-2"
                  startIcon={<DescriptionOutlinedIcon />}
                  onClick={(e) => {
                    handleBookingClick(e, booking);
                  }}
                >
                  Booking Reciept
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="error"
                  className="pull-right"
                  // startIcon={<DescriptionOutlinedIcon />}
                  onClick={(e) => {
                    handleCancel(e, booking);
                  }}
                  disabled="true"
                >
                  Cancel Booking
                </Button>
                <Button
                  variant="contained"
                  className="pull-right mr-2"
                  startIcon={<DescriptionOutlinedIcon />}
                  onClick={(e) => {
                    handleBookingClick(e, booking);
                  }}
                  disabled="true"
                >
                  Booking Reciept
                </Button>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingDetailCard;
