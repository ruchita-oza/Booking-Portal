const Sequelize = require("sequelize");

const sequelize = new Sequelize("bookingPortal", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: flase,
});

module.exports = sequelize;
global.sequelize = sequelize;
