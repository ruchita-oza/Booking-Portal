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

function BookingDetailCard({ booking, status }) {
  // console.log("booking : ", booking);

  const navigate = useNavigate();

  const StyleChip = withStyles({
    root: {
      // backgroundColor:'salmon'
      height: "25px",
      // padding: "1px",
    },
  })(Chip);

  const [editOpen, setEditOpen] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
                  <>
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
                  </>
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
