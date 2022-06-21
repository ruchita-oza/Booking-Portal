// const { Op } = require("sequelize");
// const City = require("../models/Cities");
// const Sequelize = require("sequelize");
const { citySchema } = require("../utils/validationSchema");
const db = require("../models");
const City = db.cities;
const Apifeatures = require("../utils/apiFeatures");
const States = db.states;

const checkStateStatus = async (state_name) => {
  const state = await States.findAll({ where: { state_name: state_name } });
  return state.length > 0 ? true : false;
};
const checkCityExists = async (city_name) => {
  const city = await City.findAll({ where: { city_name: city_name } });
  return city.length > 0 ? true : false;
};
const createCity = async (req, res, next) => {
  try {
    const result = await citySchema.validateAsync(req.body);
    const status = await checkStateStatus(result.state_name);
    if (status === false)
      return next(
        createError(
          401,
          `${result.state_name} does not exist .. please Enter valid state`
        )
      );
    const checkCity = await checkCityExists(result.city_name);
    if (checkCity)
      return next(createError(401, `${result.city_name} already exists`));
    const newCity = await City.create({
      city_name: result.city_name,
      state_name: result.state_name,
    });
    await newCity.save();
    res.status(200).send("City added successfully");
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};
const updateCity = async (req, res, next) => {
  try {
    const updateCity = await City.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateCity) {
      return next(createError(404, "City not found"));
    }
    const city = await City.findOne({ where: { id: req.params.id } });
    //console.log(city);
    res.status(200).json({ city: { city }, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteCity = async (req, res, next) => {
  try {
    await City.destroy({ where: { id: req.params.id } });
    res.status(200).json("City has been deleted");
  } catch (err) {
    next(err);
  }
};

const getCity = async (req, res, next) => {
  try {
    const city = await City.findOne({ where: { id: req.params.id } });
    res.status(200).json(city);
  } catch (err) {
    next(err);
  }
};
const getCities = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(City, req.query).filter();
    let cities = await apiFeatures.query;
    res.status(200).json({ cities });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCity, updateCity, deleteCity, getCity, getCities };
