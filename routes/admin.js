const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.get('/users', adminCtrl.getAllUsers);
router.get('/plans', adminCtrl.getAllPlans);

module.exports = router;