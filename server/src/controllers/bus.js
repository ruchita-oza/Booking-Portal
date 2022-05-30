const Bus = require("../models/BusDetails");

const createBus = async (req, res, next) => {
  try {
    const newBus = await Bus.create({
      BusName: req.body.BusName,
      BusType: req.body.BusType,
      BusNumber: req.body.BusNumber,
    });
    await newBus.save();
    res.status(200).send("Bus added successfully");
  } catch (err) {
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
const getBuses = async (req, res, next) => {
  try {
    const buses = await Bus.findAndCountAll();
    res.status(200).json({ buses });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBus, updateBus, deleteBus, getBus, getBuses };
