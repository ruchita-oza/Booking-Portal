module.exports = (sequelize, DataTypes) => {
  const FlightDetails = sequelize.define(
    "flight_details",

    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        autoIncrement: false,
      },
      flight_name: {
        type: DataTypes.STRING(50),
      },
      // flight_number: {
      //   type: DataTypes.STRING(10),
      // },
      flight_type: {
        type: DataTypes.ENUM(
          "First Class",
          "Premium Economy",
          "Business Class"
        ),
        default: "Economy",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return FlightDetails;
};
