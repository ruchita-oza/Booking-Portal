// const Bus = require("../models/BusDetails");
const db = require("../models");
const Bus = db.bus_details;
const Apifeatures = require("../utils/apiFeatures");

const createError = require("../utils/error");
const { busSchema } = require("../utils/validationSchema");
async function checkExists(bus_number) {
  const bus = await Bus.findAll({
    where: { bus_number: bus_number },
  });
  return bus.length > 0 ? true : false;
}

const createBus = async (req, res, next) => {
  try {
    const result = await busSchema.validateAsync(req.body);
    console.log(result);
    const status = await checkExists(result.bus_number);
    if (status)
      return next(
        createError(
          401,
          `${result.bus_number} already exist please use another busNumber`
        )
      );
    const newBus = await Bus.create({
      bus_name: result.bus_name,
      bus_type: result.bus_type,
      bus_number: result.bus_number,
    });
    await newBus.save();
    res.status(200).send("Bus added successfully");
  } catch (err) {
    if (err.isJoi) err.status = 422;
    next(err);
  }
};
const updateBus = async (req, res, next) => {
  try {
    const updateBus = await Bus.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateBus) {
      return next(createError(404, "Bus not found"));
    }
    const bus = await Bus.findOne({ where: { id: req.params.id } });
    res.status(200).json({ bus, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteBus = async (req, res, next) => {
  try {
    await Bus.destroy({ where: { id: req.params.id } });
    res.status(200).json("Bus has been deleted");
  } catch (err) {
    next(err);
  }
};

const getBus = async (req, res, next) => {
  try {
    const bus = await Bus.findOne({ where: { id: req.params.id } });
    res.status(200).json(bus);
  } catch (err) {
    next(err);
  }
};
const getBusByBusNumber = async (req, res, next) => {
  try {
    const bus = await Bus.findOne({
      where: { bus_number: req.params.bus_number },
    });
    res.status(200).json(bus);
  } catch (err) {
    next(err);
  }
};
const getBuses = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(Bus, req.query).filter();
    let buses = await apiFeatures.query;
    res.status(200).json({ buses });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBus,
  getBusByBusNumber,
  updateBus,
  deleteBus,
  getBus,
  getBuses,
};
