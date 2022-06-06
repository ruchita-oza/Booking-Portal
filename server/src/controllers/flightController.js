const db = require("../models");
const Flight = db.flight_details;
const createError = require("../utils/error");
const Apifeatures = require("../utils/apiFeatures");
const { flightSchema } = require("../utils/validationSchema");

async function checkExists(flight_number) {
  const flight = await Flight.findAll({
    where: { id: flight_number },
  });
  return flight.length > 0 ? true : false;
}

const createFlight = async (req, res, next) => {
  try {
    const result = await flightSchema.validateAsync(req.body);
    const status = await checkExists(result.id);
    if (status)
      return next(
        createError(
          401,
          `${result.id} already exists please use another FlightNumber`
        )
      );
    const newFlight = await Flight.create({
      id: result.id,
      flight_name: result.flight_name,
      flight_type: result.flight_type,
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
    const id = req.params.id;
    const status = await checkExists(id);
    if (status) {
      const data = await flightSchema.validateAsync(req.body);
      const flight = await Flight.update(data, { where: { id } });
      return res.json({
        data: "Flight details updated successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Error flight number does not exists"));
    }
  } catch (err) {
    return next(createError(500, "Error while updating flight details " + err));
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = await checkExists(id);
    if (status) {
      const flight = await Flight.destroy({ where: { id } });
      return res.json({
        data: "Flight details deleted successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Error flight number does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while deleting flight details " + error)
    );
  }
};

const getFlightByFlightNumber = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = await checkExists(id);
    if (status) {
      const flight = await Flight.findAll({ where: { id } });
      return res.json({ data: flight, status: true });
    } else {
      return next(createError(422, "Error flight number does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching flight details " + error)
    );
  }
};

const getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({});
    return res.json({ data: flights, status: true });
  } catch (error) {
    return next(
      createError(500, "Error while fetching flight details " + error)
    );
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
  getFlights,
  // getAllFlights,
};
