const db = require("../models");
const Bus = db.bus_details;
const City = db.cities;
const createError = require("../utils/error");
const BusSchedule = db.bus_schedule;
const Apifeatures = require("../utils/apiFeatures");
const {
  findBusScheduleById,
  findAllBusSchedules,
  findAllBusSchedulesByBusId,
} = require("../dao/bus.dao");

async function checkExistsBus(id) {
  const buses = await Bus.findAll({ where: { id: id } });
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
          "Error departure time of source city cannot be greater than arrival time of destination city"
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
    const totalAvailableSeats = req.body.total_available_seats;
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

    if (departureTime > arrivalTime) {
      return next(
        createError(
          422,
          "Error departure time of source city cannot be greater than arrival time of destination city"
        )
      );
    }

    if (arrivalTime == departureTime) {
      return next(
        createError(422, "Error arrival time and departure time cannot be same")
      );
    }

    if (totalAvailableSeats < 0) {
      return next(
        createError(422, "Error total available seats cannot be negative")
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

      let bus_schedule_data = JSON.parse(JSON.stringify(busSchedule[0]));
      bus_schedule_data.source_name = bus_schedule_data.source_name?.city_name;
      bus_schedule_data.destination_name =
        bus_schedule_data.destination_name?.city_name;

      return res.json({ data: bus_schedule_data, status: true });
    } else {
      return next(createError(422, "Error bus schedule does not exists"));
    }
  } catch (err) {
    next(err);
  }
};

const getBusSchedules = async (req, res, next) => {
  try {
    const resultPerPage = 4;
    const apiFeatures = new Apifeatures(BusSchedule, req.query)
      .priceFilter()
      .timeFilter()
      .TicketFilter()
      .pagination(resultPerPage)
      .filter();

    let busScheduleWithBuses = await findAllBusSchedules({
      queryCopy: apiFeatures.queryCopy,
      priceQuery: apiFeatures.priceQuery,
      timeQuery: apiFeatures.timeQuery,
      ticketQuery: apiFeatures.ticketQuery,
      skip: apiFeatures.skip,
      resultPerPage,
    });
    let filteredPerCount = busScheduleWithBuses.rows.length;
    res
      .status(200)
      .json({ busScheduleWithBuses, filteredPerCount, resultPerPage });
  } catch (err) {
    next(err);
  }
};

const createBusScheduleFromArray = async (req, res, next) => {
  try {
    let scheduleData = req.body;

    if (scheduleData.length == 0) {
      return next(createError(422, "Error no bus schedule data entered"));
    }

    for (let i = 0; i < scheduleData.length; i++) {
      try {
        const busId = scheduleData[i].bus_id;
        const source = scheduleData[i]?.source;
        const destination = scheduleData[i]?.destination;
        const arrivalTime = scheduleData[i]?.arrival_time;
        const departureTime = scheduleData[i]?.departure_time;
        const totalAvailableSeats = scheduleData[i]?.total_available_seats;
        const pricePerSeat = scheduleData[i]?.price_per_seat;

        const busExistsStatus = await checkExistsBus(busId);
        const sourceCityStatus = await checkExistsCity(source);
        const destinationCityStatus = await checkExistsCity(destination);

        if (!busExistsStatus) {
          return next(createError(422, "Error bus does not exists"));
        }

        if (!sourceCityStatus) {
          return next(createError(422, "Error source city does not exists"));
        }

        if (!destinationCityStatus) {
          return next(
            createError(422, "Error destination city does not exists")
          );
        }

        if (source == destination) {
          return next(
            createError(422, "Error source and destination city cannot be same")
          );
        }

        if (arrivalTime == departureTime) {
          return next(
            createError(
              422,
              "Error arrival time and departure time cannot be same"
            )
          );
        }

        if (departureTime > arrivalTime) {
          return next(
            createError(
              422,
              "Error departure time of source city cannot be greater than arrival time of destination city"
            )
          );
        }

        if (totalAvailableSeats == 0) {
          return next(
            createError(422, "Error total available seat cannot be zero")
          );
        }

        if (totalAvailableSeats < 0) {
          return next(
            createError(422, "Error total available seats cannot be negative")
          );
        }

        if (pricePerSeat == 0) {
          return next(createError(422, "Error price per seat cannot be zero"));
        }

        if (pricePerSeat < 0) {
          return next(
            createError(422, "Error price per seat cannot be less than zero")
          );
        }

        const busSchedule = await BusSchedule.create(scheduleData[i]);
        await busSchedule.save();
      } catch (error) {
        throw error;
      }
    }

    return res.json({
      data: "Bus schedule created successfully",
      status: true,
    });
  } catch (error) {
    return next(createError(500, "Error while creating bus schedule " + error));
  }
};

const updateBusScheduleFromArray = async (req, res, next) => {
  try {
    let scheduleData = req.body;

    if (scheduleData.length == 0) {
      return next(createError(422, "Error no bus schedule data exists"));
    }

    for (let i = 0; i < scheduleData.length; i++) {
      try {
        const busScheduleId = scheduleData[i]?.id;
        const busId = scheduleData[i]?.transportId;
        const source = scheduleData[i]?.source;
        const destination = scheduleData[i]?.destination;
        const arrivalTime = scheduleData[i]?.arrival_time;
        const departureTime = scheduleData[i]?.departure_time;
        const totalAvailableSeats = scheduleData[i]?.total_available_seats;
        const pricePerSeat = scheduleData[i]?.price_per_seat;

        const busExistsStatus = await checkExistsBus(busId);
        const busScheduleStatus = await checkExistsBusSchedule(busScheduleId);
        const sourceCityStatus = await checkExistsCity(source);
        const destinationCityStatus = await checkExistsCity(destination);

        // if (!busExistsStatus) {
        //   return next(createError(422, "Error bus does not exists"));
        // }

        // if (!busScheduleStatus) {
        //   return next(createError(422, "Error bus schedule does not exists"));
        // }

        if (!sourceCityStatus) {
          return next(createError(422, "Error source city does not exists"));
        }

        if (!destinationCityStatus) {
          return next(
            createError(422, "Error destination city does not exists")
          );
        }

        if (source == destination) {
          return next(
            createError(422, "Error source and destination city cannot be same")
          );
        }

        if (arrivalTime == departureTime) {
          return next(
            createError(
              422,
              "Error arrival time and departure time cannot be same"
            )
          );
        }

        if (departureTime > arrivalTime) {
          return next(
            createError(
              422,
              "Error departure time of source city cannot be greater than arrival time of destination city"
            )
          );
        }

        if (totalAvailableSeats < 0) {
          return next(
            createError(422, "Error total available seats cannot be negative")
          );
        }

        if (pricePerSeat == 0) {
          return next(createError(422, "Error price per seat cannot be zero"));
        }

        if (pricePerSeat < 0) {
          return next(
            createError(422, "Error price per seat cannot be less than zero")
          );
        }

        if (!busScheduleStatus) {
          if (!busExistsStatus) {
            return next(createError(422, "Error bus does not exists"));
          }

          const newBusScheduleData = {
            bus_id: busId,
            source: source,
            destination: destination,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            total_available_seats: totalAvailableSeats,
            price_per_seat: pricePerSeat,
          };

          if (totalAvailableSeats == 0) {
            return next(
              createError(422, "Error total available seat cannot be zero")
            );
          }

          const busScheduleDetail = await BusSchedule.create(
            newBusScheduleData
          );
          await busScheduleDetail.save();
        } else {
          const busSchedule = await BusSchedule.update(scheduleData[i], {
            where: { id: busScheduleId },
          });
        }
      } catch (error) {
        throw error;
      }
    }

    return res.json({
      data: "Bus schedule updated successfully",
      status: true,
    });
  } catch (error) {
    return next(createError(500, "Error while updating bus schedule " + error));
  }
};

const getAllBusSchedulesByBusId = async (req, res, next) => {
  try {
    const busId = req.params.id;
    const busSchedules = await findAllBusSchedulesByBusId(busId);
    return res.json({ data: busSchedules, status: true });
  } catch (error) {
    return next(createError(500, "Error while fetching bus schedules"));
  }
};

module.exports = {
  createBusSchedule,
  updateBusSchedule,
  deleteBusSchedule,
  getBusScheduleById,
  getBusSchedules,
  createBusScheduleFromArray,
  getAllBusSchedulesByBusId,
  updateBusScheduleFromArray,
};
