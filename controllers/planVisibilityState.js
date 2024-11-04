const PlanVisibilityStates = require('../models/PlanVisibilityState');

const states = [
    { label: 'public' },
    { label: 'unlisted' },
    { label: 'private' }
];

exports.createPlanVisibilityStates = async () => {
    try {
        for (const state of states) {
            const existingState = await PlanVisibilityStates.findOne({ label: state.label });
            if (!existingState) {
                const newState = new PlanVisibilityStates(state);
                await newState.save();
            }
        }
        console.log('Plan visibility states created');
    } catch (error) {
        console.log(error);
    }
};