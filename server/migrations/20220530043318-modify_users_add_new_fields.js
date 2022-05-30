"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("tblUsers", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblCities", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblBookedRecords", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblBusDetails", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblBusSchedule", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblflightDetails", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblFlightSchedule", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblPassengerDetails", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblTrainDetails", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
      queryInterface.addColumn("tblTrainSchedule", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {},
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("tblUsers", "deletedAt"),
      queryInterface.removeColumn("tblCities", "deletedAt"),
      queryInterface.removeColumn("tblBookedRecords", "deletedAt"),
      queryInterface.removeColumn("tblBusDetails", "deletedAt"),
      queryInterface.removeColumn("tblBusSchedule", "deletedAt"),
      queryInterface.removeColumn("tblflightDetails", "deletedAt"),
      queryInterface.removeColumn("tblFlightSchedule", "deletedAt"),
      queryInterface.removeColumn("tblPassengerDetails", "deletedAt"),
      queryInterface.removeColumn("tblTrainDetails", "deletedAt"),
      queryInterface.removeColumn("tblTrainSchedule", "deletedAt"),
    ]);
  },
};
