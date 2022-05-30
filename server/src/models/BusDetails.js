const Sequelize = require("sequelize");

module.exports = global.sequelize.define("tblBusDetails", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  busName: { type: Sequelize.STRING(50) },
  busType: { type: Sequelize.STRING(50) },
  busNumber: { type: Sequelize.STRING(10) },
});
