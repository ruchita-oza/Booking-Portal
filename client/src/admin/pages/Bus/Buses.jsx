import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ParseDate from "../../../Utilities/ParseDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import "./buses.css";
import NoSchedule from "../../components/NoSchedule";
import toast from "react-hot-toast";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [getBusSchedule, setBusSchedule] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const fetchBusSchedule = async (id) => {
    const result = await fetch(`/bus/schedule?bus_id=${id}`);
    const getData = await result.json();
    setBusSchedule(getData.busScheduleWithBuses.rows);
    // console.log(getBusSchedule);
  };

  const handleArrowOpen = async (id) => {
    setOpen(!open);
    fetchBusSchedule(id);
  };

  const handleDelete = async (id) => {
    // console.log("at delete", id);
    // if (window.confirm(`Do you want to delete ${id}`)) {
    try {
      const res = await fetch(`/bus/details/deleteBusDetailAndSchedule/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // console.log(data);
      if (data.status != true) {
        throw new Error(data.message);
      } else {
        toast.success(`${id} deleted successfully`);
        window.location.reload();
      }
    } catch (err) {
      toast.error(err);
    }
    // }
  };

  const handleActive = async (id) => {
    // console.log("at delete", id);
    // if (window.confirm(`Do you want to Active ${id}`)) {
    try {
      const input = { deletedAt: null };
      const res = await fetch(`/adminApi/buses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      // console.log(data);
      if (data.status != true) {
        throw new Error(data.message);
      } else {
        toast.success(`${id} Active successfully`);
        window.location.reload();
      }
    } catch (err) {
      toast.error(err);
    }
    // }
  };

  const navigate = useNavigate();

  function handleEditAction(busNumber) {
    // console.log("in handle click action : ", busNumber);
    navigate("/admin/editTransportDetailAndSchedule/" + busNumber);
  }

  const useTooltipStyles = makeStyles(() => ({
    tooltip: {
      marginTop: "0%",
    },
  }));

  const classes = useTooltipStyles();

  return (
    <React.Fragment>
      <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleArrowOpen(row.id);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">{row?.bus_name}</TableCell>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="center">{row?.bus_type}</TableCell>
        <TableCell align="center">
          <span
            className={`badge rounded-pill ${
              row.deletedAt === null ? "badge-success" : "badge-danger"
            }`}
          >
            {row.deletedAt === null ? "active" : "deactive"}
          </span>
        </TableCell>
        <TableCell align="center">
          <Tooltip
            title="Edit bus details and schedules"
            placement="left"
            classes={classes}
          >
            <button
              className="btn btn-link btn-sm btn-rounded"
              onClick={() => {
                handleEditAction(row?.id);
              }}
              disabled={row.deletedAt === null ? false : true}
              style={{ textDecoration: "none" }}
            >
              <EditIcon />
            </button>
          </Tooltip>
          {row && row?.deletedAt === null ? (
            <>
              <Tooltip
                title="Disable bus details and schedules"
                placement="right"
                classes={classes}
              >
                <button
                  className="btn btn-link btn-sm btn-rounded"
                  style={{
                    textDecoration: "none",
                  }}
                  disabled={row && row.deletedAt === null ? false : true}
                  // onClick={() => handleDelete(row.id)}
                  onClick={handleOpen}
                >
                  {/* <DeleteForeverIcon style={{ color: "#cc3300" }} /> */}
                  <ToggleOffIcon
                    style={{ color: "#cc3300", fontSize: "30px" }}
                  />
                </button>
              </Tooltip>
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
                      Are, you sure you want to disable this bus and all its
                      schedules ?
                    </Typography>
                    <br />
                    <Grid container spacing={2} justifyContent="center">
                      <Grid md={6} item>
                        <Button
                          fullWidth
                          style={{ color: "white", backgroundColor: "#00C853" }}
                          variant="contained"
                          onClick={() => handleDelete(row.id)}
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
            <>
              <Tooltip
                title="Enable bus details and schedules"
                placement="right"
                classes={classes}
              >
                <button
                  className="btn btn-link btn-sm btn-rounded"
                  style={{
                    textDecoration: "none",
                  }}
                  disabled={row && row.deletedAt === null ? true : false}
                  // onClick={() => handleActive(row.id)}
                  onClick={handleOpen}
                >
                  {/* <AddCircleIcon style={{ color: "#ffcc00" }} /> */}
                  <ToggleOnIcon style={{ color: "green", fontSize: "30px" }} />
                </button>
              </Tooltip>
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
                      Are, you sure you want to enable this bus and all its
                      schedules ?
                    </Typography>
                    <br />
                    <Grid container spacing={2} justifyContent="center">
                      <Grid md={6} item>
                        <Button
                          fullWidth
                          style={{ color: "white", backgroundColor: "#00C853" }}
                          variant="contained"
                          onClick={() => handleActive(row.id)}
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
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {getBusSchedule?.length === 0 ? (
              <>
                <NoSchedule />
              </>
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography
                  className="fw-bold"
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="center"
                >
                  Schedules
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className="fw-bold">
                        Source City
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Destination City
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Departure Time of Source City
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Arrival Time of Destination City
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Total Seats Available
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Price Per Seat (₹)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getBusSchedule &&
                      getBusSchedule.map((buses) => (
                        <TableRow>
                          <TableCell align="center">
                            {buses?.source_name?.city_name}
                          </TableCell>
                          <TableCell align="center">
                            {buses?.destination_name?.city_name}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(buses?.departure_time, true)}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(buses?.arrival_time, true)}
                          </TableCell>
                          <TableCell align="center">
                            {buses?.total_available_seats}
                          </TableCell>
                          <TableCell align="center">
                            {buses?.price_per_seat}{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Buses = () => {
  const [getBus, setBus] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const FetchBus = async () => {
      const result = await fetch(`/adminApi/buses`);
      const getData = await result.json();
      setBus(getData.buses.rows);
    };
    FetchBus();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const options = {
    rowsPerPage: [3],
    rowsPerPageOptions: [1, 3, 5, 6],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "OF",
      },
    },
    onChangePage(currentPage) {
      // console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      // console.log({ numberOfRows });
    },
  };
  return (
    <div className="container my-5">
      <div className="shadow-4 rounded-5 overflow-hidden">
        <TableContainer component={Paper}>
          <Table
            className="table align-middle mb-0 bg-white"
            aria-label="collapsible table"
          >
            <TableHead className="bg-light">
              <TableRow
                sx={{
                  backgroundColor: "#003580",
                  // borderBottom: "2px solid black",
                  "& th": {
                    fontSize: "1rem",
                    color: "white",
                  },
                }}
              >
                <TableCell />
                <TableCell component="th" align="center" className="fw-bold">
                  Bus Name
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Bus Number
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Bus Type
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Status
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getBus &&
                getBus
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bus) => <Row key={bus?.id} row={bus} />)}
            </TableBody>
          </Table>
        </TableContainer>
        {getBus && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={getBus.length}
            rowsPerPage={rowsPerPage}
            page={page}
            options={options}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default Buses;
