module.exports = (sequelize, DataTypes) => {
  const BusDetails = sequelize.define(
    "busdetails",

    {
      bus_name: {
        type: DataTypes.STRING(50),
      },
      bus_type: {
        type: DataTypes.STRING(10),
      },
      bus_number: {
        type: DataTypes.STRING(11),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BusDetails;
};
