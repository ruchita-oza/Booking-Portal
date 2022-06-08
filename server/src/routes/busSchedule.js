const express = require("express");
const router = express.Router();
const {
  updateBusSchedule,
  deleteBusSchedule,
  getBusScheduleById,
  getBusSchedules,
  createBusSchedule,
} = require("../controllers/busScheduleController");

router.get("/", getBusSchedules);
router.post("/", createBusSchedule);

router.put("/:id", updateBusSchedule);
router.delete("/:id", deleteBusSchedule);
router.get("/:id", getBusScheduleById);

module.exports = router;
