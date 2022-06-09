module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    "states",
    {
      state_name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return States;
};
