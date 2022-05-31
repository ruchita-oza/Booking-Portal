const db = require("../models");
// const Bus = require("../models/BusDetails");
const Bus = db.bus_details;
// const City = require("../models/Cities");
const City = db.cities;
const createError = require("../utils/error");
// const BusSchedule = require("../models/BusSchedule");
const BusSchedule = db.bus_schedule;
const Apifeatures = require("../utils/apiFeatures");

const createBusSchedule = async (req, res, next) => {
  try {
    if (req.body.source === req.body.destination)
      return next(createError(401, "source and destination must be different"));
    if (req.body.departureTime === req.body.arrivalTime)
      return next(
        createError(401, "departureTime and arrivalTime must be different")
      );
    if (req.body.departureTime > req.body.arrivalTime)
      return next(
        createError(401, "arrival time should be greater than departure time")
      );
    if (req.body.totalAvailableSeats < 0)
      return next(createError(401, "totalAvailableSeats must be positive"));
    if (req.body.pricePerSeat < 0)
      return next(createError(401, "pricePerSeat must be positive"));
    const bus = Bus.findOne({ where: { id: req.body.busId } });
    if (!bus) return next(createError(401, "Bus not found"));
    const source = City.findOne({ where: { id: req.body.source } });
    if (!source) return next(createError(401, "source city not found"));
    const destination = City.findOne({ where: { id: req.body.destination } });
    if (!destination)
      return next(createError(401, "destination city not found"));
    const busSchedule = await BusSchedule.create({
      bus_id: req.body.bus_id,
      source: req.body.source,
      destination: req.body.destination,
      departure_time: req.body.departure_time,
      arrival_time: req.body.arrival_time,
      total_available_seats: req.body.total_available_seats,
      price_per_seat: req.body.price_per_seat,
    });
    await busSchedule.save();
    res.status(200).json({ success: true, busSchedule });
  } catch (err) {
    next(err);
  }
};
const updateBusSchedule = async (req, res, next) => {
  try {
    const updateBusSchedule = await BusSchedule.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateBusSchedule) {
      return next(createError(404, "BusSchedule not found"));
    }
    const busSchedule = await BusSchedule.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({ busSchedule, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteBusSchedule = async (req, res, next) => {
  try {
    await BusSchedule.destroy({ where: { id: req.params.id } });
    res.status(200).json("BusSchedule has been deleted");
  } catch (err) {
    next(err);
  }
};

const getBusSchedule = async (req, res, next) => {
  try {
    const busSchedule = await BusSchedule.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(busSchedule);
  } catch (err) {
    next(err);
  }
};
const getBusSchedules = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(BusSchedule, req.query)
      .priceFilter()
      .filter();
    let busSchedules = await apiFeatures.query;
    res.status(200).json({ busSchedules });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBusSchedule,
  updateBusSchedule,
  deleteBusSchedule,
  getBusSchedule,
  getBusSchedules,
};
