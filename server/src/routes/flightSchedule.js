const express = require("express");
const router = express.Router();
const {
  updateFlightSchedule,
  deleteFlightSchedule,
  getFlightScheduleById,
  getFlightSchedules,
  createFlightSchedule,
  getAllFlightSchedules,
} = require("../controllers/flightScheduleController");

// router.get("/", getFlightSchedules);
router.get("/", getAllFlightSchedules);
router.post("/", createFlightSchedule);

router.put("/:id", updateFlightSchedule);
router.delete("/:id", deleteFlightSchedule);
router.get("/:id", getFlightScheduleById);

module.exports = router;
