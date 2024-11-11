const express = require('express');
const router = express.Router();
const dayCtrl = require('../controllers/day');

router.post('/', dayCtrl.addDay);
router.put('/title/:id', dayCtrl.updateDayTitle);
router.put('/order/:id', dayCtrl.updateDayOrder);
router.delete('/:id', dayCtrl.deleteDay);

module.exports = router;
