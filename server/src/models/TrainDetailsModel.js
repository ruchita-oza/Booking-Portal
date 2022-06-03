module.exports = (sequelize, DataTypes) => {
  const TrainDetails = sequelize.define(
    "train_details",
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: false,
      },
      train_name: {
        type: DataTypes.STRING(50),
      },
      train_type: {
        type: DataTypes.ENUM("NON AC Sleeper", "AC Sleeper", "NON AC Seating"),
        default: "NON AC Sleeper",
      },
      // train_number: {
      //   type: DataTypes.STRING(10),
      // },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return TrainDetails;
};
