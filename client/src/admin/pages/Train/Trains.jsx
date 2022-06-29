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
import TablePagination from "@mui/material/TablePagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@mui/material";
import "./trains.css";
import toast from "react-hot-toast";
import NoSchedule from "../../components/NoSchedule";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import Pagination from "react-js-pagination";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [getTrainSchedule, setTrainSchedule] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openID, setOpenID] = React.useState("");
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTrainSchedule = async (id) => {
    const result = await fetch(
      `/train/schedule?train_id=${id}&page=${currentPage}`
    );
    const getData = await result.json();
    setTrainSchedule(getData);
  };

  const handleArrowOpen = async (id) => {
    setOpenID(id);
    setOpen(!open);
    fetchTrainSchedule(id);
  };

  const navigate = useNavigate();

  function handleEditAction(trainNumber) {
    navigate("/admin/editTransportDetailAndSchedule/" + trainNumber);
  }

  React.useEffect(() => {
    setCurrentPage(1);
  }, [row]);

  React.useEffect(() => {
    if (openID) fetchTrainSchedule(openID);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `/train/details/deleteTrainDetailAndSchedule/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.status != true) {
        throw new Error(data.message);
      } else {
        toast.success(`${id} disabled successfully`);
        props.FetchTrains();
        fetchTrainSchedule(id);
      }
    } catch (err) {
      toast.error(err);
    }
    handleClose();
  };

  const handleActive = async (id) => {
    try {
      const input = { deletedAt: null };
      const res = await fetch(`/adminApi/trains/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.status != true) {
        throw new Error(data.message);
      } else {
        toast.success(`${id} enabled successfully`);
        props.FetchTrains();
        fetchTrainSchedule(id);
      }
    } catch (err) {
      toast.error(err);
    }
    handleClose();
  };

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

        <TableCell align="center">{row?.train_name}</TableCell>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="center">{row?.train_type}</TableCell>
        <TableCell align="center">
          <span
            className={`badge rounded-pill ${
              row.deletedAt === null ? "badge-success" : "badge-danger"
            }`}
          >
            {row.deletedAt === null ? "active" : "deactive"}
          </span>{" "}
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Edit train details and schedules" placement="left">
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
                title="Disable train details and schedules"
                placement="right"
              >
                <button
                  className="btn btn-link btn-sm btn-rounded"
                  style={{
                    textDecoration: "none",
                  }}
                  disabled={row && row.deletedAt === null ? false : true}
                  onClick={handleOpen}
                >
                  <ToggleOffIcon style={{ color: "green", fontSize: "30px" }} />
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
                    >
                      Are, you sure you want to disable this train and all its
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
                title="Enable train details and schedules"
                placement="right"
              >
                <button
                  className="btn btn-link btn-sm btn-rounded"
                  style={{
                    textDecoration: "none",
                  }}
                  disabled={row && row.deletedAt === null ? true : false}
                  onClick={handleOpen}
                >
                  <ToggleOnIcon
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
                    >
                      Are, you sure you want to enable this train and all its
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
            {getTrainSchedule?.data?.rows?.length === 0 ? (
              <NoSchedule />
            ) : (
              <Box sx={{ margin: 1 }}>
                <Typography
                  className="fw-bold"
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="center"
                >
                  Schedule
                </Typography>
                <Typography
                  className="fw-bold"
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="center"
                ></Typography>

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
                    {getTrainSchedule &&
                      getTrainSchedule.data.rows.map((trains) => (
                        <TableRow>
                          <TableCell align="center">
                            {trains?.source_name?.city_name}
                          </TableCell>
                          <TableCell align="center">
                            {trains?.destination_name?.city_name}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(trains?.departure_time, true)}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(trains?.arrival_time, true)}
                          </TableCell>
                          <TableCell align="center">
                            {trains?.total_available_seats}
                          </TableCell>
                          <TableCell align="center">
                            {trains?.price_per_seat}{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <Typography
                  className="fw-bold"
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="right"
                >
                  {getTrainSchedule && (
                    <div className="paginationBox pull-right">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={getTrainSchedule.resultPerPage}
                        totalItemsCount={getTrainSchedule.data.count}
                        onChange={(e) => setCurrentPage(e)}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      ></Pagination>
                    </div>
                  )}
                </Typography>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Trains = () => {
  const [getTrain, setTrain] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const FetchTrains = async () => {
    const result = await fetch(`/adminApi/trains`);
    const getData = await result.json();
    setTrain(getData.trains.rows);
  };

  useEffect(() => {
    FetchTrains();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const options = {
    filterType: "checkbox",
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
    onChangePage(currentPage) {},
    onChangeRowsPerPage(numberOfRows) {},
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
                  "& th": {
                    fontSize: "1rem",
                    color: "white",
                  },
                }}
              >
                <TableCell />
                <TableCell component="th" align="center" className="fw-bold">
                  Trains Name
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Trains Number
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Trains Type
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
              {getTrain &&
                getTrain
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((train) => (
                    <Row
                      key={train?.train_name}
                      row={train}
                      FetchTrains={FetchTrains}
                    />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getTrain?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          options={options}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          colSpan={5}
        />
      </div>
    </div>
  );
};

export default Trains;
