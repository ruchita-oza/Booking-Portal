import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { motion } from "framer-motion";
function ErrorPage() {
  return (
    <motion.div
      id="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
}

export default ErrorPage;
