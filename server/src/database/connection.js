const Sequelize = require("sequelize");

const sequelize = new Sequelize("bookingPortal", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;
