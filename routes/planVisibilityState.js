const express = require('express');
const router = express.Router();
const planVisibilityStatesCtrl = require('../controllers/planVisibilityState');

router.get('/', planVisibilityStatesCtrl.getPlanVisibilityStates);

module.exports = router;