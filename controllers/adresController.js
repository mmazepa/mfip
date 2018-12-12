//jshint node: true, esversion: 6

var adresController = {};
const Adres = require('../model/adres');
var session;

// Adres
// R
adresController.adres = (req,res) => {
    session = req.session || session;
    Adres.findAll().then((data) => {
        res.render('crud/addresses.ejs', {
            session: session,
            addresses: data
        });
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
