const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/user');

// Connection to MongoDB
(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/travelPlanner');
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.log('Connexion à MongoDB échouée !', error);
    }
})();

// Body parser
app.use(express.json());

// General middleware dealing with CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
app.get('/api/', (req, res) => {
    res.send('Voilà la réponse du serveur !');
});

app.use('/api/auth', authRoutes);



module.exports = app;