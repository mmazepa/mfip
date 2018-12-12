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
    session = req.session || session;
    var firms = req.firms || firms;

    Company.findAll().then((data) => {
        res.render('crud/firms.ejs', {
            session: session,
            firms: data
        });
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

companyController.add = (req, res) => {
    let name = req.body.name;
    let specialization = req.body.specialization;
    let description = req.body.description;
    let email = req.body.email;
    let website = req.body.website;
    Company.add(name, specialization, description, email, website).then(() => {
        res.redirect("/company");
    })
    .catch((error) => {
        console.log(error);
    });
};

companyController.remove = (req, res) => {
    let id = req.params.id;
    Company.remove(id).then(() => {
        res.redirect("/company");
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = companyController;
