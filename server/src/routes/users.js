const express = require("express");
const { verifyToken, verifyUser } = require("../utils/verifyToken");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user you are authenticated");
});
router.get("/", getUsers);

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUser);

module.exports = router;
