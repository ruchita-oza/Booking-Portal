module.exports = (sequelize, DataTypes) => {
  const TrainDetails = sequelize.define(
    "train_details",
    {
      train_name: {
        type: DataTypes.STRING(50),
      },
      train_number: {
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
