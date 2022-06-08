const express = require("express");
const router = express.Router();

const {
  createBookingRecord,
  updateBookingRecord,
  deleteBookingRecord,
  viewAllBookingRecord,
  viewBookingRecordById,
  viewBookingRecordByUserId,
} = require("../controllers/bookingRecordController");

router.post("/", createBookingRecord);
router.put("/:id", updateBookingRecord);
router.delete("/:id", deleteBookingRecord);
router.get("/", viewAllBookingRecord);
router.get("/:id", viewBookingRecordById);
router.get("/userId/:id", viewBookingRecordByUserId);

module.exports = router;
