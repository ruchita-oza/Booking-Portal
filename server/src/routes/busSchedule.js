const express = require("express");
const router = express.Router();
const {
  updateBusSchedule,
  deleteBusSchedule,
  getBusSchedule,
  getBusSchedules,
  createBusSchedule,
} = require("../controllers/busScheduleController");

router.get("/", getBusSchedules);
router.post("/", createBusSchedule);

router.put("/:id", updateBusSchedule);
router.delete("/:id", deleteBusSchedule);
router.get("/:id", getBusSchedule);

module.exports = router;
