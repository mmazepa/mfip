//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var index = require("../controllers/indexController.js");
const authentification = require("../config/authentification.js");

router.get('/', index.homepage);
router.get('/firm', authentification.isCompanyAuthenticated, index.firm);
router.get('/worker', authentification.isEmployeeAuthenticated, index.worker);
router.get('/workstations', index.workstations);
router.get('/workHistory', index.workHistory);
router.get('/cv', index.cv);
router.get('/signup', index.signup);
router.post('/signup', index.signup_post);
router.get('/logout', index.logout);

module.exports = router;
