module.exports = (sequelize, DataTypes) => {
  const FlightDetails = sequelize.define(
    "flight_details",

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
  return FlightDetails;
};
