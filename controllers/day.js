const Day = require('../models/Day');

// Initial data

const initialDay = {
    title: 'Example of a day',
    order: 1,
    duration: 0,
    budget: 0,
    userId: '67250f1fa0b9612c6157079a',
    planId: '672d03bf69f596a99ba87288',
}

exports.createInitialDay = async () => {
    try {
        const existingDay = await Day.findOne({ title: initialDay.title });
        if (!existingDay) {
            const newDay = new Day(initialDay);
            await newDay.save();
            console.log('Initial day created');
        }
    } catch (error) {
        console.log(error);
    }
};

// CRUD ops

exports.getDaysByPlan = async (req, res, next) => {
    try {
        const days = await Day.find({ planId: req.params.planId });
        res.status(200).json(days);
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.addDay = async (req, res, next) => {
    try {
        const day = new Day({
            title: req.body.title,
            order: req.body.order,
            duration: 0,
            budget: 0,
            userId: req.body.userId,
            planId: req.body.planId,
        });
        await day.save();
        res.status(201).json({ message: 'Day created', day: day });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.updateDayTitle = async (req, res, next) => {
    try {
        let dayToUpdate = await Day.findOne({ _id: req.params.id });
        dayToUpdate.title = req.body.title,
        dayToUpdate.updatedAt = Date.now(),
        
        await dayToUpdate.save();
        res.status(200).json({ message: 'Day title updated' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.updateDayOrder = async (req, res, next) => {
    try {
        let dayToUpdate = await Day.findOne({ _id: req.params.id });
        
        dayToUpdate.order = req.body.order,
        dayToUpdate.updatedAt = Date.now(),
        
        await dayToUpdate.save();
        res.status(200).json({ message: 'Day order updated' });
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