//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var skill = require("../controllers/skillController.js");

router.post('/skill/add', skill.add);
router.get('/skill/remove/:id', skill.remove);

module.exports = router;
