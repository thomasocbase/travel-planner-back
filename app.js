const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import routes
const authRoutes = require('./routes/user');
const dayRoutes = require('./routes/day');
const planRoutes = require('./routes/plan');
const adminRoutes = require('./routes/admin')

// Import controllers
const roleCtrl = require('./controllers/role');
const planVisibilityStatesCtrl = require('./controllers/planVisibilityState');
const activityTypeCtrl = require('./controllers/activityType');

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
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Insert static and demo data

roleCtrl.createRoles();
planVisibilityStatesCtrl.createPlanVisibilityStates();
activityTypeCtrl.createActivityTypes();

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/day', dayRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;