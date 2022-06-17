const db = require("../models");
const City = db.cities;
const BusDetail = db.bus_details;
const BusSchedule = db.bus_schedule;
const { Op } = require("sequelize");

BusDetail.hasMany(BusSchedule, { foreignKey: "bus_id" });
BusSchedule.belongsTo(BusDetail, { foreignKey: "bus_id" });

City.hasMany(BusSchedule, { foreignKey: "source" });
BusSchedule.belongsTo(City, { as: "source_name", foreignKey: "source" });

City.hasMany(BusSchedule, { foreignKey: "destination" });
BusSchedule.belongsTo(City, {
  as: "destination_name",
  foreignKey: "destination",
});

const findBusScheduleById = async (busScheduleId) => {
  return BusSchedule.findAll({
    where: { id: busScheduleId },
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
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
  });
};

const findAllBusSchedules = async ({
  queryCopy,
  priceQuery,
  timeQuery,
  ticketQuery,
  skip,
  resultPerPage,
}) => {
  // console.log("at dao");
  // console.log(queryCopy, priceQuery, timeQuery, ticketQuery);
  const busSchedules = await BusSchedule.findAndCountAll({
    limit: resultPerPage,
    offset: skip,
    where: { [Op.and]: [queryCopy, priceQuery, timeQuery, ticketQuery] },
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
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
  });
  // console.log(busSchedules.rows.length)
  return busSchedules;
};

const findAllBusSchedulesByBusId = async (busId) => {
  return BusSchedule.findAndCountAll({
    where: { bus_id: busId },
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
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
  });
};

module.exports = {
  findBusScheduleById,
  findAllBusSchedules,
  findAllBusSchedulesByBusId,
};
