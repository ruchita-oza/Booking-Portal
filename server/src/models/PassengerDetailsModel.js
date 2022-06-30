module.exports = (sequelize, DataTypes) => {
  const PassengerDetails = sequelize.define(
    "passenger_details",

    {
      booking_id: {
        type: DataTypes.INTEGER,
      },

      name: {
        type: DataTypes.STRING(50),
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        defaultValue: "male",
      },
      age: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return PassengerDetails;
};
