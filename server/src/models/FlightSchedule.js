const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tblFlightSchedule",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    flightId: {
      type: Sequelize.INTEGER,
      references: { model: "tblFlightDetails", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    source: {
      type: Sequelize.INTEGER,
      references: { model: "tblCities", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    destination: {
      type: Sequelize.INTEGER,
      references: { model: "tblCities", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    departureTime: { type: Sequelize.TIME },
    arrivalTime: { type: Sequelize.TIME },
    totalAvailableSeats: { type: Sequelize.INTEGER(11) },
    pricePerSeat: { type: Sequelize.INTEGER },
  },
  { paranoid: true }
);
