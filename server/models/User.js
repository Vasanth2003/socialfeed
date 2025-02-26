const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: true },
  profilePicture: { type: DataTypes.STRING, allowNull: true },
});

module.exports = User;
