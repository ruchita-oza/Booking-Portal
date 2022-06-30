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

const findTrainScheduleById = async (trainScheduleId) => {
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
  });
};

const findAllTrainSchedules = async ({
  queryCopy,
  priceQuery,
  timeQuery,
  ticketQuery,
  skip,
  resultPerPage,
}) => {
  const trainSchedules = await TrainSchedule.findAndCountAll({
    offset: skip,
    limit: resultPerPage,
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

const findAllTrainSchedulesByTrainId = async (trainId) => {
  return TrainSchedule.findAndCountAll({
    where: { train_id: trainId },
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
};

module.exports = {
  findTrainScheduleById,
  findAllTrainSchedules,
  findAllTrainSchedulesByTrainId,
};
