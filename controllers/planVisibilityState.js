const PlanVisibilityState = require('../models/PlanVisibilityState');

const states = [
    { label: 'public' },
    { label: 'unlisted' },
    { label: 'private' }
];

exports.createPlanVisibilityStates = async () => {
    try {
        for (const state of states) {
            const existingState = await PlanVisibilityState.findOne({ label: state.label });
            if (!existingState) {
                const newState = new PlanVisibilityState(state);
                await newState.save();
            }
        }
        console.log('Plan visibility states created');
    } catch (error) {
        console.log(error);
    }
};

exports.getPlanVisibilityStates = async (req, res, next) => {
    try {
        const states = await PlanVisibilityState.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(400).json({ error });
    }
};