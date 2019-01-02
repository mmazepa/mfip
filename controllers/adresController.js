//jshint node: true, esversion: 6

var adresController = {};
const Adres = require('../model/adres');

// Adres
// R
adresController.adres = (req,res) => {
    Adres.findAll().then((data) => {
        res.render('crud/addresses.ejs', {
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

adresController.add = (req, res) => {
    let country = req.body.country;
    let city = req.body.city;
    let street = req.body.street;
    let house_number = req.body.house_number;
    let zip_code = req.body.zip_code;
    Adres.add(country, city, street, house_number, zip_code).then(() => {
        res.redirect("/adres");
    })
    .catch((error) => {
        console.log(error);
    });
};

adresController.updateAdres = (req, res) => {
    let newUserAdres = {
        adres_id: req.body.adres_id,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        house_number: req.body.house_number,
        zip_code: req.body.zip_code,
        is_company: req.body.is_company
    };
    Adres.update(newUserAdres)
    .then(() => {
        res.redirect("/worker");
    })
    .catch((error) => {
        console.log(error);
    });
};

adresController.remove = (req, res) => {
    let id = req.params.id;
    Adres.remove(id).then(() => {
        res.redirect("/adres");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = adresController;
