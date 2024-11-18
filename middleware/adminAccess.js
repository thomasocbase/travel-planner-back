const User = require('../models/User');
const Role = require('../models/Role');

module.exports = async (req, res, next) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findOne({ _id: userId });

        const adminRole = await Role.findOne({ name: 'admin' });

        if (user && user.role.toString() === adminRole._id.toString()) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
}