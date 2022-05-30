const Sequelize = require("sequelize");

module.exports = global.sequelize.define(
  "tblPassengerDetails",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bookingId: {
      type: Sequelize.INTEGER,
      references: { model: "tblBookedRecords", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
    },

    name: { type: Sequelize.STRING(50) },
    gender: { type: Sequelize.ENUM("male", "female"), defaultValue: "male" },
    age: { type: Sequelize.INTEGER },
  },
  { paranoid: true }
);
