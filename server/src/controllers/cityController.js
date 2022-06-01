// const { Op } = require("sequelize");
// const City = require("../models/Cities");
// const Sequelize = require("sequelize");
const { citySchema } = require("../utils/validationSchema");
const db = require("../models");
const City = db.cities;

const createCity = async (req, res, next) => {
  try {
    const result = await citySchema.validateAsync(req.body);
    const newCity = await City.create({ city_name: result.city_name });
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
    res.status(200).json({ city: { city }, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteCity = async (req, res, next) => {
  try {
    await City.destroy({ where: { id: req.params.id } });
    res.status(200).json("Bus has been deleted");
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
    const cities = await City.findAndCountAll();
    res.status(200).json({ cities });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCity, updateCity, deleteCity, getCity, getCities };
