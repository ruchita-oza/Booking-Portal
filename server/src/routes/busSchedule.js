const express = require("express");
const router = express.Router();
const {
  updateBusSchedule,
  deleteBusSchedule,
  getBusScheduleById,
  getBusSchedules,
  createBusSchedule,
  createBusScheduleFromArray,
  getAllBusSchedulesByBusId,
  updateBusScheduleFromArray,
} = require("../controllers/busScheduleController");

router.get("/", getBusSchedules);
router.post("/", createBusSchedule);
router.post("/createBusSchedules/", createBusScheduleFromArray);
router.put("/:id", updateBusSchedule);
router.delete("/:id", deleteBusSchedule);
router.get("/:id", getBusScheduleById);
router.get("/getAllBusSchedulesByBusId/:id", getAllBusSchedulesByBusId);
router.post("/updateAllBusSchedules", updateBusScheduleFromArray);

module.exports = router;
