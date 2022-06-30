import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { motion } from "framer-motion";

function UnAuthorized() {
  return (
    <motion.div
      id="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="notfound">
        <div className="notfound-404">
          <h1>401</h1>
        </div>
        <h2>UnAuthorized!</h2>
        <p className="mb-5">You are not authorized to access this page.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </motion.div>
  );
}

export default UnAuthorized;
