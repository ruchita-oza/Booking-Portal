const db = require("../models");
const createError = require("../utils/error");
const bcrypt = require("bcryptjs");
const User = db.users;
const jwt = require("jsonwebtoken");
const { authSchema } = require("../utils/validationSchema");

async function checkExists(user_email) {
  const user = await User.findAll({
    where: { email: user_email },
  });
  return user.length > 0 ? true : false;
}

const register = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const hash = bcrypt.hashSync(result.password, 10);
    const state = await checkExists(result.email);
    if (state)
      return next(
        createError(401, `${result.email} is already been registered`)
      );
    const newUser = await User.create({
      first_name: result.first_name,
      last_name: result.last_name,
      email: result.email,
      password: hash,
      phone_number: result.phone_number,
    });
    await newUser.save();
    res.status(200).json({ data: "User created successfully", success: true });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return next(createError(404, "invalid credential"));
    if(user.is_admin==="User"){
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "invalid credential"));
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET
    );
    const { password, ...otherDetails } = user.dataValues;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails, success: true });}else{
        if(user.password===req.body.password){
          const {password, ...otherDetails} = user.dataValues;
          const token = jwt.sign(
            { id: user.id, is_admin: user.is_admin },
            process.env.JWT_SECRET
          );
          res.cookie("access_token", token, { httpOnly: true}).status(200).json({ ...otherDetails, success: true})
        }else{return next(createError(400,"invalid credential"));}
      }
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };
