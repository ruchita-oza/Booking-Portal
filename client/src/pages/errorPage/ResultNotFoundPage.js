import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
function ResultNotFoundPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>422</h1>
        </div>
        <h2>Transport not available!</h2>
        <p className="mb-5">
          Transport you are looking for is not available at this moment.
        </p>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default ResultNotFoundPage;
