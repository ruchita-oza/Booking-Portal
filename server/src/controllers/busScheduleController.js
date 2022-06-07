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
    const busId = req.body.bus_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const arrivalTime = req.body.arrival_time;
    const departureTime = req.body.departure_time;
    const totalAvailableSeats = req.body.total_available_seats;
    const pricePerSeat = req.body.price_per_seat;

    const busStatus = await checkExistsBus(busId);
    const sourceCityStatus = await checkExistsCity(source);
    const destinationCityStatus = await checkExistsCity(destination);

    if (!busStatus) {
      return next(createError(422, "Error bus does not exists"));
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
          "Error source city and destination city cannot be same"
        )
      );
    }
    if (arrivalTime == departureTime) {
      return next(
        createError(422, "Error arrival time and departure time cannot be same")
      );
    }
    if (departureTime > arrivalTime) {
      return next(
        createError(
          422,
          "Error departure time cannot be greater than arrival time"
        )
      );
    }
    if (totalAvailableSeats == 0) {
      return next(
        createError(422, "Error total available seats cannot be zero")
      );
    }
    if (totalAvailableSeats < 0) {
      return next(
        createError(422, "Error total available seats cannot be negative")
      );
    }
    if (pricePerSeat < 0) {
      return next(createError(422, "Error price per seat cannot be negative"));
    }
    if (pricePerSeat == 0) {
      return next(createError(422, "Error price per seat cannot be zero"));
    }
    const busSchedule = await BusSchedule.create(req.body);
    await busSchedule.save();
    return res.json({
      data: "Bus schedule created successfully",
      status: true,
    });
  } catch (error) {
    return next(createError(500, "Error while creating bus schedule " + error));
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
      .timeFilter()
      .filter();
    let busSchedules = await apiFeatures.query;
    let busScheduleWithBuses = await findAllBusSchedules({
      queryCopy: apiFeatures.queryCopy,
      priceQuery: apiFeatures.priceQuery,
      timeQuery: apiFeatures.timeQuery,
    });
    // let busSchedules = await findAllBusSchedules();
    // console.log(busScheduleWithBuses);
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
