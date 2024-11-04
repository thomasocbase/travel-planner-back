const mongoose = require('mongoose');

const activityTypeSchema = mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);