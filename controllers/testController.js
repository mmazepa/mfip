//jshint node: true, esversion: 6

var testController = {};
var session;

var pgp = require('pg-promise')();
var db = pgp("postgres://postgres:postgres@localhost:5432/mfip");

const Company = require('../model/company');
const Employee = require('../model/employee');
const Adres = require('../model/adres');
const Workstation = require('../model/workstation');

// Company
// C
testController.companyCreate = (req, res) => {
    Company.createCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// R
testController.companyPassowrd = (req, res) => {
    Company.getHashByEmail(req.body.email).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.company = (req, res) => {
    Company.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.companyById = (req, res) => {
    let id = req.params.id;
    Company.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.companyByName = (req, res) => {
    let name = req.params.name;
    Company.findByName(name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// Employee
// C
testController.employeeCreate = (req, res) => {
    Employee.createEmployee(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// R
testController.employeePassword = (req, res) => {
    Employee.getHashByEmail(req.body.email).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.employee = (req, res) => {
    Employee.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.employeeById = (req, res) => {
    let id = req.params.id;
    Employee.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.employeeByLastName = (req, res) => {
    let last_name = req.params.last_name;
    Employee.findByName(last_name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// Adres
// R
testController.adres = (req,res) => {
    Adres.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.adresById = (req, res) => {
    let id = req.params.id;
    Adres.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

testController.adresByCountry = (req, res) => {
    let country = req.params.country;
    Adres.findByCountry(country).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// Workstation
// C
testController.workstationCreate = (req, res) => {
    Workstation.createWorkstationByIdCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = testController;
