module.exports = (sequelize, DataTypes) => {
  const BusSchedules = sequelize.define(
    "busschedule",
    {
      // id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      busId: {
        type: DataTypes.INTEGER,
        // references: { model: "BusDetails", key: "id" },
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
  return BusSchedules;
};
