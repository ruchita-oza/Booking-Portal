const express = require("express");

const router = express.Router();
const {
  countAdminDetails,
  userCountPerMonth,
} = require("../controllers/adminController");

router.get("/", countAdminDetails);
router.get("/userPerMonth", userCountPerMonth);
// router.post("/register", register);
// router.post("/login", login);
module.exports = router;
