module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      openId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return User;
  };