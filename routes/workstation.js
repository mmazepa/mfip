//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var workstation = require("../controllers/workstationController.js");

// Workstation
// C
router.put('/workstation/create', workstation.workstationCreate);

module.exports = router;
