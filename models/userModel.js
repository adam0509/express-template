const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    user_role: {
      type: Sequelize.INTEGER, // 1: 普通用户, 2: 商家, 3: 管理员
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};