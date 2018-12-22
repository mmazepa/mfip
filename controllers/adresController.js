//jshint node: true, esversion: 6

var adresController = {};
const Adres = require('../model/adres');
// var session;

// Adres
// R
adresController.adres = (req,res) => {
    // // // session = req.session || session;
    Adres.findAll().then((data) => {
        res.render('crud/addresses.ejs', {
            // // session: session,
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
