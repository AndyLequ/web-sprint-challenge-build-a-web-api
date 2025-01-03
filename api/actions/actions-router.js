const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateActionId, validateActionData } = require('./actions-middleware');

// GET all actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch (err) {
        next({ message: 'Failed to get actions', error: err });
    }
});

// GET action by ID
router.get('/:id', validateActionId, async (req, res) => {
    res.status(200).json(req.action);
});

// POST a new action
router.post('/', validateActionData, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (error) {
        next({ message: "We ran into an error adding the action", error });
    }
});

module.exports = router;