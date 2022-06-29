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
  Backdrop,
  Modal,
  Fade,
  Grid,
  Box,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import dateFormat from "dateformat";
import { toast } from "react-hot-toast";
import UseDelete from "../../Utilities/UseDelete";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BookingDetailCard({
  booking,
  status,
  fetchBookingRecords,
  fetchBookingRecordsFromAdmin,
}) {
  const navigate = useNavigate();

  const StyleChip = withStyles({
    root: {
      // backgroundColor:'salmon'
      height: "25px",
      // padding: "1px",
    },
  })(Chip);

  const isAdminPage = window.location.pathname.split("/").includes("admin");

  const [editOpen, setEditOpen] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleBookingClick = (e, booking) => {
    navigate(`/UserProfile/Bookings/${booking.id}`);
  };

  var todaysDate = dateFormat(new Date(), "dd/mm/yyyy", true);

  // let twoDaysOlderDate = todaysDate.setDate(todaysDate.getDate() - 2);

  // twoDaysOlderDate = dateFormat(twoDaysOlderDate, "dd/mm/yyyy", true)

  const handleCancel = (e, booking) => {
    // var txt;
    // if (window.confirm("Do you want to cancel your booking?!")) {
    //   txt = "You pressed OK!";
    // } else {
    //   txt = "You pressed Cancel!";
    // }

    let journeyDate = ParseDate.ParseDate(booking.journey_date, false);

    let date = journeyDate.split("/");
    date[0] = date[0] - 2;
    journeyDate = date.join("/");

    // window.alert(journeyDate);

    if (journeyDate > todaysDate) {
      // /booking/record/cancelBookingRecord/
      axios
        .delete("/booking/record/cancelBookingRecord/" + booking?.id)
        .then((response) => {
          if (response?.data?.status) {
            toast.success(response?.data?.data);

            if (isAdminPage) {
              fetchBookingRecordsFromAdmin();
            } else {
              fetchBookingRecords();
            }
            // window.location.reload();
          } else {
            toast.error(response?.response?.data?.message);
          }
        });
    } else {
      toast.error(
        "You can no longer cancel your booking. As cancellation is only possible before 2 days from the scheduled journey date",
        {
          duration: 10000,
        }
      );
    }

    handleClose();
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
                {/* <Grid
                  spacing={2}
                  container
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                > */}
                {status === "upcoming" ? (
                  <>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="error"
                        className="pull-right"
                        // startIcon={<DescriptionOutlinedIcon />}
                        // onClick={(e) => {
                        //   handleCancel(e, booking);
                        // }}
                        onClick={handleOpen}
                      >
                        Cancel Booking
                      </Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={openModal}>
                          <Box sx={style}>
                            <Typography
                              style={{ color: "#616161" }}
                              id="modal-modal-title"
                              // variant="h3"
                              // component="h1"
                            >
                              Are, you sure you want to cancel this booking ?
                            </Typography>
                            <br />
                            <Grid container spacing={2} justifyContent="center">
                              <Grid md={6} item>
                                <Button
                                  fullWidth
                                  style={{
                                    color: "white",
                                    backgroundColor: "#00C853",
                                  }}
                                  variant="contained"
                                  onClick={(e) => {
                                    handleCancel(e, booking);
                                  }}
                                >
                                  Confirm
                                </Button>
                              </Grid>
                              <Grid md={6} item>
                                <Button
                                  fullWidth
                                  color="error"
                                  variant="contained"
                                  onClick={handleClose}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Fade>
                      </Modal>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    className="pull-right mr-2"
                    startIcon={<DescriptionOutlinedIcon />}
                    onClick={(e) => {
                      handleBookingClick(e, booking);
                    }}
                  >
                    Booking Receipt
                  </Button>
                </Grid>
                <br />
                {/* </Grid> */}
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
                  Booking Receipt
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
