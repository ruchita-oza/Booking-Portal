import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { motion } from "framer-motion";

function ResultNotFoundPage() {
  return (
    <motion.div
      id="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transform={{ duration: 0.1 }}
    >
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
    </motion.div>
  );
}

export default ResultNotFoundPage;
