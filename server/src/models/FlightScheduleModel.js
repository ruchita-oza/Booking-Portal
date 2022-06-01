module.exports = (sequelize, DataTypes) => {
  const flightSchedule = sequelize.define(
    "flightschedule",

    {
      flightId: {
        type: DataTypes.INTEGER,
        // references: { model: "flightDetails", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      source: {
        type: DataTypes.INTEGER,
        // references: { model: "Cities", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      destination: {
        type: DataTypes.INTEGER,
        // references: { model: "Cities", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      departureTime: {
        type: DataTypes.TIME,
      },
      arrivalTime: {
        type: DataTypes.TIME,
      },
      totalAvailableSeats: {
        type: DataTypes.INTEGER(11),
      },
      pricePerSeat: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return flightSchedule;
};
