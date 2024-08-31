// 需要用前端body传：adminId, operationType, entity, details
const logOperation = async (req, res, next) => {
    const db = require("../config/database");
    const Log = db.log;
    try {
        const { adminId, operationType, entity, details } = req.body;

        await Log.create({
            admin_id: adminId,
            operation_type: operationType,
            entity,
            details,
        });

        next();
    } catch (error) {
        console.error('Failed to log operation:', error);
        next(error);
    }
};

module.exports = logOperation;
