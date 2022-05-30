const express = require("express");
const router = express.Router();
const {
  updateCity,
  deleteCity,
  getCity,
  getCities,
  createCity,
} = require("../controllers/city");

router.get("/", getCities);
router.post("/", createCity);

router.put("/:id", updateCity);
router.delete("/:id", deleteCity);
router.get("/:id", getCity);

module.exports = router;
