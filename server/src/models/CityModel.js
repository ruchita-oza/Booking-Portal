module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    "cities",
    {
      city_name: {
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
