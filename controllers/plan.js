const Plan = require('../models/Plan');

// Initial data

const initialPlan = {
    title: 'My first plan',
    description: 'This is my first plan',
    image: 'https://picsum.photos/id/177/800/600',
    visibilityState: '67292c7e3e797b9c6565b1b2',
    userId: '67250f1fa0b9612c6157079a',
}

exports.createInitialPlan = async () => {
    try {
        const existingPlan = await Plan.findOne({ title: initialPlan.title });
        if (!existingPlan) {
            const newPlan = new Plan(initialPlan);
            await newPlan.save();
            console.log('Initial plan created');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getInitialPlan = async (req, res, next) => {
    try {
        const plan = await Plan.findOne({ _id: '672d03bf69f596a99ba87288' });
        res.status(200).json(plan);
    } catch (error) {
        res.status(404).json({ error });
    }
}

// CRUD ops

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

