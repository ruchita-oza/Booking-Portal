module.exports = (sequelize, DataTypes) => {
  const TrainSchedule = sequelize.define(
    "trainschedule",
    {
      // id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      trainId: {
        type: DataTypes.INTEGER,
        // references: { model: "TrainDetails", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      source: {
        type: DataTypes.INTEGER,
        // references: { model: "Cities", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      destination: {
        type: DataTypes.INTEGER,
        // references: { model: "Cities", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },
      departureTime: {
        type: DataTypes.TIME,
      },
      arrivalTime: {
        type: DataTypes.TIME,
      },
      totalAvailableSeats: {
        type: DataTypes.INTEGER(11),
      },
      pricePerSeat: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return TrainSchedule;
};
