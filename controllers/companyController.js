//jshint node: true, esversion: 6

var companyController = {};
const Company = require('../model/company');

// Company
// C
companyController.companyCreate = (req, res) => {
    Company.createCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// R
companyController.companyPassowrd = (req, res) => {
    Company.getHashByEmail(req.body.email).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.company = (req, res) => {
    Company.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.companyById = (req, res) => {
    let id = req.params.id;
    Company.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.companyByName = (req, res) => {
    let name = req.params.name;
    Company.findByName(name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = companyController;
