/*jshint node: true, esversion: 6 */
const express = require('express');
const router = express.Router();

const Company = require('../model/company');
const Employee = require('../model/employee');
const Adres = require('../model/adres');

// Company
router.put('/company/create', function(req, res)
{
    //let name = req.params;
    //console.log(req.body);
    // Company.createCompany(req.params).then((data) =>
    // {
    //     console.log(data);
    //     res.json(data);
    // })
    // .catch(function(error)
    // {
    //     console.log(error);
    // });
    // console.log(req.body);
    Company.createCompany(req.body).then((data) => {
        res.json(data);
    }).catch(function(error)
    {
        console.log(error);
    });
    // res.json(Company.createCompany(req.body));
});

// R
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
// R
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

// Workspace




module.exports = router;