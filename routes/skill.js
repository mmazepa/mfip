//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var skill = require("../controllers/skillController.js");

router.get('/skills', skill.skills);
router.post('/skill/add', skill.add);
router.get('/skill/remove/:id', skill.remove);

router.post('/skill/addByUser/:id', skill.addByUser);

module.exports = router;
