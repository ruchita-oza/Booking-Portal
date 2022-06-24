const express = require("express");
const router = express.Router();

const {
  createBookingRecord,
  updateBookingRecord,
  deleteBookingRecord,
  viewAllBookingRecord,
  viewBookingRecordById,
  viewBookingRecordByUserId,
  cancelBookingRecordAndChangeStatus,
} = require("../controllers/bookingRecordController");

router.post("/", createBookingRecord);
router.put("/:id", updateBookingRecord);
router.delete("/:id", deleteBookingRecord);
router.get("/", viewAllBookingRecord);
router.get("/:id", viewBookingRecordById);
router.get("/userId/:id", viewBookingRecordByUserId);
router.delete("/cancelBookingRecord/:id", cancelBookingRecordAndChangeStatus);

module.exports = router;
