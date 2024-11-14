const express = require('express');
const router = express.Router();
const activityCtrl = require('../controllers/activity');

router.post('/', activityCtrl.addActivity);
router.put('/:id', activityCtrl.updateActivity);
router.delete('/:id', activityCtrl.deleteActivity);

module.exports = router;