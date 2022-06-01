module.exports = (sequelize, DataTypes) => {
  const BusDetails = sequelize.define(
    "busdetails",

    {
      bus_name: {
        type: DataTypes.STRING(50),
      },
      bus_type: {
        type: DataTypes.STRING(50),
      },
      bus_number: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BusDetails;
};
