const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const userRole = await Role.findOne({ name: 'user' });

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: userRole._id,
        });
        await user.save();
        res.status(201).json({ message: 'Account created' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Incorrect authentication' });
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Incorrect authentication' });
        }

        // Token config
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send jwt in cookie
        res.cookie('BEARER', token, {
            httpOnly: true,
            secure: true,
            // sameSite: 'strict',
            maxAge: 1 * 60 * 60 * 1000,
        });

        res.cookie('CHECKER', user.username, {
            httpOnly: false,
            secure: true,
            maxAge: 1 * 60 * 60 * 1000,
        });

        res.status(200).json({ userId: user._id, userName: user.username });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.logout = (req, res, next) => {
    res.clearCookie('BEARER');
    res.clearCookie('CHECKER');
    res.status(200).json({ message: 'Logout completed' });
}