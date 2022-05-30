module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    "cities",
    {
      // id: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      cityName: {
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: false,
    }
  );
  return Cities;
};
