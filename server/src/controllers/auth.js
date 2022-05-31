const db = require("../models");
const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
// const User = require("../models/Users");
const User = db.users;
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
    });
    await newUser.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return next(createError(404, "email not found"));
    console.log(user.password);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user.dataValues;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };
