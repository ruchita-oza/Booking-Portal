const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tblCities",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cityName: { type: Sequelize.STRING(50) },
  },
  { paranoid: true }
);
