module.exports = (sequelize, DataTypes) => {
  const TrainDetails = sequelize.define(
    "traindetails",
    {
      // id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      trainName: {
        type: DataTypes.STRING(50),
      },
      trainNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: false,
    }
  );
  return TrainDetails;
};