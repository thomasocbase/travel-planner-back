const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TRAVEL_PLANNER_RANDOM_TOKEN');
        const userId = decodedToken.userId;

        req.auth = { userId };
        next();
    } catch {
        res.status(401).json({ error });
    }
}