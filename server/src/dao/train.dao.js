const db = require("../models");
const TrainDetail = db.train_details;
const TrainSchedule = db.train_schedules;

TrainDetail.hasMany(TrainSchedule, { foreignKey: "train_id" });
TrainSchedule.belongsTo(TrainDetail, { foreignKey: "train_id" });

const findTrainScheduleById = async (trainScheduleId) => {
  // console.log("train");
  return TrainSchedule.findAll({
    where: { id: trainScheduleId },
    include: [
      {
        model: TrainDetail,
        attributes: ["id", "train_name", "train_type"],
      },
    ],
    // raw: true,
  });
};

const findAllTrainScheduls = async () => {
  return TrainSchedule.findAndCountAll({
    include: [
      {
        model: TrainDetail,
        attributes: ["id", "train_name", "train_type"],
      },
    ],
  });
};

module.exports = {
  findTrainScheduleById,
  findAllTrainScheduls,
};
