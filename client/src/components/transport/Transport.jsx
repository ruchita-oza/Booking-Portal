import React from 'react'
import './transport.css'

const transport = () => {
  return (

    <>
      <div className="controls-top">
        <a className="btn-floating" href="/" data-slide="prev"><i className="fas fa-chevron-left"></i></a>
        <a className="btn-floating" href="/" data-slide="next"><i className="fas fa-chevron-right"></i></a>
      </div>
      <ol className="carousel-indicators">
          <li data-target="/" data-slide-to="0" className="active"></li>
          <li data-target="/" data-slide-to="1"></li>
      </ol>

      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active ">
          <div className="col-md-6" style={{float:"center", align:"center", margin:"auto", background_color:"blue"}}>
            <div className="card mb-5 shadow-lg p-3 mb-5 bg-white rounded-lg">
              <div className="row">
                <div className="col-md-6">
                  <img src="https://content.presentermedia.com/content/animsp/00007000/7148/airplane_passenger_ride_md_nwm_v2.gif" alt="true" width="180" height="100px" />
                </div>
                <div className="col-md-6">
                  <h5>Domestic/International Flights</h5>
                  <p>Call +91-976354788 for any help and qery. <br/> Call +91-8320028900 for booking.</p>
                </div>     
              </div>                   
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default transport