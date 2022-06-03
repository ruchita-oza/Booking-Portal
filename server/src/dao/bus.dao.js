const db = require("../models");
const BusDetail = db.bus_details;
const BusSchedule = db.bus_schedule;

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

const findAllBusSchedules = async () => {
  return BusSchedule.findAll({
    include: [
      {
        model: BusDetail,
        attributes: ["id", "bus_name", "bus_type"],
      },
    ],
  });
};

module.exports = {
  findBusScheduleById,
  findAllBusSchedules,
};
