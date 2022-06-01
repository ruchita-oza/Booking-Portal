const db = require("../models");
const Flight = db.flight_details;
const createError = require("../utils/error");
const Apifeatures = require("../utils/apiFeatures");
const createFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findOne({
      where: { flight_number: req.body.flight_number },
    });
    if (flight)
      return next(
        createError(
          401,
          "FlightNumber already exist please use another FlightNumber"
        )
      );
    console.log(req.body);
    const newFlight = await Flight.create({
      flight_name: req.body.flight_name,
      flight_type: req.body.flight_type,
      flight_number: req.body.flight_number,
    });
    await newFlight.save();
    res.status(200).send("Flight added successfully");
  } catch (err) {
    next(err);
  }
};
const updateFlight = async (req, res, next) => {
  try {
    const updateFlight = await Flight.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateFlight) {
      return next(createError(404, "Flight not found"));
    }
    const flight = await Flight.findOne({ where: { id: req.params.id } });
    res.status(200).json({ flight, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    await Flight.destroy({ where: { id: req.params.id } });
    res.status(200).json("Flight has been deleted");
  } catch (err) {
    next(err);
  }
};

const getFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findOne({ where: { id: req.params.id } });
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};
const getFlightByFlightNumber = async (req, res, next) => {
  try {
    const flight = await Flight.findOne({
      where: { flight_number: req.params.flight_number },
    });
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};
const getFlights = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(Flight, req.query).filter();
    let flights = await apiFeatures.query;
    res.status(200).json({ flights });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFlight,
  getFlightByFlightNumber,
  updateFlight,
  deleteFlight,
  getFlight,
  getFlights,
};
