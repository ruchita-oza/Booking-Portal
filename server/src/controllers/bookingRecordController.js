const db = require("../models");
const BookingRecords = db.booking_records;
const Users = db.users;
const BusSchedule = db.bus_schedule;
const TrainSchedule = db.train_schedules;
const FlightSchedule = db.flight_schedule;
const createError = require("../utils/error");
const { findBookingRecordsByUserId } = require("../dao/bookingRecord.dao");

async function checkExistsBookingRecord(id) {
  const bookingrecords = await BookingRecords.findAll({ where: { id } });
  return bookingrecords.length > 0 ? true : false;
}

async function checkExistsUser(id) {
  const users = await Users.findAll({ where: { id } });
  return users.length > 0 ? true : false;
}

async function checkExistsBusSchedule(id) {
  const busSchedules = await BusSchedule.findAll({ where: { id } });
  return busSchedules.length > 0 ? true : false;
}

async function checkExistsTrainSchedule(id) {
  const trainSchedules = await TrainSchedule.findAll({ where: { id } });
  return trainSchedules.length > 0 ? true : false;
}

async function checkExistsFlightSchedule(id) {
  const flightSchedules = await FlightSchedule.findAll({ where: { id } });
  return flightSchedules.length > 0 ? true : false;
}

const createBookingRecord = async (req, res, next) => {
  try {
    const user_id = req.body.cust_id;
    const transportId = req.body.transport_id;
    const userStatus = await checkExistsUser(user_id);
    const totalTicketCount = parseInt(req.body.total_ticket_count);

    let totalCalculatedFare = 0;

    const totalFare = req.body.total_fare;
    const transportType = req.body.transport_type.toLowerCase();
    if (userStatus) {
      if (transportType === "bus") {
        const busScheduleStatus = await checkExistsBusSchedule(transportId);
        if (!busScheduleStatus) {
          return next(createError(422, "Error bus schedule does not exists"));
        }
        let pricePerTicket = await BusSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat"],
          raw: true,
        });
        pricePerTicket = pricePerTicket[0]?.price_per_seat;
        totalCalculatedFare = totalTicketCount * pricePerTicket;
      } else if (transportType === "train") {
        const trainScheduleStatus = await checkExistsTrainSchedule(transportId);
        if (!trainScheduleStatus) {
          return next(createError(422, "Error train schedule does not exists"));
        }
        let pricePerTicket = await TrainSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat"],
          raw: true,
        });
        pricePerTicket = pricePerTicket[0]?.price_per_seat;
        totalCalculatedFare = totalTicketCount * pricePerTicket;
      } else if (transportType === "flight") {
        const flightScheduleStatus = await checkExistsFlightSchedule(
          transportId
        );
        if (!flightScheduleStatus) {
          return next(
            createError(422, "Error flight schedule does not exists")
          );
        }
        let pricePerTicket = await FlightSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat"],
          raw: true,
        });
        pricePerTicket = pricePerTicket[0]?.price_per_seat;
        totalCalculatedFare = totalTicketCount * pricePerTicket;
      } else if (transportType == "") {
        return next(createError(422, "Error transport type cannot be empty"));
      }
      if (totalTicketCount == 0) {
        return next(createError(422, "Error ticket count cannot be zero"));
      }
      if (totalFare != totalCalculatedFare) {
        return next(createError(422, "Error in total fare"));
      }
      const bookingRecord = await BookingRecords.create(req.body);
      await bookingRecord.save();
      return res.json({
        data: "Booking record created successfully",
        status: true,
      });
    } else {
      return next(createError(500, "Error user does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while creating booking record " + error)
    );
  }
};

const updateBookingRecord = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const bookingRecordStatus = await checkExistsBookingRecord(bookingId);
    const user_id = req.body.cust_id;
    const transportId = req.body.transport_id;
    const userStatus = await checkExistsUser(user_id);
    const totalTicketCount = parseInt(req.body.total_ticket_count);
    let totalCalculatedFare = 0;

    const totalFare = req.body.total_fare;
    const transportType = req.body.transport_type.toLowerCase();
    if (bookingRecordStatus) {
      if (userStatus) {
        if (transportType === "bus") {
          const busScheduleStatus = await checkExistsBusSchedule(transportId);
          if (!busScheduleStatus) {
            return next(createError(422, "Error bus schedule does not exists"));
          }
          let pricePerTicket = await BusSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat"],
            raw: true,
          });
          pricePerTicket = pricePerTicket[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * pricePerTicket;
        } else if (transportType === "train") {
          const trainScheduleStatus = await checkExistsTrainSchedule(
            transportId
          );
          if (!trainScheduleStatus) {
            return next(
              createError(422, "Error train schedule does not exists")
            );
          }
          let pricePerTicket = await TrainSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat"],
            raw: true,
          });
          pricePerTicket = pricePerTicket[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * pricePerTicket;
        } else if (transportType === "flight") {
          const flightScheduleStatus = await checkExistsFlightSchedule(
            transportId
          );
          if (!flightScheduleStatus) {
            return next(
              createError(422, "Error flight schedule does not exists")
            );
          }
          let pricePerTicket = await FlightSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat"],
            raw: true,
          });
          pricePerTicket = pricePerTicket[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * pricePerTicket;
        } else if (transportType == "") {
          return next(createError(422, "Error transport type cannot be empty"));
        }
        if (totalTicketCount == 0) {
          return next(createError(422, "Error ticket count cannot be zero"));
        }
        if (totalFare != totalCalculatedFare) {
          return next(createError(422, "Error in total fare"));
        }
        const bookingRecord = await BookingRecords.update(req.body, {
          where: { id: bookingId },
        });
        return res.json({
          data: "Booking record updated successfully",
          status: true,
        });
      } else {
        return next(createError(500, "Error user does not exists"));
      }
    } else {
      return next(createError(422, "Error booking record does not exists"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while updating booking record " + error)
    );
  }
};

const deleteBookingRecord = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const status = await checkExistsBookingRecord(bookingId);
    if (status) {
      const bookingRecord = await BookingRecords.destroy({
        where: { id: bookingId },
      });
      return res.json({
        data: "Booking record deleted successfully",
        status: true,
      });
    } else {
      return next(createError(422, "Error while deleting booking record"));
    }
  } catch (error) {
    return next(
      createError(500, "Error while deleting booking record " + error)
    );
  }
};

const viewAllBookingRecord = async (req, res, next) => {
  try {
    const bookingRecords = await BookingRecords.findAll({});
    return res.json({ data: bookingRecords, status: true });
  } catch (error) {
    return next(
      createError(500, "Error while fetching booking record " + error)
    );
  }
};

const viewBookingRecordById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const status = await checkExistsBookingRecord(bookingId);
    if (status) {
      const bookingRecord = await BookingRecords.findAll({
        where: { id: bookingId },
      });
      return res.json({ data: bookingRecord, status: true });
    } else {
      return next(
        createError(
          422,
          "Error booking record does not exists for the specified id"
        )
      );
    }
  } catch (error) {
    return next(
      createError(500, "Error while fetching booking record " + error)
    );
  }
};

const viewBookingRecordByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userStatus = await checkExistsUser(userId);

    if (!userStatus) {
      return next(createError(422, "Error user does not exists"));
    }
    let bookingRecords = await findBookingRecordsByUserId(userId);

    return res.json({ data: bookingRecords, status: true });
  } catch (error) {
    return next(
      createError(500, "Error while fetching booking records " + error)
    );
  }
};

module.exports = {
  createBookingRecord,
  updateBookingRecord,
  deleteBookingRecord,
  viewAllBookingRecord,
  viewBookingRecordById,
  viewBookingRecordByUserId,
};
