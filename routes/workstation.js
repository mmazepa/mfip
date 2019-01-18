//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var workstation = require("../controllers/workstationController.js");

// Workstation
// C
router.put('/workstation/create', workstation.workstationCreate);

router.get('/workplaces', workstation.workplacesByCompanyId);
router.post('/workplace/add', workstation.addWorkplace);

module.exports = router;
