const db = require("../models");
const BusDetail = db.bus_details;
const BusSchedule = db.bus_schedule;
const { Op } = require("sequelize");
BusDetail.hasMany(BusSchedule, { foreignKey: "bus_id" });
BusSchedule.belongsTo(BusDetail, { foreignKey: "bus_id" });

const findBusScheduleById = async (busScheduleId) => {
  return BusSchedule.findAll({
    where: { id: busScheduleId },
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
    ],
  });
};

const findAllBusSchedules = async ({ queryCopy, priceQuery, timeQuery }) => {
  console.log("at dio");
  console.log(queryCopy, priceQuery, timeQuery);
  const busSchedules = await BusSchedule.findAndCountAll({
    where: { [Op.and]: [queryCopy, priceQuery, timeQuery] },
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
    ],
  });
  return busSchedules;
};

module.exports = {
  findBusScheduleById,
  findAllBusSchedules,
};
