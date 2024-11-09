const express = require('express');
const router = express.Router();
const planCtrl = require('../controllers/plan');

router.get('/initial', planCtrl.getInitialPlan);

router.get('/', planCtrl.getAllPlans);

router.get('/user', planCtrl.getUserPlans);

router.get('/:id', planCtrl.getOnePlan);

router.post('/', planCtrl.addPlan);

router.put('/:id', planCtrl.modifyPlan);

router.delete('/:id', planCtrl.deletePlan);

module.exports = router;