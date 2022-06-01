const db = require("../models");
const Flight = db.flight_details;
const createError = require("../utils/error");
const Apifeatures = require("../utils/apiFeatures");
const { flightSchema } = require("../utils/validationSchema");

async function checkExists(flight_number) {
  const flight = await Flight.findAll({
    where: { flight_number: flight_number },
  });
  return flight.length > 0 ? true : false;
}

const createFlight = async (req, res, next) => {
  try {
    const result = await flightSchema.validateAsync(req.body);
    const status = await checkExists(result.flight_number);
    if (status)
      return next(
        createError(
          401,
          `${result.flight_number} already exist please use another FlightNumber`
        )
      );
    const newFlight = await Flight.create({
      flight_name: result.flight_name,
      flight_type: result.flight_type,
      flight_number: result.flight_number,
    });
    await newFlight.save();
    res.status(200).send("Flight added successfully");
  } catch (err) {
    if (err.isJoi) err.status = 422;
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
