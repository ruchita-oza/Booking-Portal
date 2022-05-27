const Sequelize = require("sequelize");
module.exports = sequelize.define("tblUsers", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: { type: Sequelize.STRING(50), allowNull: false },
  lastName: { type: Sequelize.STRING(50), allowNull: false },
  email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
  isAdmin: { type: Sequelize.ENUM("User", "Admin"), defaultValue: "User" },
});
