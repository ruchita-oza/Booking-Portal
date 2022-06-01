module.exports = (sequelize, DataTypes) => {
  const flightDetails = sequelize.define(
    "flightdetails",

    {
      flightName: {
        type: DataTypes.STRING(50),
      },
      flightNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return flightDetails;
};
