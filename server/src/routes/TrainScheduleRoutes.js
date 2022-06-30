const express = require("express");
const router = express.Router();

const {
  createTrainSchedule,
  updateTrainSchedule,
  deleteTrainSchedule,
  viewTrainScheduleById,
  viewTrainSchedules,
  createTrainScheduleFromArray,
  getAllTrainSchedulesByTrainId,
  updateTrainScheduleFromArray,
} = require("../controllers/trainScheduleController");

router.post("/", createTrainSchedule);
router.post("/createTrainSchedules/", createTrainScheduleFromArray);
router.put("/:id", updateTrainSchedule);
router.delete("/:id", deleteTrainSchedule);
router.get("/:id", viewTrainScheduleById);
router.get("/", viewTrainSchedules);
router.get("/getAllTrainSchedulesByTrainId/:id", getAllTrainSchedulesByTrainId);
router.post("/updateAllTrainSchedules", updateTrainScheduleFromArray);

module.exports = router;
