const db = require("../models");
const TrainSchedule = db.train_schedules;
const BusSchedule = db.bus_schedule;
const FlightSchedule = db.flight_schedule;
const BookingRecord = db.booking_records;
const { findTrainScheduleById } = require("../dao/train.dao");
const { findFlightScheduleById } = require("../dao/flight.dao");
const { findBusScheduleById } = require("../dao/bus.dao");
const City = db.cities;

TrainSchedule.hasMany(BookingRecord, {
  foreignKey: "transport_id",
  constraints: false,
  scope: {
    commentableType: TrainSchedule,
  },
});
BookingRecord.belongsTo(TrainSchedule, {
  foreignKey: "transport_id",
  constraints: false,
});

BusSchedule.hasMany(BookingRecord, {
  foreignKey: "transport_id",
  constraints: false,
  scope: {
    commentableType: BusSchedule,
  },
});
BookingRecord.belongsTo(BusSchedule, {
  foreignKey: "transport_id",
  constraints: false,
});

FlightSchedule.hasMany(BookingRecord, {
  foreignKey: "transport_id",
  constraints: false,
  scope: {
    commentableType: FlightSchedule,
  },
});
BookingRecord.belongsTo(FlightSchedule, {
  foreignKey: "transport_id",
  constraints: false,
});

const findBookingRecordsByUserId = async (userId) => {
  let flightBookingRecords = await BookingRecord.findAll({
    where: { cust_id: userId, transport_type: "flight" },
    include: [
      {
        model: FlightSchedule,
        include: [
          {
            model: City,
            as: "source_name",
            attributes: ["city_name"],
          },
          {
            model: City,
            as: "destination_name",
            attributes: ["city_name"],
          },
        ],
      },
    ],
  });

  let busBookingRecords = await BookingRecord.findAll({
    where: { cust_id: userId, transport_type: "bus" },
    include: [
      {
        model: BusSchedule,
        include: [
          {
            model: City,
            as: "source_name",
            attributes: ["city_name"],
          },
          {
            model: City,
            as: "destination_name",
            attributes: ["city_name"],
          },
        ],
      },
    ],
  });

  let trainBookingRecords = await BookingRecord.findAll({
    where: { cust_id: userId, transport_type: "train" },
    include: [
      {
        model: TrainSchedule,
        include: [
          {
            model: City,
            as: "source_name",
            attributes: ["city_name"],
          },
          {
            model: City,
            as: "destination_name",
            attributes: ["city_name"],
          },
        ],
      },
    ],
  });

  let allBookingRecords = [];

  flightBookingRecords = JSON.parse(JSON.stringify(flightBookingRecords));

  flightBookingRecords.forEach((element) => {
    allBookingRecords.push(element);
  });

  busBookingRecords.forEach((element) => {
    allBookingRecords.push(element);
  });

  trainBookingRecords.forEach((element) => {
    allBookingRecords.push(element);
  });

  return allBookingRecords;
};

module.exports = {
  findBookingRecordsByUserId,
};
