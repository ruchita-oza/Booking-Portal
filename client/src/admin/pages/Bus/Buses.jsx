import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buses = () => {
  const [getBus, setBus] = useState(null);

  useEffect(() => {
    const getBus = async () => {
      const result = await fetch(`/bus/details`);
      const getData = await result.json();
      setBus(getData.buses.rows);
      console.log(getData);
    };
    getBus();
  },[]);

  return (
    <div className='busList'>
      <div className='container my-5'>
        <div className='shadow-4 rounded-5 overflow-hidden'>
          <table className='table align-middle mb-0 bg-white'>
            <thead className='bg-light'>
              <tr>
                <th>Bus Name</th>
                <th>Bus Number</th>
                <th>Bus Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getBus &&
                getBus.map((bus) => (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <FontAwesomeIcon
                          icon={faBus}
                          style={{ width: "30px", height: "30px" }}
                          className='rounded-circle'
                        />
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{bus?.bus_name}</p>
                          <p className='text-muted mb-0'>john.doe@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-bold mb-1'>{bus?.id}</p>
                      <p className='text-muted mb-0'>IT department</p>
                    </td>
                    <td>{bus?.bus_type}</td>
                    <td>
                      <span className='badge badge-success rounded-pill'>
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

export default Buses;
