module.exports = (sequelize, DataTypes) => {
  const BusDetails = sequelize.define(
    "busdetails",

    {
      busName: {
        type: DataTypes.STRING(50),
      },
      busType: {
        type: DataTypes.STRING(50),
      },
      busNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BusDetails;
};
