"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("tblBusDetails", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      busName: { type: Sequelize.STRING(50) },
      busType: { type: Sequelize.STRING(50) },
      busNumber: { type: Sequelize.STRING(10) },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("tblBusDetails");
  },
};
