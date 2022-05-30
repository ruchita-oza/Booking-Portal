const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tbltrainDetails",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    trainName: { type: Sequelize.STRING(50) },
    trainNumber: { type: Sequelize.STRING(10) },
  },
  { paranoid: true }
);
