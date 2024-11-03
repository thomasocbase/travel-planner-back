const Day = require('../models/Day');

exports.addDay = async (req, res, next) => {
    try {
        const day = new Day({
            title: req.body.title,
            order: req.body.order,
            duration: req.body.duration,
            budget: req.body.budget,
            userId: req.body.userId,
            planId: req.body.planId,
        });
        await day.save();
        res.status(201).json({ message: 'Day created' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.deleteDay = async (req, res, next) => {
    try {
        await Day.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Day deleted' });
    } catch (error) {
        res.status(400).json({ error });
    }
};