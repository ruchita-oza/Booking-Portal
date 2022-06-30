module.exports = (sequelize, DataTypes) => {
  const TrainSchedule = sequelize.define(
    "train_schedules",
    {
      train_id: {
        type: DataTypes.INTEGER,
      },
      source: {
        type: DataTypes.INTEGER,
      },
      destination: {
        type: DataTypes.INTEGER,
      },
      departure_time: {
        type: DataTypes.DATE,
      },
      arrival_time: {
        type: DataTypes.DATE,
      },
      total_available_seats: {
        type: DataTypes.INTEGER(11),
      },
      price_per_seat: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return TrainSchedule;
};
