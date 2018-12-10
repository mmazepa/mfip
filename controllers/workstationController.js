//jshint node: true, esversion: 6

var workstationController = {};
const Workstation = require('../model/workstation');

// Workstation
// C
workstationController.workstationCreate = (req, res) => {
    Workstation.createWorkstationByIdCompany(req.body).then((data) => {
        res.json(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = workstationController;
