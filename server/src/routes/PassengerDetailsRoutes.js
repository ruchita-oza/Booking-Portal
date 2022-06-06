const express = require("express");
const router = express.Router();

const {
  createPassengerDetails,
  deletePassengerDetails,
  updatePassengerDetailsById,
  getPassengerDetailsById,
  getAllPassengerDetails,
  getAllPassengerDetailsByBookingId,
} = require("../controllers/passengerDetailController");

router.post("/", createPassengerDetails);
router.delete("/:id", deletePassengerDetails);
router.put("/:id", updatePassengerDetailsById);
router.get("/:id", getPassengerDetailsById);
router.get("/", getAllPassengerDetails);
router.get("/booking_id/:id", getAllPassengerDetailsByBookingId);

module.exports = router;
