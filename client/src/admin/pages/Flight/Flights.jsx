import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Flights = () => {
  const [getFLights, setFlights] = useState("");

  useEffect(() => {
    const getFLights = async () => {
      const result = await fetch(`/flight/details`);
      const getData = await result.json();
      setFlights(getData.flights.rows);
    };
    getFLights();
  },[]);
  return (
    <div className='flightLsit'>
      <div class='container my-5'>
        <div class='shadow-4 rounded-5 overflow-hidden'>
          <table class='table align-middle mb-0 bg-white'>
            <thead class='bg-light'>
              <tr>
                <th>Flight Name</th>
                <th>Flight Number</th>
                <th>Flight Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getFLights &&
                getFLights.map((flight) => (
                  <tr>
                    <td>
                      <div class='d-flex align-items-center'>
                        <FontAwesomeIcon
                          icon={faPlane}
                          style={{ width: "30px", height: "30px" }}
                          class='rounded-circle'
                        />
                        <div class='ms-3'>
                          <p class='fw-bold mb-1'>{flight?.flight_name}</p>
                          <p class='text-muted mb-0'>john.doe@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class='fw-bold mb-1'>{flight?.id}</p>
                      <p class='text-muted mb-0'>IT department</p>
                    </td>
                    <td>{flight?.flight_type}</td>
                    <td>
                      <span class='badge badge-success rounded-pill'>
                        Active
                      </span>
                    </td>
                    <td>
                      <Link to='/admin/transportDetailAndSchedule'>
                        <button
                          type='button'
                          className='btn btn-link btn-sm btn-rounded'>
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Flights;
