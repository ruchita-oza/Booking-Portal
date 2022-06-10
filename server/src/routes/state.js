const express = require("express");
const router = express.Router();
const {
  updateState,
  deleteState,
  getState,
  getStates,
  createState,
} = require("../controllers/stateController");

router.get("/", getStates);
router.post("/", createState);
router.put("/:state_name", updateState);
router.delete("/:state_name", deleteState);
router.get("/:state_name", getState);

module.exports = router;
