const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true },
    duration: { type: Number },
    budget: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Day', daySchema);