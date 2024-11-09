const ActivityType = require('../models/ActivityType');

const activityTypes = [
    { name: 'Hike' },
    { name: 'Tour' },
    { name: 'Accommodation' },
    { name: 'Meal' },
    { name: 'Shopping' },
    { name: 'Transport' },
    { name: 'Note' }
];

exports.createActivityTypes = async () => {
    try {
        for (const activityType of activityTypes) {
            const existingActivityType = await ActivityType.findOne({ name: activityType.name });
            if (!existingActivityType) {
                const newActivityType = new ActivityType(activityType);
                await newActivityType.save();
            }
        }
        console.log('Activity types created');
    } catch (error) {
        console.log(error);
    }
};

exports.getAllActivityTypes = async (req, res, next) => {
    try {
        const activityTypes = await ActivityType.find();
        res.status(200).json(activityTypes);
    } catch (error) {
        res.status(400).json({ error });
    }
};