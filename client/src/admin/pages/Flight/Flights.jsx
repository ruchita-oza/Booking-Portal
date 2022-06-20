import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from '@mui/material/TablePagination';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [getFlightSchedule, setFlightSchedule] = useState(false);

  const FetchFlightSchedule = async (id) => {
    const result = await fetch(`/flight/schedule?flight_id=${id}`);
    const getData = await result.json();
    setFlightSchedule(getData.flightScheduleWithflights.rows);
    console.log(getFlightSchedule);
  };
  const handleArrowOpen=async(id)=>{setOpen(!open);  
  FetchFlightSchedule(id);};

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset"  } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() =>{handleArrowOpen(row.id);}} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* {console.log()} */}
        <TableCell align='center' className='fw-bold'>{row?.flight_name}</TableCell>
        <TableCell align='center' className='fw-bold'>{row?.id}</TableCell>
        <TableCell align='center'>{row?.flight_type}</TableCell>
        <TableCell align='center'>
          <span className='badge badge-success rounded-pill'>Active</span>
        </TableCell>
        <TableCell align='center'>
          <Link to='/admin/transportDetailAndSchedule'>
            <button type='button' className='btn btn-link btn-sm btn-rounded'>
              Edit
            </button>
          </Link>
        </TableCell>
      </StyledTableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Schedule
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' className='fw-bold'>Source</TableCell>
                    <TableCell align='center' className='fw-bold'>Destination</TableCell>
                    <TableCell align='center' className='fw-bold'>Departure Time</TableCell>
                    <TableCell align='center' className='fw-bold'>Arrival Time</TableCell>
                    <TableCell align='center' className='fw-bold'>Total Seats Available</TableCell>
                    <TableCell align='center' className='fw-bold'> Total price(per seat) (Rs. )
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{console.log("before map" , getFlightSchedule)}
                  {getFlightSchedule &&
                   getFlightSchedule.map((flights) => (                      
                      <TableRow >
                         <TableCell component='th' scope='row'>
                          {flights?.source}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {flights?.destination}
                        </TableCell>
                        <TableCell align='center'>
                          {flights?.departure_time}
                        </TableCell>
                        <TableCell align='center'>
                          {flights?.arrival_time}
                        </TableCell>
                        <TableCell align='center'>
                          {flights?.total_available_seats}
                        </TableCell>
                        <TableCell align='center'>
                          {flights?.price_per_seat}{" "}
                        </TableCell> 
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Flights = () => {
  
  const [getFlight, setFlight] = useState(null);

  useEffect(() => {
    const FetchFlight = async () => {
      const result = await fetch(`/flight/details`);
      const getData = await result.json();
      setFlight(getData.flights.rows);      
    };
    FetchFlight();
  }, []);

  return (
    <div className='container my-5'>
      <div className='shadow-4 rounded-5 overflow-hidden'>
        <TableContainer component={Paper}>
          <Table
            className='table align-middle mb-0 bg-white'
            aria-label='collapsible table'>
            <TableHead className='bg-light'>
              <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell component='th' align='center' className='fw-bold'>
                  Flight Name
                </StyledTableCell>
                <StyledTableCell component='th' align='center' className='fw-bold'>
                  Flight Number
                </StyledTableCell>
                <StyledTableCell component='th' align='center' className='fw-bold'>
                  Flight Type
                </StyledTableCell>
                <StyledTableCell component='th' align='center' className='fw-bold'>
                  Status
                </StyledTableCell>
                <StyledTableCell component='th' align='center' className='fw-bold'>
                  Actions
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {getFlight &&
                getFlight.map((flight) => (
                  <Row key={flight?.flight_name} row={flight} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination align="right" rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
      </div>
    </div>
  );
};

export default Flights;
