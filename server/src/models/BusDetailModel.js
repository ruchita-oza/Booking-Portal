module.exports = (sequelize, DataTypes) => {
  const BusDetails = sequelize.define(
    "busdetails",

    {
      // id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      busName: {
        type: DataTypes.STRING(50),
      },
      busType: {
        type: DataTypes.STRING(50),
      },
      busNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: false,
    }
  );
  return BusDetails;
};
