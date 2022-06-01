module.exports = (sequelize, DataTypes) => {
  const flightDetails = sequelize.define(
    "flightdetails",

    {
      flight_name: {
        type: DataTypes.STRING(50),
      },
      flight_number: {
        type: DataTypes.STRING(10),
      },
      flight_type: {
        type: DataTypes.ENUM("economy", "premium economy", "business"),
        default: "economy",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return flightDetails;
};
