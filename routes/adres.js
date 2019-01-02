//jshint node: true, esversion: 6

const express = require('express');
const router = express.Router();

var adres = require("../controllers/adresController.js");

// Adres
// R
router.get('/adres', adres.adres);
router.get('/adres/id/:id', adres.adresById);
router.get('/adres/country/:country', adres.adresByCountry);

router.post('/adres/add', adres.add);
router.post('/adres/update', adres.updateAdres);
router.get('/adres/remove/:id', adres.remove);

module.exports = router;
