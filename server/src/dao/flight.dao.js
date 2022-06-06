const db = require("../models");
const FlightDetail = db.flight_details;
const FlightSchedule = db.flight_schedule;

FlightDetail.hasMany(FlightSchedule, { foreignKey: "flight_id" });
FlightSchedule.belongsTo(FlightDetail, { foreignKey: "flight_id" });

const findFlightScheduleById = async (flightScheduleId) => {
  return FlightSchedule.findAll({
    where: { id: flightScheduleId },
    include: [
      {
        model: FlightDetail,
        attributes: ["id", "flight_name", "flight_type"],
      },
    ],
  });
};

const findAllFlightSchedules = async () => {
  return FlightSchedule.findAll({
    include: [
      {
        model: FlightDetail,
        attributes: ["id", "flight_name", "flight_type"],
      },
    ],
  });
};

module.exports = {
  findFlightScheduleById,
  findAllFlightSchedules,
};
