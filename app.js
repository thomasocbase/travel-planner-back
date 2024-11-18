const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import routes
const authRoutes = require('./routes/user');
const dayRoutes = require('./routes/day');
const planRoutes = require('./routes/plan');
const adminRoutes = require('./routes/admin')
const activityTypeRoutes = require('./routes/activityType');
const activityRoutes = require('./routes/activity');

// Import controllers
const roleCtrl = require('./controllers/role');
const planVisibilityStatesCtrl = require('./controllers/planVisibilityState');
const activityTypeCtrl = require('./controllers/activityType');
const planCtrl = require('./controllers/plan');
const dayCtrl = require('./controllers/day');
const activityCtrl = require('./controllers/activity');

// Import middlewares
const authAccess = require('./middleware/authAccess');
const adminAccess = require('./middleware/adminAccess');

// Load environment variables
require('dotenv').config();

// Connection to MongoDB
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.log('Connexion à MongoDB échouée !', error);
    }
})();

// Body parser
app.use(express.json());

// General middleware dealing with CORS
app.use((req, res, next) => {
    // Headers
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // Options request
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

// Insert static and demo data
roleCtrl.createRoles();
planVisibilityStatesCtrl.createPlanVisibilityStates();
activityTypeCtrl.createActivityTypes();
planCtrl.createInitialPlan();
dayCtrl.createInitialDay();
activityCtrl.createInitialActivities();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plan', authAccess, planRoutes);
app.use('/api/day', authAccess, dayRoutes);
app.use('/api/admin', authAccess, adminAccess, adminRoutes);
app.use('/api/activityType', activityTypeRoutes);
app.use('/api/activity', authAccess, activityRoutes);

module.exports = app;