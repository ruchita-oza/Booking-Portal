module.exports = (sequelize, DataTypes) => {
  const FlightDetails = sequelize.define(
    "flightdetails",

    {
      // id: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      flightName: {
        type: DataTypes.STRING(50),
      },
      flightNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: false,
    }
  );
  return FlightDetails;
};
