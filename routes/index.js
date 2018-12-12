//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var index = require("../controllers/indexController.js");

router.get('/', index.homepage);
router.get('/firm', index.firm);
router.get('/worker', index.worker);
router.get('/workstations', index.workstations);
router.get('/workHistory', index.workHistory);
router.get('/cv', index.cv);
router.get('/cv/edit', index.cvEdit);
router.get('/signup', index.signup);
router.get('/logout', index.logout);

module.exports = router;
