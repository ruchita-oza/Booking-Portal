import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
function ErrorPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>page not found!</h2>
        <p className="mb-5">
          The page you are looking for might have been removed had its name
          changed or is temporary unavailable.
        </p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
