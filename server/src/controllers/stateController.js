// const { Op } = require("sequelize");
// const City = require("../models/Cities");
// const Sequelize = require("sequelize");
const { stateSchema } = require("../utils/validationSchema");
const db = require("../models");
const State = db.states;
const Apifeatures = require("../utils/apiFeatures");

const checkStateStatus = async (state_name) => {
  const state = await State.findAll({ where: { state_name: state_name } });
  return state.length > 0 ? true : false;
};

const createState = async (req, res, next) => {
  try {
    const result = await stateSchema.validateAsync(req.body);
    const status = await checkStateStatus(req.body.state_name);
    if (status)
      return next(createError(401, `${result.state_name} already exists`));
    const newState = await State.create({ state_name: result.state_name });
    await newState.save();
    res.status(200).json({
      messgae: "state added successfully",
      success: true,
      data: newState,
    });
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};
const updateState = async (req, res, next) => {
  try {
    const updateState = await State.update(
      req.body,
      { where: { state_name: req.params.state_name } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateState) {
      return next(createError(404, "State not found"));
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const deleteState = async (req, res, next) => {
  try {
    await State.destroy({ where: { state_name: req.params.state_name } });
    res.status(200).json("state has been deleted");
  } catch (err) {
    next(err);
  }
};

const getState = async (req, res, next) => {
  try {
    const state = await State.findOne({
      where: { state_name: req.params.state_name },
    });
    res.status(200).json(state);
  } catch (err) {
    next(err);
  }
};
const getStates = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(State, req.query).filter();
    let states = await apiFeatures.query;
    res.status(200).json({ states });
  } catch (err) {
    next(err);
  }
};

module.exports = { createState, updateState, deleteState, getState, getStates };
