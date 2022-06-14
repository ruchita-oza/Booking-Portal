const db = require("../models");
const { Op } = require("sequelize");
const Flight = db.flight_details;
const City = db.cities;
const createError = require("../utils/error");
const FlightSchedule = db.flight_schedule;
const Apifeatures = require("../utils/apiFeatures");
const {
  findFlightScheduleById,
  findAllFlightSchedules,
} = require("../dao/flight.dao");

async function checkExistsFlight(id) {
  console.log(id);
  const flights = await Flight.findAll({ where: { id: id } });
  console.log(flights);
  return flights.length > 0 ? true : false;
}

async function checkExistsFlightSchedule(id) {
  const flightSchedules = await FlightSchedule.findAll({ where: { id } });
  return flightSchedules.length > 0 ? true : false;
}

async function checkExistsCity(id) {
  const cities = await City.findAll({ where: { id } });
  return cities.length > 0 ? true : false;
}

const createFlightSchedule = async (req, res, next) => {
  try {
    const flight_id = req.body.flight_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const departure_time = req.body.departure_time;
    const arrival_time = req.body.arrival_time;
    const total_available_seats = req.body.total_available_seats;
    const price_per_seat = req.body.price_per_seat;

    const flightStatus = await checkExistsFlight(flight_id);
    const sourceCityStatus = await checkExistsCity(source);
    const destinationCityStatus = await checkExistsCity(destination);
    if (!flightStatus) {
      return next(createError(422, "Error flight does not exists"));
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
    if (arrival_time == departure_time) {
      return next(
        createError(422, "Error arrival time and departure time cannot be same")
      );
    }
    if (departure_time > arrival_time) {
      return next(
        createError(
          422,
          "Error departure time cannot be greater than arrival time"
        )
      );
    }
    if (total_available_seats < 0) {
      return next(
        createError(422, "Error total available seats cannot be negative")
      );
    }
    if (total_available_seats == 0) {
      return next(
        createError(422, "Error total available seats cannot be zero")
      );
    }
    if (price_per_seat < 0) {
      return next(createError(422, "Error price per seat cannot be negative"));
    }
    if (price_per_seat == 0) {
      return next(createError(422, "Error price per seat cannot be zero"));
    }
    console.log(req.body);
    const flightSchedule = await FlightSchedule.create(req.body);
    const data = await flightSchedule.save();
    return res.json({
      message: "Flight schedule created successfully",
      status: true,
      data: data,
    });
  } catch (error) {
    return next(
      createError(500, "Error while creating flight schedule " + error)
    );
  }
};

const updateFlightSchedule = async (req, res, next) => {
  try {
    const flightScheduleId = req.params.id;
    const flightId = req.body.flight_id;
    const source = req.body.source;
    const destination = req.body.destination;
    const departureTime = req.body.departure_time;
    const arrivalTime = req.body.arrival_time;
    const totalAvailableSeats = req.body.total_available_seats;
    const pricePerSeat = req.body.price_per_seat;

    const flightScheduleStatus = await checkExistsFlightSchedule(
      flightScheduleId
    );
    const flightStatus = await checkExistsFlight(flightId);
    const sourceCityStatus = await checkExistsCity(source);
    const destinationCityStatus = await checkExistsCity(destination);

    if (!flightScheduleStatus) {
      return next(createError(422, "Error flight schedule does not exists"));
    }
    if (!flightStatus) {
      return next(createError(422, "Error flight number does not exists"));
    }
    if (!sourceCityStatus) {
      return next(createError(422, "Error source city does not exists"));
    }
    if (!destinationCityStatus) {
      return next(createError(422, "Error destination city does not exists"));
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
    console.log("req.body : " + req.body);
    const flightSchedule = await FlightSchedule.update(req.body, {
      where: { id: flightScheduleId },
    });
    return res.json({
      data: "Flight schedule updated successfully",
      status: true,
    });
  } catch (error) {
    return next(
      createError(500, "Error while updating flight schedule " + error)
    );
  }
};

const deleteFlightSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = await checkExistsFlightSchedule(id);
    if (status) {
      const flightSchedule = await FlightSchedule.destroy({ where: { id } });
      return res.json({
        data: "Flight schedule deleted successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Error flight schedule does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while deleting flight schedule " + error)
    );
  }
};

const getFlightScheduleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = await checkExistsFlightSchedule(id);
    if (status) {
      // const flightSchedule = await FlightSchedule.findAll({ where: { id } });
      const flightSchedule = await findFlightScheduleById(id);

      let flight_schedule_data = JSON.parse(JSON.stringify(flightSchedule[0]));
      flight_schedule_data.source_name =
        flight_schedule_data.source_name?.city_name;
      flight_schedule_data.destination_name =
        flight_schedule_data.destination_name?.city_name;

      return res.json({ data: flight_schedule_data, status: true });
    } else {
      return next(createError(422, "Error flight schedule does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching flight schedule details " + error)
    );
  }
};

const getAllFlightSchedules = async (req, res, next) => {
  try {
    const apiFeatures = new Apifeatures(FlightSchedule, req.query)
      .priceFilter()
      .timeFilter()
      .filter();

    console.log("at flight schedule");
    console.log(apiFeatures.priceQuery);
    let flightScheduleWithflights = await findAllFlightSchedules({
      queryCopy: apiFeatures.queryCopy,
      priceQuery: apiFeatures.priceQuery,
      timeQuery: apiFeatures.timeQuery,
    });

    // let data = [];
    // let flight_schedule_data = JSON.parse(
    //   JSON.stringify(flightScheduleWithflights)
    // );
    // console.log(flight_schedule_data);
    // flight_schedule_data.forEach((element) => {
    //   let flight_schedule = [...element];
    //   flight_schedule.source_name = element.source_name[0]?.city_name;
    //   flight_schedule.destination_name = element.destination_name[0]?.city_name;
    //   data.push(flight_schedule);
    // });

    res.status(200).json({ flightScheduleWithflights, success: true });
  } catch (error) {
    return next(createError(500, error));
  }
};

const getFlightSchedules = async (req, res, next) => {
  try {
    console.log(req.query);
    const apiFeatures = new Apifeatures(FlightSchedule, req.query)
      .priceFilter()
      .filter();
    let flightSchedules = await apiFeatures.query;

    // const flightSchedulees = await FlightSchedule.findAndCountAll();
    res.status(200).json({ flightSchedules });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFlightSchedule,
  updateFlightSchedule,
  deleteFlightSchedule,
  getFlightScheduleById,
  getFlightSchedules,
  getAllFlightSchedules,
};
