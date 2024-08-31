module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("log", {
        log_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        admin_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        operation_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        details: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    });

    return Log;
};