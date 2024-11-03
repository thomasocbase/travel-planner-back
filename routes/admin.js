const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.get('/users', adminCtrl.getAllUsers);

module.exports = router;