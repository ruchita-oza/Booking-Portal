import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trains = () => {
  const [getTrains, setTrains] = useState(null);

  useEffect(() => {
    const getTrains = async () => {
      const result = await fetch(`/train/details/`);
      const getData = await result.json();
      setTrains(getData.trains.rows);
      console.log(getData);
    };
    getTrains();
  },[]);

  return (
    <div className='trainList'>
      <div class='container my-5'>
        <div class='shadow-4 rounded-5 overflow-hidden'>
          <table class='table align-middle mb-0 bg-white'>
            <thead class='bg-light'>
              <tr>
                <th>Train Name</th>
                <th>Train Number</th>
                <th>Train Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getTrains &&
                getTrains.map((trains) => (
                  <tr>
                    <td>
                      <div class='d-flex align-items-center'>
                        <FontAwesomeIcon
                          icon={faTrain}
                          style={{ width: "30px", height: "30px" }}
                          class='rounded-circle'
                        />
                        <div class='ms-3'>
                          <p class='fw-bold mb-1'>{trains?.train_name}</p>
                          <p class='text-muted mb-0'>john.doe@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class='fw-bold mb-1'>{trains?.id}</p>
                      <p class='text-muted mb-0'>IT department</p>
                    </td>
                    <td>{trains?.train_type}</td>
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

export default Trains;
