/*jshint node: true, esversion: 6 */
const express = require('express');
const router = express.Router();

const Company = require('../model/company');
const Employee = require('../model/employee');
const Adres = require('../model/adres');
const Workstation = require('../model/workstation');

// Company
// C
router.put('/company/create', function(req, res)
{
    Company.createCompany(req.body).then((data) => {
        res.json(data);
    }).catch(function(error)
    {
        console.log(error);
    });
});

// R
router.post('/company/password', function(req, res)
{
    Company.getHashByEmail(req.body.email).then((data) =>
    {
        res.json(data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/company', function(req, res)
{
    Company.findAll().then((data) =>
    {
        res.json(data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/company/id/:id', function(req, res)
{
    let id = req.params.id;
    Company.findById(id).then((data) =>
    {
        res.json(data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/company/name/:name', function(req, res)
{
    let name = req.params.name;
    
    Company.findByName(name).then((data) =>
    {
        console.log(data);
        res.json(data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

// Employee
// C
router.put('/employee/create', function(req, res)
{
    Employee.createEmployee(req.body).then((data) => {
        res.json(data);
    }).catch(function(error)
    {
        console.log(error);
    });
});

// R
router.post('/employee/password', function(req, res)
{
    Employee.getHashByEmail(req.body.email).then((data) =>
    {
        res.json(data);
    })
    .catch(function(error)
    {
        console.log(error);
    });
});

router.get('/employee', (req, res) => {
    Employee.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get('/employee/id/:id', (req, res) => {
    let id = req.params.id;
    Employee.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});


router.get('/employee/name/:last_name', (req, res) => {
    let last_name = req.params.last_name;
    Employee.findByName(last_name).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

// Adres
// R
router.get('/adres', (req,res) => {
    Adres.findAll().then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get('/adres/id/:id', (req, res) => {
    let id = req.params.id;
    Adres.findById(id).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});


router.get('/adres/country/:country', (req, res) => {
    let country = req.params.country;
    Adres.findByCountry(country).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
});

// Workstation
// C
router.put('/workstation/create', function(req, res)
{
    Workstation.createWorkstationByIdCompany(req.body).then((data) => {
        res.json(data);
    }).catch(function(error)
    {
        console.log(error);
    });
});



module.exports = router;