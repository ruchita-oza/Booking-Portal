module.exports = (sequelize, DataTypes) => {
  const FlightDetails = sequelize.define(
    "flightdetails",

    {
      flight_name: {
        type: DataTypes.STRING(50),
      },
      flight_number: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return FlightDetails;
};
