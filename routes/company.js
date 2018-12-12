//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var company = require("../controllers/companyController.js");

// Company
// C
router.put('/company/create', company.companyCreate);

// R
router.post('/company/password', company.companyPassowrd);
router.get('/company', company.company);
router.get('/company/id/:id', company.companyById);
router.get('/company/name/:name', company.companyByName);

router.post('/company/add', company.add);
router.get('/company/remove/:id', company.remove);

module.exports = router;
