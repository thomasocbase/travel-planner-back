const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    visibilityState: { type: mongoose.Schema.Types.ObjectId, ref: 'PlanVisibilityState', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', planSchema);