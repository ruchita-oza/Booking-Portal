const Sequelize = require("sequelize");

module.exports = global.sequelize.define("tblUsers", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  cityName: { type: Sequelize.STRING(50) },
});
