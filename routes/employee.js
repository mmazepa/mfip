//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var employee = require("../controllers/employeeController.js");
const authentification = require("../config/authentification.js");

// Employee
// C
router.put('/employee/create', employee.employeeCreate);

// R
router.post('/employee/password', employee.employeePassword);
// router.get('/employee', authentification.isCompanyAuthenticated, employee.employee);
router.get('/employee', employee.findAllEmployees);
router.get('/employee/id/:id', employee.employeeById);
router.get('/employee/name/:last_name', employee.employeeByLastName);

router.get('/employee/image/:id', employee.imageGet);
router.post('/employee/image/upload', employee.imageUpload);

// U
router.post('/employee/update', employee.updateEmployee);

module.exports = router;
