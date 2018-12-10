//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var test = require("../controllers/testController.js");

// Company
// C
router.put('/company/create', test.companyCreate);

// R
router.post('/company/password', test.companyPassowrd);
router.get('/company', test.company);
router.get('/company/id/:id', test.companyById);
router.get('/company/name/:name', test.companyByName);

// Employee
// C
router.put('/employee/create', test.employeeCreate);

// R
router.post('/employee/password', test.employeePassword);
router.get('/employee', test.employee);
router.get('/employee/id/:id', test.employeeById);
router.get('/employee/name/:last_name', test.employeeByLastName);

// Adres
// R
router.get('/adres', test.adres);
router.get('/adres/id/:id', test.adresById);
router.get('/adres/country/:country', test.adresByCountry);

// Workstation
// C
router.put('/workstation/create', test.workstationCreate);

module.exports = router;
