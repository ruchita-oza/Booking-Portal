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

async function updateFlightScheduleDetail(id, data) {
  return await FlightSchedule.update(
    { total_available_seats: data },
    { where: { id } }
  );
}

async function updateTrainScheduleDetail(id, data) {
  return await TrainSchedule.update(
    { total_available_seats: data },
    { where: { id } }
  );
}

async function updateBusScheduleDetail(id, data) {
  return await BusSchedule.update(
    { total_available_seats: data },
    { where: { id } }
  );
}

async function checkExistsBookingRecordAndReturnDetails(id) {
  let bookingRecordDetail = await BookingRecords.findAll({
    where: { id },
    attributes: ["transport_type", "transport_id", "total_ticket_count"],
    raw: true,
  });

  return bookingRecordDetail;
}

async function checkExistsBusScheduleAndReturnDetails(id) {
  const busSchedule = await BusSchedule.findOne({
    where: id,
    attributes: ["total_available_seats"],
    raw: true,
  });

  return busSchedule;
}

async function checkExitsTrainScheduleAndReturnDetails(id) {
  const trainSchedule = await TrainSchedule.findOne({
    where: id,
    attributes: ["total_available_seats"],
    raw: true,
  });

  return trainSchedule;
}

async function checkExistsFlightScheduleAndReturnDetails(id) {
  const flightSchedule = await FlightSchedule.findOne({
    where: id,
    attributes: ["total_available_seats"],
    raw: true,
  });

  return flightSchedule;
}

const createBookingRecord = async (req, res, next) => {
  try {
    // console.log("Creating booking record : ", req.body);
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
        let busScheduleDetail = await BusSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat", "total_available_seats"],
          raw: true,
        });

        // console.log("bus schedule detail : ", busScheduleDetail);

        const totalAvailableTicket =
          busScheduleDetail[0]?.total_available_seats;

        busScheduleDetail = busScheduleDetail[0]?.price_per_seat;

        totalCalculatedFare = totalTicketCount * busScheduleDetail;

        if (totalTicketCount == 0) {
          return next(createError(422, "Error ticket count cannot be zero"));
        }

        // console.log(
        //   "totalTicketCount : ",
        //   totalTicketCount,
        //   " totalAvailableTicket : ",
        //   totalAvailableTicket
        // );

        if (totalTicketCount > totalAvailableTicket) {
          return next(createError(422, "Error total ticket count"));
        }

        // console.log(
        //   "totalFare : ",
        //   totalFare,
        //   " totalCalculatedFare : ",
        //   totalCalculatedFare
        // );

        if (totalFare != totalCalculatedFare) {
          return next(createError(422, "Error in total fare"));
        }

        const bookingRecord = await BookingRecords.create(req.body);

        await bookingRecord.save();

        const updatedTicketCount = totalAvailableTicket - totalTicketCount;

        const updateSchedule = await updateBusScheduleDetail(
          transportId,
          updatedTicketCount
        );

        return res.json({
          id: bookingRecord.id,
          data: "Booking record created successfully",
          status: 200,
          success: true,
        });
      } else if (transportType === "train") {
        const trainScheduleStatus = await checkExistsTrainSchedule(transportId);

        if (!trainScheduleStatus) {
          return next(createError(422, "Error train schedule does not exists"));
        }

        let trainScheduleDetail = await TrainSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat", "total_available_seats"],
          raw: true,
        });

        const totalAvailableTicket =
          trainScheduleDetail[0]?.total_available_seats;

        if (totalTicketCount == 0) {
          return next(createError(422, "Error ticket count cannot be zero"));
        }

        if (totalTicketCount > totalAvailableTicket) {
          return next(createError(422, "Error total ticket count"));
        }

        trainScheduleDetail = trainScheduleDetail[0]?.price_per_seat;

        totalCalculatedFare = totalTicketCount * trainScheduleDetail;

        if (totalFare != totalCalculatedFare) {
          return next(createError(422, "Error in total fare"));
        }

        const updatedTicketCount = totalAvailableTicket - totalTicketCount;

        const bookingRecord = await BookingRecords.create(req.body);

        await bookingRecord.save();

        const updateSchedule = await updateTrainScheduleDetail(
          transportId,
          updatedTicketCount
        );

        return res.json({
          id: bookingRecord.id,
          data: "Booking record created successfully",
          status: 200,
          success: true,
        });
      } else if (transportType === "flight") {
        const flightScheduleStatus = await checkExistsFlightSchedule(
          transportId
        );
        if (!flightScheduleStatus) {
          return next(
            createError(422, "Error flight schedule does not exists")
          );
        }

        let flightScheduleDetail = await FlightSchedule.findAll({
          where: { id: transportId },
          attributes: ["price_per_seat", "total_available_seats"],
          raw: true,
        });

        if (!flightScheduleDetail) {
          return next(
            createError(422, "Error flight schedule does not exists")
          );
        }

        const totalAvailableTicket =
          flightScheduleDetail[0]?.total_available_seats;
        flightScheduleDetail = flightScheduleDetail[0]?.price_per_seat;

        totalCalculatedFare = totalTicketCount * flightScheduleDetail;

        if (totalTicketCount == 0) {
          return next(createError(422, "Error ticket count cannot be zero"));
        }

        if (totalTicketCount > totalAvailableTicket) {
          return next(createError(422, "Error total ticket count"));
        }

        if (totalFare != totalCalculatedFare) {
          return next(createError(422, "Error in total fare"));
        }

        const updatedTicketCount = totalAvailableTicket - totalTicketCount;

        // console.log("req.body : ", req.body);
        const bookingRecord = await BookingRecords.create(req.body);

        await bookingRecord.save();

        const updateSchedule = await updateFlightScheduleDetail(
          transportId,
          updatedTicketCount
        );

        return res.json({
          id: bookingRecord.id,
          data: "Booking record created successfully",
          status: 200,
          success: true,
        });
      } else {
        return next(createError(422, "Error transport type not found"));
      }
    } else {
      return next(createError(500, "Error user does not exists"));
    }
  } catch (error) {
    // console.log(error);
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
          let busScheduleDetail = await BusSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat", "total_available_seats"],
            raw: true,
          });

          const totalAvailableSeats =
            busScheduleDetail[0]?.total_available_seats;

          if (totalTicketCount > totalAvailableSeats) {
            return next(createError(422, "Error total ticket count"));
          }

          busScheduleDetail = busScheduleDetail[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * busScheduleDetail;

          const updatedTicketCount = totalAvailableSeats - totalTicketCount;

          const updateSchedule = await updateBusScheduleDetail(
            transportId,
            updatedTicketCount
          );
        } else if (transportType === "train") {
          const trainScheduleStatus = await checkExistsTrainSchedule(
            transportId
          );
          if (!trainScheduleStatus) {
            return next(
              createError(422, "Error train schedule does not exists")
            );
          }
          let trainScheduleDetail = await TrainSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat", "total_available_seats"],
            raw: true,
          });

          const totalAvailableSeats =
            trainScheduleDetail[0]?.total_available_seats;

          // console.log("totalAvailableSeats : ", totalAvailableSeats);

          if (totalTicketCount > totalAvailableSeats) {
            return next(createError(422, "Error total ticket count"));
          }

          trainScheduleDetail = trainScheduleDetail[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * trainScheduleDetail;

          const updatedTicketCount = totalAvailableSeats - totalTicketCount;

          const updateSchedule = await updateTrainScheduleDetail(
            transportId,
            updatedTicketCount
          );
        } else if (transportType === "flight") {
          const flightScheduleStatus = await checkExistsFlightSchedule(
            transportId
          );
          if (!flightScheduleStatus) {
            return next(
              createError(422, "Error flight schedule does not exists")
            );
          }
          let flightScheduleDetail = await FlightSchedule.findAll({
            where: { id: transportId },
            attributes: ["price_per_seat", "total_available_seats"],
            raw: true,
          });

          const totalAvailableSeats =
            flightScheduleDetail[0]?.total_available_seats;

          if (totalTicketCount > totalAvailableSeats) {
            return next(createError(422, "Error total ticket count"));
          }

          flightScheduleDetail = flightScheduleDetail[0]?.price_per_seat;
          totalCalculatedFare = totalTicketCount * flightScheduleDetail;

          const updatedTicketCount = totalAvailableSeats - totalTicketCount;

          const updateSchedule = await updateFlightScheduleDetail(
            transportId,
            updatedTicketCount
          );
        } else if (transportType == "") {
          return next(createError(422, "Error transport type not found"));
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
          success: true,
          status: 201,
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
    const details = await checkExistsBookingRecordAndReturnDetails(bookingId);

    const transportType = details[0]?.transport_type.toLowerCase();
    const transportId = details[0]?.transport_id;
    const totalTicketCount = details[0]?.total_ticket_count;

    if (details.length == 1) {
      if (transportType === "train") {
        const transportSchedule = await checkExitsTrainScheduleAndReturnDetails(
          transportId
        );

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;
          await updateTrainScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, train schedule does not exists"
            )
          );
        }
      } else if (transportType === "bus") {
        const transportSchedule = await checkExistsBusScheduleAndReturnDetails(
          transportId
        );

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;

          await updateBusScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, bus schedule does not exists"
            )
          );
        }
      } else if (transportType === "flight") {
        const transportSchedule =
          await checkExistsFlightScheduleAndReturnDetails(transportId);

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;

          await updateFlightScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, flight schedule does not exists"
            )
          );
        }
      }
    } else {
      return next(
        createError(
          422,
          "Error while deleting booking record, booking record does not exists"
        )
      );
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

const cancelBookingRecordAndChangeStatus = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const details = await checkExistsBookingRecordAndReturnDetails(bookingId);

    const transportType = details[0]?.transport_type.toLowerCase();
    const transportId = details[0]?.transport_id;
    const totalTicketCount = details[0]?.total_ticket_count;

    if (details.length == 1) {
      if (transportType === "train") {
        const transportSchedule = await checkExitsTrainScheduleAndReturnDetails(
          transportId
        );

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;
          await updateTrainScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          await BookingRecords.update(
            { booking_status: "cancel" },
            { where: { id: bookingId } }
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, train schedule does not exists"
            )
          );
        }
      } else if (transportType === "bus") {
        const transportSchedule = await checkExistsBusScheduleAndReturnDetails(
          transportId
        );

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;

          await updateBusScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          await BookingRecords.update(
            { booking_status: "cancel" },
            { where: { id: bookingId } }
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, bus schedule does not exists"
            )
          );
        }
      } else if (transportType === "flight") {
        const transportSchedule =
          await checkExistsFlightScheduleAndReturnDetails(transportId);

        if (transportSchedule) {
          let updatedTotalAvailableSeats =
            totalTicketCount + transportSchedule?.total_available_seats;

          await updateFlightScheduleDetail(
            transportId,
            updatedTotalAvailableSeats
          );

          await BookingRecords.update(
            { booking_status: "cancel" },
            { where: { id: bookingId } }
          );

          const bookingRecord = await BookingRecords.destroy({
            where: { id: bookingId },
          });

          return res.json({
            data: "Booking record deleted successfully",
            status: true,
          });
        } else {
          return next(
            createError(
              422,
              "Error deleting booking record, flight schedule does not exists"
            )
          );
        }
      }
    } else {
      return next(
        createError(
          422,
          "Error while deleting booking record, booking record does not exists"
        )
      );
    }
  } catch (error) {
    return next(
      createError(500, "Error while deleting booking record " + error)
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
  cancelBookingRecordAndChangeStatus,
};
