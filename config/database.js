const Sequelize = require("sequelize");

const config = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "789550jhu",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 5, // 最大连接数
        min: 0, // 最小连接数
        acquire: 30000,
        idle: 10000 // 连接在释放之前的最长空闲时间（毫秒）
    }
}

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// 在此引入模型
db.user = require("../models/userModel")(sequelize, Sequelize)

// 在此处理模型关系

// 导出
module.exports = db