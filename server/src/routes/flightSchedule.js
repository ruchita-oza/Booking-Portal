const express = require("express");
const router = express.Router();
const {
  updateFlightSchedule,
  deleteFlightSchedule,
  getFlightScheduleById,
  createFlightSchedule,
  getAllFlightSchedules,
  createFlightScheduleFromArray,
  getAllFlightSchedulesByFlightId,
} = require("../controllers/flightScheduleController");

// router.get("/", getFlightSchedules);
router.get("/", getAllFlightSchedules);
router.post("/", createFlightSchedule);
router.post("/createFlightSchedules/", createFlightScheduleFromArray);
router.put("/:id", updateFlightSchedule);
router.delete("/:id", deleteFlightSchedule);
router.get("/:id", getFlightScheduleById);
router.get(
  "/getAllFlightSchedulesByFlightId/:id",
  getAllFlightSchedulesByFlightId
);

module.exports = router;
