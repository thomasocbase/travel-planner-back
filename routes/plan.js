const express = require('express');
const router = express.Router();
const planCtrl = require('../controllers/plan');
const activityCtrl = require('../controllers/activity');
const dayCtrl = require('../controllers/day');

router.get('/initial', planCtrl.getInitialPlan);

// Plan routes

router.get('/', planCtrl.getAllPlans);
router.get('/user', planCtrl.getUserPlans);
router.get('/:id', planCtrl.getOnePlan);
router.post('/', planCtrl.addPlan);
router.put('/:id', planCtrl.modifyPlan);
router.delete('/:id', planCtrl.deletePlan);

// Activity routes

router.get('/:planId/activities', activityCtrl.getActivitiesByPlan);

// Day routes

router.get('/:planId/days', dayCtrl.getDaysByPlan);

module.exports = router;