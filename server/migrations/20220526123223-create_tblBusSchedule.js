"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("tblBusSchedule", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      busId: {
        type: Sequelize.INTEGER,
        references: { model: "tblBusDetails", key: "id" },
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("tblBusSchedule");
  },
};
