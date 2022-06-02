const express = require("express");
const router = express.Router();

const {
  createTrain,
  updateTrain,
  deleteTrain,
  getTrainByTrainNumber,
  getAllTrain,
} = require("../controllers/trainDetailsController");

router.post("/", createTrain);
router.put("/:id", updateTrain);
router.delete("/:id", deleteTrain);
router.get("/:id", getTrainByTrainNumber);
router.get("/", getAllTrain);

module.exports = router;
