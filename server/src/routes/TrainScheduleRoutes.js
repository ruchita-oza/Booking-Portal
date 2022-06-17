const express = require("express");
const router = express.Router();

const {
  createTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  viewAllTrainSchedule,
  viewTrainScheduleById,
  viewTrainSchedules,
  createTrainScheduleFromArray,
  getAllTrainSchedulesByTrainId,
} = require("../controllers/trainScheduleController");

router.post("/", createTrainSchedule);
router.post("/createTrainSchedules/", createTrainScheduleFromArray);
router.post("/:id", updateTrainSchedule);
router.delete("/:id", deleteTrainSchedule);
// router.get("/", viewAllTrainSchedule);
router.get("/:id", viewTrainScheduleById);
router.get("/", viewTrainSchedules);
router.get("/getAllTrainSchedulesByTrainId/:id", getAllTrainSchedulesByTrainId);

module.exports = router;
