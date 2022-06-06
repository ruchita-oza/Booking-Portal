const express = require("express");
const router = express.Router();
const {
  updateFlight,
  deleteFlight,
  getFlights,
  createFlight,
  getFlightByFlightNumber,
  getAllFlights,
} = require("../controllers/flightController");

router.get("/", getFlights);
// router.get("/", getAllFlights);
router.post("/", createFlight);

router.put("/:id", updateFlight);

router.get("/:id", getFlightByFlightNumber);
router.delete("/:id", deleteFlight);

module.exports = router;
