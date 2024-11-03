const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    duration: { type: Number },
    budget: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Day', daySchema);