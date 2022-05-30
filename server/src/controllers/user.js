const User = require("../models/Users");

const updateUser = async (req, res, next) => {
  try {
    console.log("at update");
    const updateUser = await User.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateUser) {
      return next(createError(404, "User not found"));
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    const { password, isAdmin, ...otherDetails } = user.dataValues;
    res.status(200).json({ user: { ...otherDetails }, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAndCountAll({ where: { isAdmin: "User" } });
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getUsers };
