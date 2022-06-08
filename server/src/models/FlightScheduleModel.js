module.exports = (sequelize, DataTypes) => {
  const flightSchedule = sequelize.define(
    "flight_schedules",

    {
      flight_id: {
        type: DataTypes.STRING(10),
        // references: { model: "flightDetails", key: "id" },
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
        type: DataTypes.DATE,
      },
      arrival_time: {
        type: DataTypes.DATE,
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
  return flightSchedule;
};
