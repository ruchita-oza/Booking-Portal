const express = require("express");
const router = express.Router();
const {
  updateFlight,
  deleteFlight,
  getFlights,
  createFlight,
  getFlightByFlightNumber,
  // getAllFlights,
  deleteFlightDetailAndSchedule,
} = require("../controllers/flightController");

router.get("/", getFlights);
// router.get("/", getAllFlights);
router.post("/", createFlight);

router.put("/:id", updateFlight);

router.get("/:id", getFlightByFlightNumber);
router.delete("/:id", deleteFlight);
router.delete(
  "/deleteFlightDetailAndSchedule/:id",
  deleteFlightDetailAndSchedule
);
module.exports = router;
