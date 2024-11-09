const express = require('express');
const router = express.Router();
const activityTypeCtrl = require('../controllers/activityType');

router.get('/', activityTypeCtrl.getAllActivityTypes);

module.exports = router;