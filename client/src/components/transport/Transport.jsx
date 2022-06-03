import React from "react";
import "./transport.css";

const transport = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className=" carousel slide w-5"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="w-100 carousel-inner">
        <div class=" w-100 carousel-item active">
          <div className="card d-block mb-5 shadow rounded">
            <div className="row d-flex justify-content-between">
              <div className="col-lg-3  col-md-3 d-flex justify-content-center ml-3">
                <img
                  src="https://content.presentermedia.com/content/animsp/00007000/7148/airplane_passenger_ride_md_nwm_v2.gif"
                  alt="true"
                />
              </div>
              <div className="col-lg-8 col-md-8 d-flex align-items-center justify-content-center">
                <div>
                  <h5>Domestic/International Flights</h5>
                  <p>
                    Call +91-976354788 for any help and qery. <br /> Call
                    +91-8320028900 for booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card w-100 carousel-item">
          <div className="card d-block mb-5 shadow rounded">
            <div className="row d-flex justify-content-between">
              <div className="col-md-3 d-flex justify-content-center ml-3">
                <img
                  src="https://content.presentermedia.com/content/animsp/00007000/7148/airplane_passenger_ride_md_nwm_v2.gif"
                  alt="true"
                />
              </div>
              <div className="col-lg-8 col-md-8 d-flex align-items-center justify-content-center">
                <div>
                  <h5>Book You Train</h5>
                  <p>
                    Call +91-976354788 for any help and qery. <br /> Call
                    +91-8320028900 for booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card w-100 carousel-item">
          <div className="card d-block mb-5 shadow rounded">
            <div className="row d-flex justify-content-between">
              <div className="col-lg-3  col-md-3 d-flex justify-content-center ml-3">
                <img
                  src="https://content.presentermedia.com/content/animsp/00007000/7148/airplane_passenger_ride_md_nwm_v2.gif"
                  alt="true"
                />
              </div>
              <div className="col-lg-8 col-md-8 d-flex align-items-center justify-content-center">
                <div>
                  <h5>Enjoy your ride in Supex Flexible Bus</h5>
                  <p>
                    Call +91-976354788 for any help and qery. <br /> Call
                    +91-8320028900 for booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
};

export default transport;