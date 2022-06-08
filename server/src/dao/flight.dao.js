const { Op } = require("sequelize");
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

const findAllFlightSchedules = async ({ queryCopy, priceQuery, timeQuery }) => {
  console.log("at dio");
  console.log(queryCopy, priceQuery, timeQuery);

  const flights = FlightSchedule.findAndCountAll({
    where: { [Op.and]: [queryCopy, priceQuery, timeQuery] },
    include: [
      {
        model: FlightDetail,
        attributes: ["id", "flight_name", "flight_type"],
      },
    ],
  });
  return flights;
};

module.exports = {
  findFlightScheduleById,
  findAllFlightSchedules,
};
