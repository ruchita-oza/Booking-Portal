const express = require("express");
const router = express.Router();
const {
  updateFlight,
  deleteFlight,
  getFlight,
  getFlights,
  createFlight,
  getFlightByFlightNumber,
} = require("../controllers/flight");

router.get("/", getFlights);
router.post("/", createFlight);

router.put("/:id", updateFlight);
router.get("/:id", getFlight);

router.get("/:FlightNumber", getFlightByFlightNumber);
router.delete("/:id", deleteFlight);

module.exports = router;
