//jshint node: true, esversion: 6

var adresController = {};
const Adres = require('../model/adres');

// Adres
// R
adresController.adres = (req,res) => {
    Adres.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

adresController.adresById = (req, res) => {
    let id = req.params.id;
    Adres.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

adresController.adresByCountry = (req, res) => {
    let country = req.params.country;
    Adres.findByCountry(country).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = adresController;
