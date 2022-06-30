const express = require("express");

const router = express.Router();
const { login, register } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("Hello from auth endpoint");
});
router.post("/register", register);
router.post("/login", login);

module.exports = router;
