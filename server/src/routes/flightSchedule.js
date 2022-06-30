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
  updateFlightScheduleFromArray,
} = require("../controllers/flightScheduleController");

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
router.post("/updateAllFlightSchedules", updateFlightScheduleFromArray);

module.exports = router;
