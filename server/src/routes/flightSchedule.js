const express = require("express");
const router = express.Router();
const {
  updateFlightSchedule,
  deleteFlightSchedule,
  getFlightSchedule,
  getFlightSchedules,
  createFlightSchedule,
} = require("../controllers/flightSchedule");

router.get("/", getFlightSchedules);
router.post("/", createFlightSchedule);

router.put("/:id", updateFlightSchedule);
router.delete("/:id", deleteFlightSchedule);
router.get("/:id", getFlightSchedule);

module.exports = router;
