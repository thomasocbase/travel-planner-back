const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    url: { type: String, required: false },
    price: { type: Number, required: false },
    timeAllocation: { type: Number, required: false },
    activityType: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityType', required: true },
    location: { type: String, required: false },
    order: { type: Number, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: false },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Day', required: false },
    isArchived: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', activitySchema);