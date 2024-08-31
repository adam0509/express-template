const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    admin_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  Admin.beforeCreate(async (admin) => {
    admin.password = await bcrypt.hash(admin.password, 10);
  });

  return Admin;
};