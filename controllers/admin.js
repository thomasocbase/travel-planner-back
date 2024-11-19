const User = require('../models/User');
const Plan = require('../models/Plan');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getAllPlans = async (req, res, next) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(400).json({ error });
    }
};
