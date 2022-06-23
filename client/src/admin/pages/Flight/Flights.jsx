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
import { Tooltip } from "@mui/material";
import "./flights.css";
import NoSchedule from "../../components/NoSchedule";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [getFlightSchedule, setFlightSchedule] = useState(false);

  const FetchFlightSchedule = async (id) => {
    const result = await fetch(`/flight/schedule?flight_id=${id}`);
    const getData = await result.json();
    setFlightSchedule(getData.flightScheduleWithflights.rows);
    // console.log(getFlightSchedule);
  };
  const handleArrowOpen = async (id) => {
    setOpen(!open);
    FetchFlightSchedule(id);
  };

  const navigate = useNavigate();

  function handleEditAction(flightNumber) {
    navigate("/admin/editTransportDetailAndSchedule/" + flightNumber);
  }

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
        {/* {console.log()} */}
        <TableCell align="center">{row?.flight_name}</TableCell>
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="center">{row?.flight_type}</TableCell>
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
          <Tooltip title="Edit flight details and schedules" placement="left">
            <button
              className="btn btn-link btn-sm btn-rounded"
              onClick={() => {
                handleEditAction(row?.id);
              }}
              style={{ textDecoration: "none" }}
            >
              <EditIcon />
            </button>
          </Tooltip>
          <Tooltip
            title="Delete flight details and schedules"
            placement="right"
          >
            <button
              className="btn btn-link btn-sm btn-rounded"
              style={{
                textDecoration: "none",
              }}
              disable={row.deletedAt === null ? "false" : "true"}
            >
              <DeleteForeverIcon
                style={{ color: row.deletedAt === null ? "red" : "gray" }}
              />
            </button>
          </Tooltip>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            \
            {getFlightSchedule?.length === 0 ? (
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
                    {getFlightSchedule &&
                      getFlightSchedule.map((flights) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {flights?.source_name?.city_name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {flights?.destination_name?.city_name}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(
                                flights?.departure_time,
                                true
                              )}
                          </TableCell>
                          <TableCell align="center">
                            {" " +
                              ParseDate.ParseDate(flights?.arrival_time, true)}
                          </TableCell>
                          <TableCell align="center">
                            {flights?.total_available_seats}
                          </TableCell>
                          <TableCell align="center">
                            {flights?.price_per_seat}{" "}
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

const Flights = () => {
  const [getFlight, setFlight] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const FetchFlight = async () => {
      const result = await fetch(`/adminApi/flights`);
      const getData = await result.json();
      setFlight(getData.flights.rows);
    };
    FetchFlight();
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
                  Flight Name
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Flight Number
                </TableCell>
                <TableCell component="th" align="center" className="fw-bold">
                  Flight Type
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
              {getFlight &&
                getFlight
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((flight) => (
                    <Row key={flight?.flight_name} row={flight} />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getFlight?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          options={options}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Flights;
