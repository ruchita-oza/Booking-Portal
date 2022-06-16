// const User = require("../models/Users");
const db = require("../models");
const User = db.users;

async function checkExistsUser(id) {
  const users = await User.findAll({ where: { id } });
  return users.length > 0 ? true : false;
}

const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateUser) {
      return next(createError(404, "User not found"));
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    const { password, ...otherDetails } = user.dataValues;
    res
      .status(200)
      .json({
        data: "User details updated successfully",
        user: { ...otherDetails },
        success: true,
      });
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
    const userId = req.params.id;
    const status = await checkExistsUser(userId);
    if (status) {
      const user = await User.findAll({ where: { id: userId } });
      const {password , ...otherDetails} = user;
      return res.json({ data: otherDetails, status: true });
    }
    return next(createError(422, "Error user does not exists"));
  } catch (error) {
    return next(createError(500, "Error while fetching user details " + error));
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAndCountAll({ where: { is_admin: "User" } });
    // const {...otherDetails} = users
    res.status(200).json({ users});
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUser, deleteUser, getUser, getUsers };
