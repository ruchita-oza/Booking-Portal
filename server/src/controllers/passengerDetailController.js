const db = require("../models");
const PassengerDetails = db.passenger_details;
const BookingRecord = db.booking_records;
const createError = require("../utils/error");

async function checkExistsBookingRecord(id) {
  const bookingRecords = await BookingRecord.findAll({ where: { id } });
  return bookingRecords.length > 0 ? true : false;
}

async function checkExistsPassengerDetails(id) {
  const passengerDetails = await PassengerDetails.findAll({ where: { id } });
  return passengerDetails.length > 0 ? true : false;
}

const createPassengerDetails = async (req, res, next) => {
  try {
    const bookingId = req.body.booking_id;
    const bookingRecordStatus = await checkExistsBookingRecord(bookingId);
    if (!bookingRecordStatus) {
      return next(createError(422, "Error booking id does not exists"));
    }
    const passengerDetails = await PassengerDetails.create(req.body);
    return res.json({
      data: "Passenger details added successfully",
      status: true,
    });
  } catch (error) {
    return next(
      createError(500, "Error while adding passenger details " + error)
    );
  }
};

const updatePassengerDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bookingId = req.body.booking_id;

    const passengerDetailsStatus = await checkExistsPassengerDetails(id);
    const bookingRecordStatus = await checkExistsBookingRecord(bookingId);

    if (!passengerDetailsStatus) {
      return next(createError(422, "Error passenger details does not exists"));
    }
    if (!bookingRecordStatus) {
      return next(createError(422, "Error booking record does not exists"));
    }

    const passengerDetails = await PassengerDetails.update(req.body, {
      where: { id },
    });
    return res.json({
      data: "Passenger details updated successfully",
      status: true,
    });
  } catch (error) {
    return next(
      createError(500, "Error while updating passenger details " + error)
    );
  }
};

const deletePassengerDetails = async (req, res, next) => {
  try {
    const passengerId = req.params.id;
    const status = await checkExistsPassengerDetails(passengerId);
    if (!status) {
      return next(createError(422, "Error passenger details does not exists"));
    }
    const passengerDetails = await PassengerDetails.destroy({
      where: { id: passengerId },
    });
    return res.json({
      data: "Passenger details deleted successfully",
      status: true,
    });
  } catch (error) {
    return next(
      createError(500, "Error while deleting passenger details " + error)
    );
  }
};

const getPassengerDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = await checkExistsPassengerDetails(id);
    if (status) {
      const passengerDetails = await PassengerDetails.findAll({
        where: { id },
      });
      return res.json({ data: passengerDetails, status: true });
    }
    return next(createError(422, "Error passenger details does not exists"));
  } catch (error) {
    return next(
      createError(500, "Error while fetching passenger details " + error)
    );
  }
};

const getAllPassengerDetails = async (req, res, next) => {
  try {
    const passengerDetails = await PassengerDetails.findAll({});
    return res.json({ data: passengerDetails, status: true });
  } catch (error) {
    return next(
      createError(500, "Error while fetching passenger details " + error)
    );
  }
};

const getAllPassengerDetailsByBookingId = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const status = await checkExistsBookingRecord(bookingId);
    if (status) {
      const passengerDetails = await PassengerDetails.findAndCountAll({
        where: { booking_id: bookingId },
      });
      return res.json({ data: passengerDetails, status: true });
    }
    return next(createError(422, "Error booking record does not exists"));
  } catch (error) {
    return next(createError(500, "Error fetching passenger details " + error));
  }
};

module.exports = {
  createPassengerDetails,
  updatePassengerDetailsById,
  deletePassengerDetails,
  getPassengerDetailsById,
  getAllPassengerDetails,
  getAllPassengerDetailsByBookingId,
};
