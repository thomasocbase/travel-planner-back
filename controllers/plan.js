const Plan = require('../models/Plan');

exports.getAllPlans = async (req, res, next) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getUserPlans = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(404).json({ error: 'User not found' });
        }

        const plans = await Plan.find({ userId: userId });
        res.status(200).json(plans);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOnePlan = async (req, res, next) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.id });
        res.status(200).json(plan);
    } catch (error) {
        res.status(404).json({ error });
    }
};

exports.addPlan = async (req, res, next) => {
    try {
        const userId = req.auth.userId || req.body.userId;

        const plan = new Plan({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            status: req.body.status,
            userId: userId,
        });
        await plan.save();
        res.status(201).json({ message: 'Plan created' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.modifyPlan = async (req, res, next) => {
    try {
        await Plan.updateOne({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: 'Plan updated' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.deletePlan = async (req, res, next) => {
    try {
        await Plan.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

