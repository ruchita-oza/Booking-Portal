const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tblflightDetails",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    flightName: { type: Sequelize.STRING(50) },
    flightNumber: { type: Sequelize.STRING(10) },
  },
  { paranoid: true }
);
