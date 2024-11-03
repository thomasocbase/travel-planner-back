const express = require('express');
const router = express.Router();
const dayCtrl = require('../controllers/day');

router.post('/', dayCtrl.addDay);

router.delete('/:id', dayCtrl.deleteDay);

module.exports = router;
