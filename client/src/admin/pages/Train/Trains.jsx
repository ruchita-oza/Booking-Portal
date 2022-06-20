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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [getTrainSchedule, setTrainSchedule] = useState(false);

  const fetchTrainSchedule = async (id) => {
    const result = await fetch(`/train/schedule?train_id=${id}`);
    const getData = await result.json();
    setTrainSchedule(getData.data.rows);
    console.log(getData);
  };

  const handleArrowOpen=async(id)=>{setOpen(!open);  
    fetchTrainSchedule(id);};

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() =>{handleArrowOpen(row.id);}} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        <TableCell align='center'>{row?.train_name}</TableCell>
        <TableCell align='center'>{row?.id}</TableCell>
        <TableCell align='center'>{row?.train_type}</TableCell>
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
      </TableRow>

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
                    <TableCell align='center' className='fw-bold'>Total price(per seat) (Rs. )</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getTrainSchedule &&
                   getTrainSchedule.map((trains) => (                      
                      <TableRow >
                         <TableCell component='th' scope='row'>
                          {trains?.source}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {trains?.destination}
                        </TableCell>
                        <TableCell align='center'>
                          {trains?.departure_time}
                        </TableCell>
                        <TableCell align='center'>
                          {trains?.arrival_time}
                        </TableCell>
                        <TableCell align='center'>
                          {trains?.total_available_seats}
                        </TableCell>
                        <TableCell align='center'>
                          {trains?.price_per_seat}{" "}
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

const Trains = () => {
  
  const [getTrain, setTrain] = useState(null);

  useEffect(() => {
    const FetchTrains = async () => {
      const result = await fetch(`/train/details`);
      const getData = await result.json();
      setTrain(getData.data);      
    };
    FetchTrains();
  }, []);

  return (
    <div className='container my-5'>
      <div className='shadow-4 rounded-5 overflow-hidden'>
        <TableContainer component={Paper}>
          <Table
            className='table align-middle mb-0 bg-white'
            aria-label='collapsible table'>
            <TableHead className='bg-light'>
              <TableRow>
                <TableCell />
                <TableCell component='th' align='center' className='fw-bold'>
                  Trains Name
                </TableCell>
                <TableCell component='th' align='center' className='fw-bold'>
                  Trains Number
                </TableCell>
                <TableCell component='th' align='center' className='fw-bold'>
                  Trains Type
                </TableCell>
                <TableCell component='th' align='center' className='fw-bold'>
                  Status
                </TableCell>
                <TableCell component='th' align='center' className='fw-bold'>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getTrain &&
                getTrain.map((train) => (
                  <Row key={train?.train_name} row={train} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Trains;
