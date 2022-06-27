const express = require("express");
const router = express.Router();
const {
  updateBus,
  deleteBus,
  // getBus,
  getBuses,
  createBus,
  getBusByBusNumber,
  deleteBusDetailAndSchedule,
} = require("../controllers/busController");

router.get("/", getBuses);
router.post("/", createBus);

router.put("/:id", updateBus);
router.get("/:id", getBusByBusNumber);
router.delete("/:id", deleteBus);
// router.get("/:id", getBus);
router.delete("/deleteBusDetailAndSchedule/:id", deleteBusDetailAndSchedule);

module.exports = router;
