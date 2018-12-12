//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var employee = require("../controllers/employeeController.js");

// Employee
// C
router.put('/employee/create', employee.employeeCreate);

// R
router.post('/employee/password', employee.employeePassword);
router.get('/employee', employee.employee);
router.get('/employee/id/:id', employee.employeeById);
router.get('/employee/name/:last_name', employee.employeeByLastName);

module.exports = router;
