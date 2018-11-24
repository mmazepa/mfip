/*jshint node: true, esversion: 6 */
const express = require('express');
const router = express.Router();

const Company = require('../model/company');

router.get('/company', function(req, res, next)
{
    
    res.json(JSON.stringify({aa:'aa'}));
});

module.exports = router;