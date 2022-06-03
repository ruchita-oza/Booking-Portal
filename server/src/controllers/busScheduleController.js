const db = require("../models");
const Bus = db.bus_details;
const City = db.cities;
const createError = require("../utils/error");
const BusSchedule = db.bus_schedule;
const Apifeatures = require("../utils/apiFeatures");
const { findBusScheduleById, findAllBusSchedules } = require("../dao/bus.dao");

async function checkExistsBus(id) {
  const buses = await Bus.findAll({ where: { id } });
  return buses.length > 0 ? true : false;
}

async function checkExistsCity(id) {
  const city = await City.findAll({ where: { id } });
  return city.length > 0 ? true : false;
}

async function checkExistsBusSchedule(id) {
  const busSchedule = await BusSchedule.findAll({ where: { id } });
  return busSchedule.length > 0 ? true : false;
}

const createBusSchedule = async (req, res, next) => {
  try {
    const busNumber = req.body.bus_id;
    const busStatus = await checkExistsBus(busNumber);
    const sourceCityStatus = await checkExistsCity(req.body.source);
    const destinationCityStatus = await checkExistsCity(req.body.destination);
    if (!busStatus) {
      return next(createError(422, "Error bus number does not exists"));
    }
    if (!sourceCityStatus) {
      return next(createError(422, "Error source city does not exists"));
    }
    if (!destinationCityStatus) {
      return next(createError(422, "Error destination city does exists"));
    }
    if (req.body.source === req.body.destination)
      return next(createError(401, "source and destination must be different"));
    if (req.body.departure_time === req.body.arrival_time)
      return next(
        createError(401, "departure time and arrival time must be different")
      );
    if (req.body.departure_time > req.body.arrival_time)
      return next(
        createError(401, "arrival time should be greater than departure time")
      );
    if (req.body.total_available_seats < 0)
      return next(createError(401, "total available seats must be positive"));
    if (req.body.total_available_seats == 0) {
      return next(
        createError(422, "Error total available seats cannot be zero")
      );
    }
    if (req.body.price_per_seat < 0)
      return next(createError(401, "price per seat must be positive"));
    // const bus = Bus.findOne({ where: { id: req.body.bus_id } });
    // if (!bus) return next(createError(401, "Bus not found"));
    // const source = City.findOne({ where: { id: req.body.source } });
    // if (!source) return next(createError(401, "source city not found"));
    // const destination = City.findOne({ where: { id: req.body.destination } });
    // if (!destination)
    //   return next(createError(401, "destination city not found"));
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
    return res.json({
      data: "Bus schedule created successfully",
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

const updateBusSchedule = async (req, res, next) => {
  try {
    const busScheduleId = req.params.id;
    const busId = req.body.bus_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const arrivalTime = req.body.arrival_time;
    const departureTime = req.body.departure_time;
    const pricePerSeat = req.body.price_per_seat;
    const busScheduleStatus = await checkExistsBusSchedule(busScheduleId);
    const busStatus = await checkExistsBus(busId);
    const sourceCityStatus = await checkExistsCity(source);
    const destinationCityStatus = await checkExistsCity(destination);
    if (!busScheduleStatus) {
      return next(createError(422, "Error bus schedule does not exists"));
    }
    if (!busStatus) {
      return next(createError(422, "Error bus number does not exists"));
    }
    if (!sourceCityStatus) {
      return next(createError(422, "Error source city does not exists"));
    }
    if (!destinationCityStatus) {
      return next(createError(422, "Error destination city does not exists"));
    }
    if (source == destination) {
      return next(
        createError(
          422,
          "Error source city and destination city must be different"
        )
      );
    }
    if (arrivalTime == departureTime) {
      return next(
        createError(422, "Error arrival time and departure time cannot be same")
      );
    }
    if (pricePerSeat == 0) {
      return next(createError(422, "Error price per seat cannot be zero"));
    }
    if (pricePerSeat < 0) {
      return next(createError(422, "Error price per seat cannot be negative"));
    }

    const busSchedule = await BusSchedule.update(req.body, {
      where: { id: busScheduleId },
    });
    return res.json({
      data: "Bus schedule updated successfully",
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBusSchedule = async (req, res, next) => {
  try {
    const busScheduleId = req.params.id;
    const busScheduleStatus = await checkExistsBusSchedule(busScheduleId);
    if (busScheduleStatus) {
      const busSchedule = await BusSchedule.destroy({
        where: { id: busScheduleId },
      });
      return res.json({
        data: "Bus schedule deleted successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Error bus schedule does not exists"));
    }
  } catch (err) {
    next(err);
  }
};

const getBusScheduleById = async (req, res, next) => {
  try {
    const busScheduleId = req.params.id;
    const busScheduleStatus = await checkExistsBusSchedule(busScheduleId);
    if (busScheduleStatus) {
      const busSchedule = await findBusScheduleById(busScheduleId);
      return res.json({ data: busSchedule, status: true });
    } else {
      return next(createError(422, "Error bus schedule does not exists"));
    }
  } catch (err) {
    next(err);
  }
};

const getBusSchedules = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(BusSchedule, req.query)
      .priceFilter()
      .filter();
    // let busSchedules = await apiFeatures.query;
    let busSchedules = await findAllBusSchedules();
    res.status(200).json({ busSchedules });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBusSchedule,
  updateBusSchedule,
  deleteBusSchedule,
  getBusScheduleById,
  getBusSchedules,
};
