module.exports = (sequelize, DataTypes) => {
  const TrainDetails = sequelize.define(
    "traindetails",
    {
      trainName: {
        type: DataTypes.STRING(50),
      },
      trainNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return TrainDetails;
};
