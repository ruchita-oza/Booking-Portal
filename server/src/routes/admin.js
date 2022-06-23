const express = require("express");

const router = express.Router();
const {
  countAdminDetails,
  userCountPerMonth,
  adminallBuses,
  adminallFlights,
  adminallTrains,
} = require("../controllers/adminController");

router.get("/", countAdminDetails);
router.get("/userPerMonth", userCountPerMonth);
router.get("/buses", adminallBuses);
router.get("/flights", adminallFlights);
router.get("/trains", adminallTrains);
// router.post("/register", register);
// router.post("/login", login);
module.exports = router;
