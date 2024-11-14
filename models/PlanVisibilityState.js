const mongoose = require('mongoose');

const planVisibilityStateSchema = mongoose.Schema({
    label: { type: String, required: true },
});

module.exports = mongoose.model('PlanVisibilityState', planVisibilityStateSchema);