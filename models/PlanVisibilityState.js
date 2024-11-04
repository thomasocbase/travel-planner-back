const mongoose = require('mongoose');

const planVisibilityStatesSchema = mongoose.Schema({
    label: { type: String, required: true },
});

module.exports = mongoose.model('PlanVisibilityStates', planVisibilityStatesSchema);