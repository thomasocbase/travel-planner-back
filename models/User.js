const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },
    imagePath: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);