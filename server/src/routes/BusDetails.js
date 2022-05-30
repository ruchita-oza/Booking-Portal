const express = require("express");
const router = express.Router();
const {
  updateBus,
  deleteBus,
  getBus,
  getBuses,
  createBus,
  getBusByBusNumber,
} = require("../controllers/bus");

router.get("/", getBuses);
router.post("/", createBus);

router.put("/:id", updateBus);
router.get("/:busNumber", getBusByBusNumber);
router.delete("/:id", deleteBus);
router.get("/:id", getBus);

module.exports = router;
