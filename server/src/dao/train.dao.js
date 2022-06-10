const db = require("../models");
const City = db.cities;
const TrainDetail = db.train_details;
const TrainSchedule = db.train_schedules;
const { Op } = require("sequelize");

TrainDetail.hasMany(TrainSchedule, { foreignKey: "train_id" });
TrainSchedule.belongsTo(TrainDetail, { foreignKey: "train_id" });

City.hasMany(TrainSchedule, { foreignKey: "source" });
TrainSchedule.belongsTo(City, { as: "source_name", foreignKey: "source" });

City.hasMany(TrainSchedule, { foreignKey: "destination" });
TrainSchedule.belongsTo(City, {
  as: "destination_name",
  foreignKey: "destination",
});

// TrainSchedule.hasMany(City, { as: "destinationId", foreignKey: "destination" });
// City.belongsTo(TrainSchedule, { foreignKey: "destination" });

const findTrainScheduleById = async (trainScheduleId) => {
  // console.log("train");
  return TrainSchedule.findAll({
    where: { id: trainScheduleId },
    include: [
      {
        model: TrainDetail,
        attributes: ["id", "train_name", "train_type"],
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
    // raw: true,
  });
};

const findAllTrainSchedules = async ({
  queryCopy,
  priceQuery,
  timeQuery,
  ticketQuery,
}) => {
  console.log(ticketQuery);
  console.log("object");
  const trainSchedules = await TrainSchedule.findAndCountAll({
    where: { [Op.and]: [queryCopy, priceQuery, timeQuery, ticketQuery] },
    include: [
      {
        model: TrainDetail,
        attributes: ["id", "train_name", "train_type"],
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
  return trainSchedules;
};

module.exports = {
  findTrainScheduleById,
  findAllTrainSchedules,
};
