module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    "cities",
    {
      cityName: {
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return Cities;
};
