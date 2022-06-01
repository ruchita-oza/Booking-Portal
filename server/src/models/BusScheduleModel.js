module.exports = (sequelize, DataTypes) => {
  const BusSchedules = sequelize.define(
    "busschedule",
    {
      bus_id: {
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
      departure_time: {
        type: DataTypes.TIME,
      },
      arrival_time: {
        type: DataTypes.TIME,
      },
      total_available_seats: {
        type: DataTypes.INTEGER(11),
      },
      price_per_seat: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BusSchedules;
};
