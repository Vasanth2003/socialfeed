const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  comments: { type: DataTypes.JSON, defaultValue: [] },
});

module.exports = Post;
