module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      // id: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
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
        type: DataTypes.STRING(50),
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
      timestamps: false,
    }
  );
  return Users;
};
