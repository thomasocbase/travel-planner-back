const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const cookies = req.headers.cookie.split(';')
        const token = cookies.find(cookie => cookie.includes('BEARER')).split('=')[1]
        if (!token) {
            throw 'Invalid token';
        }

        const decodedToken = jwt.verify(token, 'TRAVEL_PLANNER_RANDOM_TOKEN');
        const userId = decodedToken.userId;

        req.auth = { userId };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
}