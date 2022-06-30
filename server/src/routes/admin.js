const express = require("express");

const router = express.Router();
const {
  countAdminDetails,
  userCountPerMonth,
  adminallBuses,
  adminallFlights,
  adminallTrains,
  activeBusWithSchedule,
  activeFlightWithSchedule,
  activeTrainWithSchedule,
} = require("../controllers/adminController");

router.get("/", countAdminDetails);
router.get("/userPerMonth", userCountPerMonth);
router.get("/buses", adminallBuses);
router.put("/buses/:id", activeBusWithSchedule);
router.get("/flights", adminallFlights);
router.put("/flights/:id", activeFlightWithSchedule);
router.get("/trains", adminallTrains);
router.put("/trains/:id", activeTrainWithSchedule);

module.exports = router;
