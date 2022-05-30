const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tblBookedRecords",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    custId: {
      type: Sequelize.INTEGER,
      references: { model: "tblUsers", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    },

    custEmail: { type: Sequelize.STRING(50) },
    custPhoneNumber: { type: Sequelize.INTEGER(20) },
    transportType: { type: Sequelize.STRING(50) },
    transportId: { type: Sequelize.INTEGER(50) },
    totalTickCount: { type: Sequelize.INTEGER(10) },
    journeyData: { type: Sequelize.DATE },
    TotalFare: { type: Sequelize.INTEGER },
    bookingStatus: {
      type: Sequelize.ENUM("confirm", "cancel"),
      default: "confirm",
    },
  },
  { paranoid: true }
);
