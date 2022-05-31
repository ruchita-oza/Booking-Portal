module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.ENUM("User", "Admin"),
        defaultValue: "User",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return Users;
};
