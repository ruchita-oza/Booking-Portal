module.exports = (sequelize, DataTypes) => {
  const BookedRecords = sequelize.define(
    "bookedrecords",
    {
      cust_id: {
        // type: Sequelize.INTEGER,
        type: DataTypes.INTEGER,
        // references: { model: "Users", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },

      cust_email: {
        type: DataTypes.STRING(50),
      },
      cust_phoneNumber: {
        type: DataTypes.INTEGER(20),
      },
      transport_type: {
        type: DataTypes.STRING(50),
      },
      transport_id: {
        type: DataTypes.INTEGER(50),
      },
      totalTick_count: {
        type: DataTypes.INTEGER(10),
      },
      journey_data: {
        type: DataTypes.DATE,
      },
      Total_fare: {
        type: DataTypes.INTEGER,
      },
      booking_status: {
        type: DataTypes.ENUM("confirm", "cancel"),
        default: "confirm",
      },
    },
    {
      timestamps: true, paranoid: true,
    }
  );
  return BookedRecords;
};
