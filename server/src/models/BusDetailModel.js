module.exports = (sequelize, DataTypes) => {
  const BusDetails = sequelize.define(
    "bus_details",

    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        autoIncrement: false,
      },
      bus_name: {
        type: DataTypes.STRING(50),
      },
      bus_type: {
        type: DataTypes.ENUM(
          "NON AC Sleeper",
          "NON AC Seating",
          "AC Sleeper",
          "AC Seating"
        ),
        default: "NON AC Seating",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BusDetails;
};
