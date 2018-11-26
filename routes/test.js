/*jshint node: true, esversion: 6 */
const express = require('express');
const router = express.Router();

const Company = require('../model/company');

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

router.put('/company/create', function(req, res)
{
    //let name = req.params;
    console.log(req.body);
    // Company.createCompany(req.params).then((data) =>
    // {
    //     console.log(data);
    //     res.json(data);
    // })
    // .catch(function(error)
    // {
    //     console.log(error);
    // });
    res.json(req.param);
});



module.exports = router;