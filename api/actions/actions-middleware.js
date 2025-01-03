const Actions = require('./actions-model');

// Middleware to validate action ID
async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    } catch (error) {
        next(error);
    }
}

// Middleware to validate action data
function validateActionData(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Missing required fields: project_id, description, and notes" });
    } else {
        next();
    }
}

module.exports = {
    validateActionId,
    validateActionData,
};